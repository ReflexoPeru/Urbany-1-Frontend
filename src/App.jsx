import Router from './routes/Router'
import { ToastProvider } from './contexts/ToastContext'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  )
}

export default App
