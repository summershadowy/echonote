import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import './HighlightComponent.css';

const HighlightComponent = ({ notes, setNotes }) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Check if any part of the selection overlaps with existing highlights
      const overlapsHighlight = Array.from(document.querySelectorAll('.highlight')).some(highlight => {
        const highlightRange = document.createRange();
        highlightRange.selectNodeContents(highlight);
        return range.compareBoundaryPoints(Range.END_TO_START, highlightRange) < 0 &&
               range.compareBoundaryPoints(Range.START_TO_END, highlightRange) > 0;
      });

      if (!overlapsHighlight) {
        setSelectedText(selectedText);
        setSelectedRange(range);
        setToolbarVisible(true);
        setToolbarPosition({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX + rect.width / 2 - 25 // Adjusted to center the toolbar
        });
      } else {
        setToolbarVisible(false);
      }
    } else {
      setToolbarVisible(false);
    }
  };

  const addNote = () => {
    if (selectedText && selectedRange) {
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

      console.log('Adding note:', newNote); // Debugging line

      setNotes(prevNotes => {
        const updatedNotes = [...prevNotes, newNote];
        console.log('Updated notes:', updatedNotes); // Debugging line
        return updatedNotes;
      });

      const span = document.createElement('span');
      span.className = 'highlight';
      span.textContent = selectedText;
      selectedRange.deleteContents();
      selectedRange.insertNode(span);

      setToolbarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [notes]);

  return (
    <div>
      {toolbarVisible && (
        <div className="toolbar" style={{ top: toolbarPosition.top, left: toolbarPosition.left }}>
          <Button icon={<HighlightOutlined />} onClick={addNote} />
        </div>
      )}
    </div>
  );
};

export default HighlightComponent;
