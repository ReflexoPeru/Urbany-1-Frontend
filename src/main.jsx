import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
import { urbanyMantineTheme } from './theme/mantineTheme.js'

const antdConfig = {
  theme: {
    token: {
      zIndexBase: 1000,
      zIndexPopupBase: 10000,
      borderRadius: 8,
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    components: {
      Select: {
        zIndexPopup: 10000,
      },
      Dropdown: {
        zIndexPopup: 10000,
      },
      Tooltip: {
        zIndexPopup: 10000,
      },
      Popover: {
        zIndexPopup: 10000,
      },
      Modal: {
        zIndexBase: 1000,
      },
      Drawer: {
        zIndexBase: 1000,
      },
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider {...antdConfig}>
      <MantineProvider theme={urbanyMantineTheme}>
        <Notifications />
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </MantineProvider>
    </ConfigProvider>
  </StrictMode>,
)
