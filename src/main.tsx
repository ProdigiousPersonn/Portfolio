import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/DarkMode.css'
import '@styles/App.css'
import '@styles/Markdown.css'

import App from '@/App.tsx'
import Loading from "@components/LoadingScreen"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loading/>
    <App />
  </StrictMode>,
)
