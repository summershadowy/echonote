import React, { useState, useRef } from 'react';
import { Typography, Button, message } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import './ReadArticlePage.css';

const { Title } = Typography;

const ReadArticlePage = () => {
  const [highlights, setHighlights] = useState([]);
  const textRef = useRef();

  const handleHighlight = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const newHighlight = {
        text: selectedText,
        snapshot: textRef.current.innerHTML,
        url: window.location.href,
      };
      setHighlights([...highlights, newHighlight]);
      message.success('Highlight saved to notes');
    } else {
      message.warning('Please select text to highlight');
    }
  };

  return (
    <div className="read-article-container">
      <Title className="page-title">阅读文章</Title>
      <div className="article-content" ref={textRef}>
        <p>这是示例文章的内容，用户可以在这里选择文本并进行划线操作...</p>
        <p>继续阅读文章内容...</p>
        <p>更多文章内容...</p>
      </div>
      <Button type="primary" icon={<HighlightOutlined />} onClick={handleHighlight}>
        划线保存
      </Button>
    </div>
  );
};

export default ReadArticlePage;

