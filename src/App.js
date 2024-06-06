import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import RealSearchPage from './components/RealSearchPage'; // 确保导入路径正确

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/real-search" element={<RealSearchPage />} />
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
