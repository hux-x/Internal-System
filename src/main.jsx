import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OverallContextProvider from './components/context/Overall'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OverallContextProvider> 
    <App />
    </OverallContextProvider> 
  </StrictMode>,
)
