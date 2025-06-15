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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%', }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>ข้อมูลจากใบแจ้งหนี้</Typography>
                <Button sx={{ ...ml_bt, ml: 'auto' }}>Click</Button>
            </Box>
            <Box sx={{ height: '1rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%', }}>
                <Autocomplete
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
                />
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
                <Button sx={{ ...ml_bt, ml: '1rem' }} onClick={invoiceDataFilter}>ค้นหา</Button>
                <Button sx={{ ...ml_bt, ml: '1rem' }} onClick={getAllInvoiceData}>reset</Button>
                <Button sx={{ ...ml_bt, ml: '1rem' }} onClick={makeReport}>report</Button>
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
                                    colSpan={5}
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

            <Loading open={openLoading} onClose={() => setOpenLoading(false)} title="กําลังดาวน์โหลด..." message="กรุณารอสักครู่..." />
            <Download open={openDownload} onClose={() => setOpenDownload(false)} url={fileUrl} />
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
    fontSize: '1.25rem',
    bgcolor: 'darkorange',
    color: 'white',
    '&:hover': {
        bgcolor: 'orangered',
    },
}