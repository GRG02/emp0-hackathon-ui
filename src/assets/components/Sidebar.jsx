import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Toolbar } from '@mui/material'
import { Home, ReceiptLong, TableChart, ChatBubbleOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/invoice">
            <ListItemIcon><ReceiptLong /></ListItemIcon>
            <ListItemText primary="Invoice" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/data">
            <ListItemIcon><TableChart /></ListItemIcon>
            <ListItemText primary="Data" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/chat">
            <ListItemIcon><ChatBubbleOutline /></ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
