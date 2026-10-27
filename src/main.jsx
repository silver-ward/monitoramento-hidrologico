import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App as AntdApp, ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa4165',
          colorInfo: '#6029a5',
          colorSuccess: '#16805d',
          colorWarning: '#d99b18',
          colorError: '#d94b62',
          colorText: '#26194f',
          colorTextSecondary: '#706a81',
          colorBgLayout: '#f8f7fb',
          colorBorder: '#ebe8f1',
          borderRadius: 8,
          fontFamily: 'Comfortaa, sans-serif',
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>,
)
