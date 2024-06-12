// src/index.js
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.less'; // 使用 less 文件
import reportWebVitals from './reportWebVitals';
import './theme-overrides.css'; // 引入覆盖样式

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


