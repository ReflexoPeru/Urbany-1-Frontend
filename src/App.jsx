import Router from './routes/Router'
import { ToastProvider } from './contexts/ToastContext'
import { ConfirmModalProvider } from './contexts/ConfirmModalContext'
import ToastContainer from './components/ui/Toast/ToastContainer'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <ConfirmModalProvider>
        <Router />
        <ToastContainer />
      </ConfirmModalProvider>
    </ToastProvider>
  )
}

export default App