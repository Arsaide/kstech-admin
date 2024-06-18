import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AppBar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../utils/providers/AuthProvider.tsx';
import useAnchorElUser from '../../../hooks/use-anchor-el-user/useAnchorElUser.ts';
import { Context } from '../../../api/context.ts';

const AppBarMenu = () => {
    const { store } = useContext(Context);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } =
        useAnchorElUser();

    const handleLogout = () => {
        store.logout().then(() => setIsLoggedIn(false));
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                        }}
                    >
                        KS TECH - Адмін
                    </Typography>
                    {isLoggedIn && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Admin" src="/admin.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        textAlign={'center'}
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppBarMenu;
