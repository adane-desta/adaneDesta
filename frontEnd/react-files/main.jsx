import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './headerstyle.css'
import App from './App.jsx'

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
