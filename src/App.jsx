import { Box, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './assets/components/Sidebar'
import Home from './assets/pages/Home'
import Invoice from './assets/pages/Invoice'
import Data from './assets/pages/Data'
import Chat from './assets/pages/Chat'

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar /> {/* ไม่มี padding */}

        <Box component="main" sx={universal}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/data" element={<Data />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </Box>
    </>
  )
}

export default App

const universal = {
  flexGrow: 1,
  px: '2rem',
}
