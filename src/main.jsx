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
          colorPrimary: '#1d1841',
          colorInfo: '#2563eb',
          colorSuccess: '#047857',
          colorWarning: '#f59e0b',
          colorError: '#e91e63',
          colorText: '#1e293b',
          colorTextSecondary: '#64748b',
          colorBgLayout: '#f8fafc',
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
