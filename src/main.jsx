import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import Resume from './Resume'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'

// Two static pages (index.html and resume.html) share this entry; each says which one it is.
// No client-side router, so the site works from any folder or domain on a static host.
const Page = document.body.dataset.page === 'resume' ? Resume : Home

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
