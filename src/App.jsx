import { Box, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './assets/components/Sidebar'
import Home from './assets/pages/Home'
import Invoice from './assets/pages/Invoice'
import Data from './assets/pages/Data'
import Chat from './assets/pages/Chat'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [count, setCount] = useState(0);

  const newCountUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d83bea4bf76545578c4504573dedd735/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=K-ob-1fI5Xkv_Fe8gB3PkqrGhKR7LZ6Adl_6wVUI1UU'

  const newCount = async () => {
    try {
      const res = await axios.get(newCountUrl);
      console.log(res.data);
      setCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newCount();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar count={count} /> {/* ไม่มี padding */}

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
