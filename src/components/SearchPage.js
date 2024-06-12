import React, { useState } from 'react';
import { Input, Button, Typography, Tag, Card, Row, Col } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './SearchPage.css';

const { Title, Text } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleSearch = (value) => {
    const sampleResults = [
      { id: 1, title: value, content: `这是真实搜索结果内容 1：${value}`, date: new Date().toLocaleDateString() },
      { id: 2, title: value, content: `这是真实搜索结果内容 2：${value}`, date: new Date().toLocaleDateString() },
      { id: 3, title: value, content: `这是真实搜索结果内容 3：${value}`, date: new Date().toLocaleDateString() }
    ];
    setResults(sampleResults);
  };

  const handleTagClick = (value) => {
    setQuery(value);
    handleSearch(value);
  };

  const handleLogin = () => {
    // 模拟登录成功
    setTimeout(() => {
      // 登录成功后跳转到 RealSearchResult 页面
      navigate('/real-search');
    }, 1000); // 模拟网络延迟
  };

  return (
    <div className="search-container">
      <div className="header">
        <Title className="search-title">锦囊妙记 Note Echo</Title>
        <Button type="primary" className="login-button" onClick={handleLogin}>登录</Button>
      </div>
      <div className="section">
        <Title className="section-title">随手记</Title>
        <Text>想问问题？上传笔记库，问问过去的自己</Text>
        <div className="search-bar">
          <Search
            placeholder="输入你想问的问题"
            enterButton="搜索"
            size="middle"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ maxWidth: '400px', margin: '0 auto' }}
          />
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
