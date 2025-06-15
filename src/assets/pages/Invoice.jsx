import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Autocomplete } from '@mui/material'
import axios from 'axios';
import Loading from '../popups/Loading';
import Download from '../popups/Download';

function Invoice() {

    const [items, setItems] = useState([]);

    const getAllUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3932e983c9f24c3e95a299b78551a9c6/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=41TjVxCf73vT4dZHZDj--UM01GKpeYwl6kY7hdRYe8o'
    const extractUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/36c30f252e8b4221a2ee8c3e1e70a855/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JCIeg8n4GRBc9FE9oSM9coFjy_aclrwBbJieE1-AK-w'

    const getAllInvoice = async () => {
        try {
            const res = await axios.get(getAllUrl);
            console.log(res.data);
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const extractSelectInvoice = async (ID) => {
        try {
            const res = await axios.post(extractUrl, {
                ID: ID
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllInvoice();
    }, []);

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%', }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>ตรวจสอบเอกสารใบแจ้งหนี้</Typography>
                <Button sx={{ ...ml_bt, ml: 'auto' }}>Click</Button>
            </Box>
            <Box sx={{ height: '1rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%', }}>
                {/* <Autocomplete
                    options={[...new Set(items.map(item => item.company_name).filter(Boolean))]} // ดึงเฉพาะชื่อบริษัทที่ไม่ซ้ำและไม่ null
                    value={company}
                    onChange={(event, newValue) => setCompany(newValue)}
                    renderInput={(params) => <TextField {...params} label="เลือกคู่ค้า" />}
                    freeSolo
                    sx={{ width: 225 }}
                />
                <Autocomplete
                    options={[...new Set(items.map(item => item.product_name).filter(Boolean))]} // ดึงเฉพาะชื่อบริษัทที่ไม่ซ้ำและไม่ null
                    value={product}
                    onChange={(event, newValue) => setProduct(newValue)}
                    renderInput={(params) => <TextField {...params} label="เลือกสินค้า" />}
                    freeSolo
                    sx={{ width: 225, ml: '1rem' }}
                /> */}
                {/* <TextField
                    label="ค้นตั้งแต่"
                    value={start}
                    onChange={(event) => setStart(event.target.value)}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { max: end } }}
                    sx={{ width: 175, ml: '1rem' }}
                />
                <TextField
                    label="จนถึง"
                    value={end}
                    onChange={(event) => setEnd(event.target.value)}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: start } }}
                    sx={{ width: 175, ml: '1rem' }}
                /> */}
                <Button sx={{ ...ml_bt, ml: '1rem' }} onClick={getAllInvoice}>reset</Button>
                <Typography sx={{ fontSize: '1.25rem', ml: '1rem' }}>ส่งใบแจ้งหนี้มาที่อีเมล s6552410024@live.sau.ac.th</Typography>
            </Box>
            <Box sx={{ height: '1rem' }} />
            <TableContainer sx={{ maxHeight: '70vh', border: '2px solid darkorange' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{ bgcolor: 'darkorange' }}>
                        <TableRow>
                            <TableCell align='center' sx={{ color: 'white' }}>ชื่อใบแจ้งหนี้</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>จากอีเมล</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>เมื่อวันที่</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>ไฟล์ใบแจ้งหนี้</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>ยืนยัน</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>ตีกลับ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow sx={{ border: 'none', bgcolor: '#f9f9f9' }}>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        border: 'none',
                                        padding: '2rem',
                                        color: '#999',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    ยังไม่มีข้อมูล
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                        '&:hover': { backgroundColor: '#e3f2fd' },
                                    }}
                                >
                                    <TableCell align="center">
                                        {row.invoice_name ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.sender_email ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.createdAt ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="text"
                                            sx={{
                                                color: 'blue',      // สีฟ้า
                                                textDecoration: 'underline',  // เส้นใต้
                                                padding: 0,         // ลด padding ถ้าต้องการให้เหมือนลิงก์จริงๆ
                                                minWidth: 'auto',   // ลดขนาดปุ่มให้พอดีข้อความ
                                            }}
                                            onClick={() => window.open(row.file_url, '_blank')}
                                        >
                                            กดเพื่อตรวจสอบความถูกต้อง
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            sx={{ fontSize: '1.5rem' }}
                                            onClick={() => extractSelectInvoice(row.ID)}
                                        >
                                            ✅
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            sx={{ fontSize: '1.5rem' }}
                                        >
                                            ❌
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Invoice

const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    height: '100%',
    //bgcolor: 'blue'
}

const ml_bt = {
    fontSize: '1.25rem',
    bgcolor: 'darkorange',
    color: 'white',
    '&:hover': {
        bgcolor: 'orangered',
    },
}