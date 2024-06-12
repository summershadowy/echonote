const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0EB4D3', // 主题色
              '@border-radius-base': '8px', // 全局圆角
              '@input-hover-border-color': '#0EB4D3', // 输入框悬停边框颜色
              '@input-focus-border-color': '#0EB4D3', // 输入框焦点边框颜色
              '@picker-basic-cell-hover-with-range-color': '#0EB4D3', // 日期选择器悬停颜色
              '@picker-date-hover-range-border-color': '#0EB4D3', // 日期选择器悬停边框颜色
              '@picker-date-hover-range-color': '#0EB4D3', // 日期选择器悬停背景颜色
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
