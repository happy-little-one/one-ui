import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { render } from 'react-dom'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

import App from './app'

render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <App />
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)
