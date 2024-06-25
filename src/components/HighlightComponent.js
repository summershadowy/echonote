import React, { useEffect } from 'react';
import { message } from 'antd';
import './HighlightComponent.css'; // 你可以在这里定义划线的 CSS 样式

const HighlightComponent = ({ notes, setNotes }) => {
  useEffect(() => {
    const handleMouseUp = (event) => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;
        const noteId = parentElement.dataset.noteId;

        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const existingNote = storedNotes.find(note => note.text === selectedText && note.noteId === noteId);

        if (!existingNote) {
          const newNote = {
            id: Date.now(),
            title: document.title,
            time: new Date().toLocaleString(),
            text: selectedText,
            snapshot: parentElement.innerHTML,
            url: window.location.href,
            range: {
              startOffset: range.startOffset,
              endOffset: range.endOffset,
              parentNode: range.commonAncestorContainer.parentElement.outerHTML
            }
          };

          storedNotes.push(newNote);
          localStorage.setItem('notes', JSON.stringify(storedNotes));
          setNotes(storedNotes);
          applyHighlight(newNote);
          message.success('Note added');
        } else {
          showDeleteButton(event.pageX, event.pageY, existingNote);
        }
      }
    };

    const showDeleteButton = (x, y, note) => {
      const deleteButton = document.createElement('button');
      deleteButton.innerText = '删除';
      deleteButton.style.backgroundColor = 'red';
      deleteButton.style.color = 'white';
      deleteButton.style.position = 'absolute';
      deleteButton.style.zIndex = 9999;
      deleteButton.style.top = `${y}px`;
      deleteButton.style.left = `${x}px`;

      deleteButton.addEventListener('click', () => {
        const updatedNotes = notes.filter(n => n.id !== note.id);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
        removeHighlight(note);
        message.success('Note deleted');
      });

      document.body.appendChild(deleteButton);
    };

    const applyHighlight = (note) => {
      const parentNode = document.createElement('div');
      parentNode.innerHTML = note.range.parentNode;
      const parentElement = document.body.querySelector(parentNode.firstChild.tagName);
      const range = document.createRange();
      range.setStart(parentElement.firstChild, note.range.startOffset);
      range.setEnd(parentElement.firstChild, note.range.endOffset);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('hiliteColor', false, '#0EB4D3'); // 主题色
      selection.removeAllRanges();
    };

    const removeHighlight = (note) => {
      const parentNode = document.createElement('div');
      parentNode.innerHTML = note.range.parentNode;
      const parentElement = document.body.querySelector(parentNode.firstChild.tagName);
      const range = document.createRange();
      range.setStart(parentElement.firstChild, note.range.startOffset);
      range.setEnd(parentElement.firstChild, note.range.endOffset);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('removeFormat');
      selection.removeAllRanges();
    };

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    storedNotes.forEach(note => applyHighlight(note));

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [notes, setNotes]);

  return null;
};

export default HighlightComponent;
