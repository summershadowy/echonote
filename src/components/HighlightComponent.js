import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { HighlightOutlined, DeleteOutlined } from '@ant-design/icons';
import './HighlightComponent.css';

const HighlightComponent = ({ notes = [], setNotes }) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [highlightedNote, setHighlightedNote] = useState(null);

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      let isWithinHighlight = false;
      let existingNote = null;

      for (const note of notes) {
        if (note.range) {
          const noteNode = note.range.commonAncestorContainer.childNodes[0];
          if (noteNode && noteNode.nodeType === Node.TEXT_NODE) {
            const noteRange = document.createRange();
            noteRange.setStart(noteNode, note.range.start);
            noteRange.setEnd(noteNode, note.range.end);
            if (
              range.compareBoundaryPoints(Range.START_TO_END, noteRange) >= 0 &&
              range.compareBoundaryPoints(Range.END_TO_START, noteRange) <= 0
            ) {
              isWithinHighlight = true;
              existingNote = note;
              break;
            }
          }
        }
      }

      if (isWithinHighlight) {
        setHighlightedNote(existingNote);
        setSelectedText(selectedText);
        setSelectedRange(range);
        setToolbarVisible(true);
        setToolbarPosition({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX + rect.width / 2 - 50
        });
      } else {
        const overlapsHighlight = Array.from(document.querySelectorAll('.highlight')).some(highlight => {
          const highlightRange = document.createRange();
          highlightRange.selectNodeContents(highlight);
          return range.compareBoundaryPoints(Range.END_TO_START, highlightRange) < 0 &&
                 range.compareBoundaryPoints(Range.START_TO_END, highlightRange) > 0;
        });

        if (!overlapsHighlight) {
          setSelectedText(selectedText);
          setSelectedRange(range);
          setHighlightedNote(null);
          setToolbarVisible(true);
          setToolbarPosition({
            top: rect.top + window.scrollY - 40,
            left: rect.left + window.scrollX + rect.width / 2 - 50
          });
        } else {
          setToolbarVisible(false);
        }
      }
    } else {
      setToolbarVisible(false);
      setHighlightedNote(null);
    }
  };

  const addNote = () => {
    if (selectedText && selectedRange && !highlightedNote) {
      const newNote = {
        id: Date.now(),
        text: selectedText,
        title: document.title,
        url: window.location.href,
        time: new Date().toLocaleString(),
        range: {
          start: selectedRange.startOffset,
          end: selectedRange.endOffset,
          commonAncestorContainer: selectedRange.commonAncestorContainer,
        }
      };

      setNotes(prevNotes => [...prevNotes, newNote]);

      const span = document.createElement('span');
      span.className = 'highlight';
      span.textContent = selectedText;
      selectedRange.deleteContents();
      selectedRange.insertNode(span);

      setToolbarVisible(false);
    }
  };

  const removeHighlight = () => {
    if (highlightedNote) {
      const highlightElements = document.querySelectorAll('.highlight');
      highlightElements.forEach(element => {
        if (element.textContent === highlightedNote.text) {
          const parent = element.parentNode;
          while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
          }
          parent.removeChild(element);
        }
      });

      setNotes(prevNotes => prevNotes.filter(note => note.id !== highlightedNote.id));
      setToolbarVisible(false);
      setHighlightedNote(null);
    }
  };

  const handleHighlightClick = (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('highlight')) {
      const clickedText = clickedElement.textContent;
      const clickedNote = notes.find(note => note.text === clickedText);
      if (clickedNote) {
        setHighlightedNote(clickedNote);
        const rect = clickedElement.getBoundingClientRect();
        setToolbarVisible(true);
        setToolbarPosition({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX + rect.width / 2 - 50
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleHighlightClick);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleHighlightClick);
    };
  }, [notes]);

  return (
    <div>
      {toolbarVisible && (
        <div className="toolbar" style={{ top: toolbarPosition.top, left: toolbarPosition.left }}>
          {!highlightedNote && <Button icon={<HighlightOutlined />} onClick={addNote} />}
          {highlightedNote && <Button icon={<DeleteOutlined />} onClick={removeHighlight} />}
        </div>
      )}
    </div>
  );
};

export default HighlightComponent;
