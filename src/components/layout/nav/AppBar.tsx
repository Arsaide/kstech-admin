import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppBar, Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../../../api/context';
import useAnchorElUser from '../../../hooks/use-anchor-el-user/useAnchorElUser';
import { AuthContext } from '../../../providers/AuthProvider';
import { formatTime } from '../../../utils/formatTime';

const AppBarMenu = () => {
    const { store } = useContext(Context);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } =
        useAnchorElUser();

    const remainingTime = parseInt(
        localStorage.getItem('remainingTime') || '3600',
        10,
    );

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
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                            }}
                        >
                            <Typography>{formatTime(remainingTime)}</Typography>
                            <Box>
                                {/*<Tooltip title="Open settings">*/}
                                {/*    <IconButton*/}
                                {/*        onClick={handleOpenUserMenu}*/}
                                {/*        sx={{ p: 0 }}*/}
                                {/*    >*/}
                                {/*        <Avatar alt="Admin" src="/admin.jpg" />*/}
                                {/*    </IconButton>*/}
                                {/*</Tooltip>*/}
                                {/*<Menu*/}
                                {/*    sx={{ mt: '45px' }}*/}
                                {/*    id="menu-appbar"*/}
                                {/*    anchorEl={anchorElUser}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'center',*/}
                                {/*    }}*/}
                                {/*    keepMounted*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'center',*/}
                                {/*    }}*/}
                                {/*    open={Boolean(anchorElUser)}*/}
                                {/*    onClose={handleCloseUserMenu}*/}
                                {/*>*/}
                                {/*    <MenuItem onClick={handleCloseUserMenu}>*/}
                                {/*        <Typography*/}
                                {/*            textAlign={'center'}*/}
                                {/*            onClick={handleLogout}*/}
                                {/*        >*/}
                                {/*            Log out*/}
                                {/*        </Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*</Menu>*/}
                                <Button
                                    // textAlign={'center'}
                                    onClick={handleLogout}
                                    variant="contained"
                                    color="error"
                                >
                                    Вийти
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppBarMenu;
