import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    Button
} from '@mui/material';

function Download({ open, onClose, url, title = "สร้างรายงานสำเร็จ", message = "กรุณาคลิกลิงก์ด้านล่างเพื่อดาวน์โหลดไฟล์" }) {
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    onClose();
                }
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" py={2}>
                    <Typography variant="body2" textAlign="center" mb={2}>
                        {message}
                    </Typography>

                    {url ? (
                        <Button
                            variant="contained"
                            color="primary"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ดาวน์โหลดไฟล์
                        </Button>
                    ) : (
                        <Typography color="error">ไม่พบลิงก์สำหรับดาวน์โหลด</Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default Download;
