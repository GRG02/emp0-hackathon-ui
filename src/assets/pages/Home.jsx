import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right, #fff3e0, #ffe0b2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 8 },
      }}
    >
      {/* Header + Button */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '8rem', variant:"h1", fontWeight:"bold" }} color="#e65100">
            Emp0
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', fontSize: '1.75rem', mt: 1 }}
          >
            เครื่องมืออัจฉริยะลดภาระงานเอกสารสำหรับธุรกิจขนาดเล็กและขนาดกลางในประเทศไทย
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{
            alignSelf: 'center',
            ml: 'auto',
            mr: 2,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            bgcolor: '#fb8c00',
            '&:hover': { bgcolor: '#ef6c00' },
          }}
          onClick={() => navigate('/invoice')}
        >
          เริ่มต้นใช้งาน
        </Button>
      </Box>

      {/* Description bullets */}
      <Box sx={{ mt: 5, maxWidth: '700px' }}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem', color: '#888'}}>
          • ลดภาระงานเอกสารซ้ำซ้อนของธุรกิจ SME
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem', color: '#888' }}>
          • รวมเอกสารจากหลายแหล่งไว้ในที่เดียว
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem', color: '#888' }}>
          • ใช้ AI เพื่อดึงข้อมูลสำคัญจากใบแจ้งหนี้อัตโนมัติ
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.5rem', color: '#888' }}>
          • เชื่อมต่อกับ Power Automate และ Power BI ได้
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
