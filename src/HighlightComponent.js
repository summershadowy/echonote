import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import './HighlightComponent.css';

const HighlightComponent = ({ notes, setNotes }) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectedRange, setSelectedRange] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

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
          left: rect.left + window.scrollX + rect.width / 2 - 50
        });
      } else {
        setToolbarVisible(false);
      }
    } else {
      setToolbarVisible(false);
    }
  };

  const addNote = async () => {
    if (selectedText && selectedRange) {
      const newNote = {
        text: selectedText,
        title: document.title,
        url: window.location.href,
        time: new Date().toLocaleString()
      };

      console.log('Sending note to server:', newNote);

      try {
        const response = await fetch('http://localhost:3001/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNote)
        });
        const result = await response.json();
        console.log('Note added:', result);

        setNotes(prevNotes => {
          const updatedNotes = [...prevNotes, result];
          console.log('Updated notes:', updatedNotes);
          return updatedNotes;
        });

        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = selectedText;
        selectedRange.deleteContents();
        selectedRange.insertNode(span);

        setToolbarVisible(false);
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
