import React, { useState } from 'react';
import { Card, Button, List, Typography, Modal, message, Input, DatePicker } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import './NotesLibraryPage.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const NotesLibraryPage = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: '示例文章 1',
      time: '2024-06-11 10:30',
      text: '这是划线的笔记内容示例 1。',
      snapshot: '<p>这是文章快照的内容示例 1...</p>',
      url: 'https://example.com/article1'
    },
    {
      id: 2,
      title: '示例文章 2',
      time: '2024-06-12 14:20',
      text: '这是划线的笔记内容示例 2。',
      snapshot: '<p>这是文章快照的内容示例 2...</p>',
      url: 'https://example.com/article2'
    },
    {
      id: 3,
      title: '',
      time: '2024-06-13 09:15',
      text: '这是划线的笔记内容示例 3。',
      snapshot: '<p>这是文章快照的内容示例 3...</p>',
      url: 'https://example.com/article3'
    }
  ]);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [viewingNote, setViewingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDelete = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    setFilteredNotes(newNotes);
    message.success('Note deleted');
  };

  const handleViewNote = (note) => {
    setViewingNote(note);
  };

  const handleSearch = () => {
    const [start, end] = dateRange;
    const filtered = notes.filter(note => {
      const matchesSearchTerm = note.text.includes(searchTerm) || note.title.includes(searchTerm);
      const noteDate = moment(note.time, 'YYYY-MM-DD HH:mm');
      const matchesDateRange = (!start || noteDate.isSameOrAfter(start)) && (!end || noteDate.isSameOrBefore(end));
      return matchesSearchTerm && matchesDateRange;
    });
    setFilteredNotes(filtered);
  };

  return (
    <div className="notes-library-container">
      <Title className="page-title">笔记库</Title>
      <div className="filter-container">
        <Input
          placeholder="搜索关键词"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 200, marginRight: 16, borderRadius: 8 }}
                  className="search-new-input"
        />
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
                  style={{ marginRight: 16, borderRadius: 8 }}
                  className="date-picker-input"
        />
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} className="login-button" >
          搜索
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredNotes}
        renderItem={(note) => (
          <List.Item>
            <Card title={note.title || '无标题'} extra={note.time}>
              <Text>{note.text}</Text>
              <div className="note-actions">
                <Button type="link" onClick={() => handleViewNote(note)}>查看快照</Button>
                <Button type="link" href={note.url} target="_blank">查看原文</Button>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(note.id)}>删除</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      {viewingNote && (
        <Modal
          visible={!!viewingNote}
          title="查看笔记快照"
          onCancel={() => setViewingNote(null)}
          footer={null}
        >
          <div dangerouslySetInnerHTML={{ __html: viewingNote.snapshot }} />
          <a href={viewingNote.url} target="_blank" rel="noopener noreferrer">查看原文</a>
        </Modal>
      )}
    </div>
  );
};

export default NotesLibraryPage;
