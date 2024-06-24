import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './HighlightComponent.css';

const { Title, Text } = Typography;

const HighlightComponent = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const existingNote = notes.find(note => note.content === selectedText);

      setToolbarPosition({
        top: rect.top + window.scrollY - 40,
        left: rect.left + window.scrollX + rect.width / 2 - 50
      });

      if (existingNote) {
        setSelectedNote(existingNote);
        setToolbarVisible(true);
      } else {
        const isAlreadyHighlighted = Array.from(range.commonAncestorContainer.parentNode.childNodes).some(node => {
          return node.nodeType === Node.ELEMENT_NODE && node.classList.contains('highlight');
        });

        if (!isAlreadyHighlighted) {
          const newNote = {
            id: Date.now(),
            content: selectedText,
            title: document.title,
            url: window.location.href,
            time: new Date().toLocaleString(),
            range: {
              start: range.startOffset,
              end: range.endOffset,
              commonAncestorContainer: range.commonAncestorContainer.parentNode,
            },
          };

          setNotes(prevNotes => [...prevNotes, newNote]);
          setToolbarVisible(false);

          highlightRange(newNote.range);
        } else {
          setToolbarVisible(false);
        }
      }
    } else {
      setToolbarVisible(false);
    }
  };

  const highlightRange = (range) => {
    const { start, end, commonAncestorContainer } = range;
    const textNode = commonAncestorContainer.childNodes[0];
    const newRange = document.createRange();
    newRange.setStart(textNode, start);
    newRange.setEnd(textNode, end);

    const highlightDiv = document.createElement('span');
    highlightDiv.className = 'highlight';
    newRange.surroundContents(highlightDiv);
  };

  const removeHighlight = () => {
    if (selectedNote) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== selectedNote.id));
      const { start, end, commonAncestorContainer } = selectedNote.range;
      const textNode = commonAncestorContainer.childNodes[0];
      const newRange = document.createRange();
      newRange.setStart(textNode, start);
      newRange.setEnd(textNode, end);

      const highlightDiv = newRange.commonAncestorContainer;
      highlightDiv.replaceWith(...highlightDiv.childNodes);

      setSelectedNote(null);
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
          <Button icon={<DeleteOutlined />} onClick={removeHighlight} />
        </div>
      )}
      <div className="highlight-container">
        {notes.map((note, index) => (
          <Card key={note.id} className="note-card">
            <Title level={4}>
              <a href={note.url} target="_blank" rel="noopener noreferrer">
                {note.title}
              </a>
            </Title>
            <Text>{note.content}</Text>
            <Text type="secondary" className="note-time">
              {note.time}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HighlightComponent;
