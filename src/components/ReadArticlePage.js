import React, { useState } from 'react';
import { Input, Button, Typography, Card } from 'antd';
import { BulbOutlined, DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import './RealSearchPage.css';

const { Title, Text } = Typography;

const RealSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    const sampleResults = [
      {
        id: 1,
        title: value,
        content: `想不想上班的唯一方式就是：你已经把现在手上的这份班上透了。所以，如果你想要辞掉手头这份工作，最好的方式就是，更加勤奋地工作，加快完成这个目标。相反，如果你想在这个地方待一辈子，那么就请尽情地抱怨、换鱼、消极怠工吧。`,
        date: '2024-03-22 星期四',
        source: '微信读书',
        logo: '/icons/wechat-read-logo.jpeg' // 使用相对路径
      },
      {
        id: 2,
        title: value,
        content: `这是我的一个做事秘诀：越是不喜欢的工作，越要试着把它做出花来。讨厌一件事的方式是做好它，这样才能超越它。只有做好、做透了一件事，你才能非常顺畅地总结和传递经验流程，并且迅速地回答解决一切有关它的问题，从而能够逐渐把它完全......`,
        date: '2024-03-21 星期三',
        source: '微信读书',
        logo: '/icons/wechat-read-logo.jpeg' // 使用相对路径
      },
      {
        id: 3,
        title: value,
        content: `恰恰是我第一份工作的老板提醒我：“你不会在这里待一辈子的，要想好你退出的时候需要从我们这里获得什么，然后尽量推你每天要把多精力放在哪里。”`,
        date: '2024-02-22 星期二',
        source: '微信读书',
        logo: '/icons/wechat-read-logo.jpeg' // 使用相对路径
      }
    ];
    setResults(sampleResults);
  };

  const handleDownload = (id) => {
    const element = document.getElementById(`result-card-${id}`);
    // 隐藏下载按钮
    const downloadButton = element.querySelector('.result-card-download');
    downloadButton.style.display = 'none';

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgWidth = canvas.width / 2;
      const imgHeight = canvas.height / 2;

      const newCanvas = document.createElement('canvas');
      newCanvas.width = imgWidth;
      newCanvas.height = imgHeight + 50; // 添加额外的高度用于显示宣传语和链接

      const ctx = newCanvas.getContext('2d');
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
      ctx.drawImage(canvas, 0, 0, imgWidth, imgHeight);

      ctx.fillStyle = "#333";
      ctx.font = "16px Arial";
      ctx.fillText("搜个人笔记，用锦囊妙记", 10, imgHeight + 30);
      ctx.fillStyle = "#0EB4D3";
      ctx.textAlign = "right";
      ctx.fillText("https://example.com", imgWidth - 10, imgHeight + 30); // 控制链接位置在卡片内，贴着右侧边框

      const link = document.createElement('a');
      link.download = `result-${id}.png`;
      link.href = newCanvas.toDataURL('image/png');
      link.click();
    }).finally(() => {
      // 恢复下载按钮
      downloadButton.style.display = 'inline';
    });
  };

  return (
    <div className="real-search-container">
      <Title className="search-title">锦囊妙记 Note Echo</Title>
      <div className="search-bar">
        <Input
          placeholder="输入搜索内容"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={() => handleSearch(query)}
          className="search-input"
        />
        <Button type="primary" className="search-button" onClick={() => handleSearch(query)}>搜索</Button>
      </div>
      <div className="results-container">
        {results.map(result => (
          <Card key={result.id} className="result-card" id={`result-card-${result.id}`}>
            <BulbOutlined className="result-card-icon" />
            <div className="result-card-content">
              <Title level={4} className="result-card-title">{result.title}</Title>
              <Text className="result-card-date">记录日期 {result.date}</Text>
              <Text className="result-card-text">{result.content}</Text>
              <div className="result-card-source">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={result.logo} alt={result.source} className="result-card-logo" />
                  <Text className="result-card-source-text">{result.source}</Text>
                </div>
                <DownloadOutlined className="result-card-download" onClick={() => handleDownload(result.id)} style={{ fontSize: '24px', color: '#0EB4D3', cursor: 'pointer' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealSearchPage;
