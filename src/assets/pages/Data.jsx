import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';

function Data() {
    const [items, setItems] = useState([]);

    const url = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/4a9eb21bf809449d85aa86995aadc426/triggers/manual/paths/invoke//home?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ApRNpJzPP155DrDopNUEFFfwf38HHkGh98iEog1dgpM'

    useEffect(() => {
        const getAllInvoiceData = async () => {
            try {
                const res = await axios.get(url);
                console.log(res.data);
                setItems(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllInvoiceData();
    }, []);

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%', }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>ข้อมูลจากใบแจ้งหนี้</Typography>
                <Button sx={ml_bt}>Click</Button>
            </Box>
            <Box sx={{ height: '1rem' }} />
            <TableContainer sx={{ maxHeight: '70vh', border: '2px solid darkorange' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{ bgcolor: 'darkorange' }}>
                        <TableRow>
                            <TableCell align='center' sx={{ color: 'white' }}>ชื่อบริษัทหรือคู่ค้า</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>ชื่อสินค้าหรือบริการ</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>จำนวน</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>ราคาต่อหน่วย</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>กำหนดชำระ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow sx={{ border: 'none', bgcolor: '#f9f9f9' }}>
                                <TableCell
                                    colSpan={4}
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
                                        {row.company_name ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.product_name ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.qty ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.unit_price ?? '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.due_at ?? '-'}
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

export default Data

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
    ml: 'auto',
    fontSize: '1.25rem',
    bgcolor: 'darkorange',
    color: 'white',
    '&:hover': {
        bgcolor: 'orangered',
    },
}