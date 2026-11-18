import '../src/index.css'
import '../src/App.css'
import { ConfigProvider, App as AntdApp } from 'antd'
import { mswLoader } from 'msw-storybook-addon/csf3'
import { mswHandlers } from './msw-handlers'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
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
          <Story />
        </AntdApp>
      </ConfigProvider>
    ),
  ],
  loaders: [mswLoader()],
  async beforeEach({ msw }) {
    msw.use(...mswHandlers)
  },
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;