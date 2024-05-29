// src/components/SearchPage.js
import React, { useState } from 'react';
import { Input, Typography, Layout } from 'antd';
import SearchResult from './SearchResult';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    // 示例数据
    const sampleResults = [
      { id: 1, title: '笔记1', content: '这是第一条笔记的内容。' },
      { id: 2, title: '笔记2', content: '这是第二条笔记的内容。' },
      { id: 3, title: '笔记3', content: '这是第三条笔记的内容。' },
      { id: 4, title: '笔记4', content: '这是第四条笔记的内容。' },
      { id: 5, title: '笔记5', content: '这是第五条笔记的内容。' },
    ];
    // 模拟异步调用
    setTimeout(() => setResults(sampleResults), 500);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Title level={2} style={{ textAlign: 'center' }}>搜索笔记</Title>
      </Header>
      <Content style={{ margin: '16px' }}>
        <Search
          placeholder="输入搜索内容"
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
        {results.length > 0 && (
          <div>
            {results.map(result => (
              <SearchResult key={result.id} title={result.title} content={result.content} />
            ))}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default SearchPage;
