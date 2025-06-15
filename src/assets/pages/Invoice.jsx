import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Autocomplete } from '@mui/material'
import axios from 'axios';
import Loading from '../popups/Loading';
import Download from '../popups/Download';

function Invoice() {

    const [items, setItems] = useState([]);

    const getAllUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3932e983c9f24c3e95a299b78551a9c6/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=41TjVxCf73vT4dZHZDj--UM01GKpeYwl6kY7hdRYe8o'
    const extractUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/36c30f252e8b4221a2ee8c3e1e70a855/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JCIeg8n4GRBc9FE9oSM9coFjy_aclrwBbJieE1-AK-w'
    const setIsNewUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/8bef31d32ba7454a9c9f1e3ff9a51336/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-6A_hWmvsEPXQ5Nu25FkfjMWKge3ENyI8n3BasZWTxU'

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
            });
            console.log(res.data);

            // ลบ item ที่มี ID ตรงกันออกจาก state
            setItems((prevItems) => prevItems.filter(item => item.ID !== ID));
        } catch (error) {
            console.log(error);
        }
    };

    const setIsNew = async (ID) => {
        try {
            const res = await axios.post(setIsNewUrl, {
                ID: ID
            });
        } catch (error) {
        }
    };

    useEffect(() => {
        getAllInvoice();
    }, []);

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 2, alignSelf: 'flex-start' }}>
                ตรวจสอบเอกสารใบแจ้งหนี้
            </Typography>

            {/* Action bar */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
                bgcolor: '#fff3e0',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {/* <Autocomplete ... /> */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button sx={{ ...ml_bt, ml: '0' }} onClick={getAllInvoice}>
                        reset
                    </Button>
                    <Typography sx={{ fontSize: '1rem', ml: 2 }}>
                        ส่งใบแจ้งหนี้มาที่ <strong style={{ color: 'orangered' }}>s6552410024@live.sau.ac.th</strong> ระบบจะใช้เวลารับอีเมลประมาณ 10-20 วินาที โปรดรอสักครู่แล้วกดปุ่ม reset
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ height: '1rem' }} />

            {/* Table */}
            <TableContainer
                sx={{
                    maxHeight: '70vh',
                    border: '1px solid #ffa726',
                    borderRadius: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['ชื่อใบแจ้งหนี้', 'จากอีเมล', 'เมื่อวันที่', 'ไฟล์ใบแจ้งหนี้', 'ยืนยัน', 'ตีกลับ'].map((text, idx) => (
                                <TableCell
                                    key={idx}
                                    align="center"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        backgroundColor: '#fb8c00', // กำหนดพื้นหลังตรงนี้
                                        zIndex: 1 // ป้องกันซ้อนกันผิดพลาดเวลา scroll
                                    }}
                                >
                                    {text}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        border: 'none',
                                        padding: '2rem',
                                        color: '#999',
                                        fontStyle: 'italic',
                                        bgcolor: '#f9f9f9'
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
                                        '&:hover': { backgroundColor: '#f1f8e9' },
                                    }}
                                >
                                    <TableCell align="center">
                                        {row.invoice_name ?? '-'}
                                        {row.is_new === "1" && (
                                            <span
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: 'red',
                                                    fontWeight: 'bold',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    marginLeft: '0.5rem', // เว้นห่างจากชื่อ
                                                    display: 'inline-block'
                                                }}
                                            >
                                                NEW
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">{row.sender_email ?? '-'}</TableCell>
                                    <TableCell align="center">{row.createdAt ?? '-'}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="text"
                                            sx={{
                                                color: '#1e88e5',
                                                textDecoration: 'underline',
                                                padding: 0,
                                                minWidth: 'auto',
                                                fontWeight: 500
                                            }}
                                            onClick={() => {
                                                window.open(row.file_url, '_blank');
                                                setIsNew(0);
                                                setItems(prev =>
                                                    prev.map(item =>
                                                        item.ID === row.ID ? { ...item, is_new: 0 } : item
                                                    )
                                                );
                                                setIsNew(row.ID); // ถ้าต้องการอัปเดตฝั่ง server ด้วย
                                            }}
                                        >
                                            กดเพื่อตรวจสอบความถูกต้อง
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            sx={{
                                                fontSize: '1.5rem',
                                                color: 'green',
                                                '&:hover': { bgcolor: '#e8f5e9' }
                                            }}
                                            onClick={() => extractSelectInvoice(row.ID)}
                                            disabled={row.is_new === "1"}
                                        >
                                            ✅
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            sx={{
                                                fontSize: '1.5rem',
                                                color: 'red',
                                                '&:hover': { bgcolor: '#ffebee' }
                                            }}
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
    );

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