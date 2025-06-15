import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Autocomplete } from '@mui/material'
import axios from 'axios';
import Loading from '../popups/Loading';
import Download from '../popups/Download';

function Data() {
    const [items, setItems] = useState([]);

    const [company, setCompany] = useState('');
    const [product, setProduct] = useState('');
    //const [start, setStart] = useState('');
    //const [end, setEnd] = useState('');

    const [openLoading, setOpenLoading] = useState(false);
    const [openDownload, setOpenDownload] = useState(false);

    const [fileUrl, setFileUrl] = useState("");

    const getAllUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/4a9eb21bf809449d85aa86995aadc426/triggers/manual/paths/invoke//home?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ApRNpJzPP155DrDopNUEFFfwf38HHkGh98iEog1dgpM'
    const filterUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/86358803e03f41439500d3914c5eeaf8/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GYzCXne8oaJloYKHazY60JOi-HvbXb23Q762BGIrYf0'
    const reportUrl = 'https://default725423d5dac742bd8d49ac42da8a30.c2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/b8a88735b754499eb1d43339b3c5156d/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-725423d5-dac7-42bd-8d49-ac42da8a30c2&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9rOZ4v-Q1x4QwejauK4c3gaSsugiqnq771tUrAfz8mQ'

    const getAllInvoiceData = async () => {
        try {
            const res = await axios.get(getAllUrl);
            console.log(res.data);
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const invoiceDataFilter = async () => {
        try {

            if (company === '' && product === '' && start === '' && end === '') {
                alert('กรุณาเลือกวิธีค้นหาอย่างน้อย 1 รายการ');
                return;
            }

            const res = await axios.post(filterUrl, {
                company_name: company,
                product_name: product,
                //start_date: start,
                //end_date: end,
            })

            console.log(res.data);
            setItems(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const makeReport = async () => {
        try {
            const cleanedItems = items.map(item => ({
                company_name: item.company_name ?? '-',
                product_name: item.product_name ?? '-',
                qty: item.qty ?? '-',
                unit_price: item.unit_price ?? '-',
                due_at: item.due_at ?? '-',
            }));

            setOpenLoading(true);

            const res = await axios.post(reportUrl, { report: cleanedItems });
            const url = res.data?.fileUrl;

            if (url) {
                setFileUrl(url);
                setOpenDownload(true);
            } else {
                alert("ยังไม่ได้รับลิงก์ไฟล์ หรือไฟล์ว่าง");
            }
        } catch (err) {
            console.error(err);
            alert("ไม่สามารถสร้างรายงานได้");
        } finally {
            setOpenLoading(false);
        }
    };

    useEffect(() => {
        getAllInvoiceData();
    }, []);

    return (
        <Box sx={container}>
            <Box sx={{ height: '4.5rem' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    ข้อมูลจากใบแจ้งหนี้
                </Typography>
            </Box>

            <Box sx={{ height: '0.5rem' }} />

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    bgcolor: '#fff3e0',
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <Autocomplete
                    options={[...new Set(items.map(item => item.company_name).filter(Boolean))]}
                    value={company}
                    onChange={(event, newValue) => setCompany(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="เลือกคู่ค้า"
                            sx={{
                                backgroundColor: 'white',
                                '& .MuiInputBase-input': { color: 'black' },
                                '& .MuiInputLabel-root': { color: 'black' },
                            }}
                        />
                    )}
                    freeSolo
                    sx={{ width: 225 }}
                />

                <Autocomplete
                    options={[...new Set(items.map(item => item.product_name).filter(Boolean))]}
                    value={product}
                    onChange={(event, newValue) => setProduct(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="เลือกสินค้า"
                            sx={{
                                backgroundColor: 'white',
                                '& .MuiInputBase-input': { color: 'black' },
                                '& .MuiInputLabel-root': { color: 'black' },
                            }}
                        />
                    )}
                    freeSolo
                    sx={{ width: 225 }}
                />


                <Button
                    variant="contained"
                    color="warning"
                    onClick={invoiceDataFilter}
                    sx={{
                        height: '56px',
                        minWidth: '100px',
                    }}
                >
                    ค้นหา
                </Button>

                <Button
                    variant="contained"
                    onClick={getAllInvoiceData}
                    sx={{
                        ml: 'auto',
                        height: '56px',
                        minWidth: '100px',
                        backgroundColor: '#9e9e9e',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#757575',
                        },
                    }}
                >
                    Reset 🔄
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={makeReport}
                    sx={{
                        height: '56px',
                        minWidth: '100px',
                    }}
                >
                    Report
                </Button>
            </Box>

            <Box sx={{ height: '1rem' }} />

            <TableContainer sx={{ maxHeight: '70vh', border: '2px solid darkorange', borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                'ชื่อบริษัทหรือคู่ค้า',
                                'ชื่อสินค้าหรือบริการ',
                                'จำนวน',
                                'ราคาต่อหน่วย',
                                'กำหนดชำระ',
                            ].map((text, idx) => (
                                <TableCell
                                    key={idx}
                                    align="center"
                                    sx={{
                                        backgroundColor: '#fb8c00',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        zIndex: 1,
                                    }}
                                >
                                    {text}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                                <TableCell
                                    colSpan={5}
                                    align="center"
                                    sx={{
                                        padding: '2rem',
                                        color: '#999',
                                        fontStyle: 'italic',
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
                                        backgroundColor: index % 2 === 0 ? '#fdfdfd' : '#f9f9f9',
                                        '&:hover': { backgroundColor: '#e3f2fd' },
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    <TableCell align="center">{row.company_name ?? '-'}</TableCell>
                                    <TableCell align="center">{row.product_name ?? '-'}</TableCell>
                                    <TableCell align="center">{row.qty ?? '-'}</TableCell>
                                    <TableCell align="center">{row.unit_price ?? '-'}</TableCell>
                                    <TableCell align="center">{row.due_at ?? '-'}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Loading open={openLoading} onClose={() => setOpenLoading(false)} title="กําลังดาวน์โหลด..." message="กรุณารอสักครู่..." />
            <Download open={openDownload} onClose={() => setOpenDownload(false)} url={fileUrl} />
        </Box>
    );

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
    fontSize: '1.25rem',
    bgcolor: 'darkorange',
    color: 'white',
    '&:hover': {
        bgcolor: 'orangered',
    },
}