import { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import '../css/header.css'
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const drawerWidth = 240;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const [isAuth, setIsAuth] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        (localStorage.getItem("token") !== null) ? setIsAuth(true) : setIsAuth(false)
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const redirect = () => {
        navigate("/login")
    }

    const drawer = (
        //TODO:drawer içeriği yapılacak
        <div>
            <h6>My Blog</h6>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className='header-container'>
            <div className='header-navbar'>
                <div style={{ marginLeft: '10px', width: '270px' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <ArticleIcon sx={{ fontSize: '60px', color: '#FFFFFF' }} />
                    </IconButton>

                </div>
                <div className='header-column'>
                    <h2 className='header-title' style={{ marginRight: '20px', cursor: 'pointer' }}> My Blog</h2>
                </div>
                <div className='header-column'>
                    {
                        isAuth ? <Button variant='contained' >Logout</Button> : <Button variant='outlined' color='inherit' onClick={redirect}>Login / Register</Button>
                    }
                </div>
            </div>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </div >
    );
}


export default Header;