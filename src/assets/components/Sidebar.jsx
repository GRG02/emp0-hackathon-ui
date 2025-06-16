import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Toolbar,
    Avatar,
    Typography,
    Box,
    Divider,
} from '@mui/material'
import { Home, ReceiptLong, TableChart, ChatBubbleOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const drawerWidth = {
    sm: 160,
    md: 200,
    lg: 240,
}

// 👇 รับ newCount ผ่าน props
const Sidebar = ({ count }) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#fff3e0',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                },
            }}
        >
            <Toolbar />

            {/* Profile section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 1,
                    p: 1,
                    bgcolor: '#ffe0b2',
                    borderRadius: 2,
                    boxShadow: 1,
                    flexShrink: 0,
                }}
            >
                <Avatar
                    src="https://i.pravatar.cc/100?img=12"
                    sx={{ width: 80, height: 80, mb: 1 }}
                    alt="User Avatar"
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    นายสมชาย ใจดี
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    รหัส: 12345
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ตำแหน่ง: นักบัญชี
                </Typography>
            </Box>

            <Box sx={{ height: 20 }} />
            <Divider />

            <List sx={{ flexGrow: 1, overflowY: 'auto', pt: 1 }}>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="หน้าหลัก" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/invoice">
                        <ListItemIcon><ReceiptLong /></ListItemIcon>
                        <ListItemText
                            primary={
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <span>ใบแจ้งหนี้</span>
                                    {count > 0 && (
                                        <Box
                                            sx={{
                                                ml: 1,
                                                backgroundColor: 'red',
                                                borderRadius: '50%',
                                                width: 20,
                                                height: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h6" color="white">
                                                {count}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            }
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/data">
                        <ListItemIcon><TableChart /></ListItemIcon>
                        <ListItemText primary="ข้อมูล" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/chat">
                        <ListItemIcon><ChatBubbleOutline /></ListItemIcon>
                        <ListItemText primary="ถามแชท" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar
