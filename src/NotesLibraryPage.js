import React from 'react';
import { Card, Button, List, Typography, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import HighlightComponent from './HighlightComponent';
import './NotesLibraryPage.css';

const { Title, Text } = Typography;

const NotesLibraryPage = ({ notes, setNotes }) => {
  const handleDelete = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    message.success('Note deleted');
  };

  return (
    <div className="notes-library-container">
      <Title className="page-title">笔记库</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={notes}
        renderItem={(note) => (
          <List.Item>
            <Card title={note.title || '无标题'} extra={note.time}>
              <Text>{note.text}</Text>
              <div className="note-actions" style={{ marginTop: '10px' }}>
                <Button type="link" href={note.url} target="_blank">查看原文</Button>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(note.id)}>删除</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <HighlightComponent notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default NotesLibraryPage;
