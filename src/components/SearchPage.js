import React, { useState } from 'react';
import { Input, Button, Typography, Tag, Card, Row, Col } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import './SearchPage.css';

const { Title, Text } = Typography;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    // 模拟搜索结果，每次搜索返回三个包含当前搜索内容的结果
    const sampleResults = [
      { id: 1, title: value, content: `这是搜索结果内容 1：${value}`, date: new Date().toLocaleDateString() },
      { id: 2, title: value, content: `这是搜索结果内容 2：${value}`, date: new Date().toLocaleDateString() },
      { id: 3, title: value, content: `这是搜索结果内容 3：${value}`, date: new Date().toLocaleDateString() }
    ];
    // 设置新的搜索结果
    setResults(sampleResults);
  };

  const handleTagClick = (value) => {
    setQuery(value);
  };

  return (
    <div className="search-container">
      <div className="section">
        <Title className="search-title">锦囊妙记 Note Echo</Title>
        <Title className="section-title">随手记</Title>
        <Text>想问问题？上传笔记库，问问过去的自己</Text>
        <div className="search-bar">
          <Input
            prefix= <SearchOutlined className="search-input-icon"/> 
            placeholder="输一个问题试试吧"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={() => handleSearch(query)}
            className="search-input"
          />
          <Button type="primary" className="search-button" onClick={() => handleSearch(query)}>搜索</Button>
        </div>
        <div className="search-tags-wrapper">
          <div className="search-tags">
            <Tag onClick={() => handleTagClick('职业倦怠怎么办？')}>职业倦怠怎么办？</Tag>
            <Tag onClick={() => handleTagClick('能不能无痛辞职？')}>能不能无痛辞职？</Tag>
            <Tag onClick={() => handleTagClick('要不要买房？')}>要不要买房？</Tag>
            <Tag onClick={() => handleTagClick('夏天怎么过？')}>夏天怎么过？</Tag>
            <Tag onClick={() => handleTagClick('8月去哪玩最好？')}>8月去哪玩最好？</Tag>
            <Tag onClick={() => handleTagClick('如何从零到一设计一款AI产品？')}>如何从零到一设计一款AI产品？</Tag>
            <Tag onClick={() => handleTagClick('做什么小事能让自己开心起来？')}>做什么小事能让自己开心起来？</Tag>
            <Tag onClick={() => handleTagClick('有什么好玩的书推荐吗？')}>有什么好玩的书推荐吗？</Tag>
          </div>
        </div>
      </div>
      <div className="section">
        <Title className="section-title">巧妙答</Title>
        <Text>智能理解输入问题，迅速从成千上万条笔记库中找到匹配的答案，传给现在的你</Text>
        <div className="results-container">
          <Row gutter={[16, 16]}>
            {results.map(result => (
              <Col span={8} key={result.id}>
                <Card className="result-card" bordered={false}>
                  <BulbOutlined className="result-card-icon" />
                  <div className="result-card-title">{result.title}</div>
                  <div className="result-card-date">记录日期 {result.date}</div>
                  <div className="result-card-content">{result.content}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
