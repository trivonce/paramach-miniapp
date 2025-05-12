import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import QueryProvider from './lib/providers/query-provider'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <App />
    </QueryProvider>
  </BrowserRouter>,
)
