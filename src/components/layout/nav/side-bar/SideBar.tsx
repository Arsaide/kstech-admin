import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import './SideBar.css';
import { FC } from 'react';
import DrawerElements from './sub-components/drawer/Drawer.tsx';
import { drawerWidth } from '../index.ts';
import { Outlet } from 'react-router-dom';

interface SideBarProps {
    children?: React.ReactNode;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <DrawerElements />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1.5,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {children}
                <Outlet />
            </Box>
        </Box>
    );
};

export default SideBar;
