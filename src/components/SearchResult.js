// src/components/SearchResult.js
import React from 'react';
import { Card } from 'antd';

const SearchResult = ({ title, content }) => (
  <Card title={title} style={{ marginBottom: 16 }}>
    <p>{content}</p>
  </Card>
);

export default SearchResult;
