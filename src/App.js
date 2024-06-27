import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.less';
import SearchPage from './components/SearchPage';
import RealSearchPage from './components/RealSearchPage';
import ReadArticlePage from './components/ReadArticlePage';
import NotesLibraryPage from './components/NotesLibraryPage';
import HighlightComponent from './components/HighlightComponent';
import './theme-overrides.css';

const { Header, Content } = Layout;

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <Router>
      <Layout className="layout">
        <Header style={{ background: '#fff' }}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">笔记搜索</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/notes-library">笔记管理</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', background: '#fff' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/real-search" element={<RealSearchPage />} />
              <Route path="/read-article" element={<ReadArticlePage />} />
              <Route path="/notes-library" element={<NotesLibraryPage notes={notes} setNotes={setNotes} />} />
              <Route path="/" element={<SearchPage />} />
            </Routes>
          </div>
        </Content>
        <HighlightComponent notes={notes} setNotes={setNotes} />
      </Layout>
    </Router>
  );
}

export default App;
