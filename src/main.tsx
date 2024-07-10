import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <ThemeProvider>
      <Analytics />
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
