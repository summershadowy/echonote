import React from 'react';
import { Typography, Divider, Button } from 'antd';
import html2canvas from 'html2canvas';

const { Title, Text } = Typography;

const SearchResult = ({ title, content, query }) => {
  const saveAsImage = () => {
    const element = document.getElementById(`note-${title}`);
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div id={`note-${title}`} style={{ marginBottom: 16, padding: 16, border: '1px solid #e8e8e8', borderRadius: 8 }}>
      <Title level={4}>问题: {query}</Title>
      <Title level={5}>{title}</Title>
      <Text>{content}</Text>
      <Divider style={{ margin: '16px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text type="secondary">本网站链接: https://example.com</Text>
        <Button type="primary" onClick={saveAsImage}>保存为图片</Button>
      </div>
    </div>
  );
};

export default SearchResult;
