import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
import { urbanyMantineTheme } from './theme/mantineTheme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={urbanyMantineTheme}>
      <Notifications />
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </MantineProvider>
  </StrictMode>,
)
