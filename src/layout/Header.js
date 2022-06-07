import React from 'react'
import {AppBar,
	IconButton,
	Toolbar,
	Box,
	Button
} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {UserMenu} from '../components/menu';
import Sidebar from './Sidebar'

function Header() {
    const {user_email, loading} = useSelector(state => state.auth)
	const [isOpen,setDrawer] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

    const toggleDrawer = () => {
		setDrawer(!isOpen);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};


    return (
        <div>
            <AppBar variant='kerry' position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <div style={{width:'100%'}}>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button sx={{ color:'#FF6400' }} onClick={handleMenu}>
                                {user_email ? user_email : `notLoggedIn@administrator.com`}
                            </Button>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
            <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose}/>
            <Toolbar/>
            <Sidebar isOpen={isOpen} toggle={toggleDrawer}/>
        </div>
    )
}

export default Header