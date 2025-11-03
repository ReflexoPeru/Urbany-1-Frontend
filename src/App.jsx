import Router from './routes/Router'
import { ToastProvider } from './contexts/ToastContext'
import { ConfirmModalProvider } from './contexts/ConfirmModalContext'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <ConfirmModalProvider>
        <Router />
      </ConfirmModalProvider>
    </ToastProvider>
  )
}

export default App