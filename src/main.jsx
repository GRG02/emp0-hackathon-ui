import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit',
    ].join(','),
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
