import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import {
    BadgeDollarSign,
    Home,
    LayoutList,
    Plus,
    Users,
    Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { MainColorsEnum } from '../../../../../../utils/enums/colors-enum';

const DrawerElements = () => {
    const [page, setPage] = useState<string | null>('1');
    const handleClick = () => {
        if (localStorage.getItem('ProductListPage')) {
            setPage(localStorage.getItem('ProductListPage'));
        } else {
            localStorage.setItem('ProductListPage', '1');
            setPage('1');
        }
    };

    return (
        <div>
            <Divider />
            <List>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.BLACK02 } }}
                    onClick={handleClick}
                >
                    <NavLink
                        to={'/'}
                        style={{ width: '100%' }}
                        className={({ isActive }) =>
                            [isActive ? 'active' : ''].join(' ')
                        }
                    >
                        <ListItemButton sx={{ color: MainColorsEnum.BLACK }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.BLACK }}>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary={'Головна'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.BLACK02 } }}
                    onClick={handleClick}
                >
                    <NavLink
                        to={`/products-list?page=${page}`}
                        style={{ width: '100%' }}
                    >
                        <ListItemButton sx={{ color: MainColorsEnum.BLACK }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.BLACK }}>
                                <LayoutList />
                            </ListItemIcon>
                            <ListItemText primary={'Всі товари'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.BLACK02 } }}
                    onClick={handleClick}
                >
                    <NavLink to={'/create'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColorsEnum.BLACK }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.BLACK }}>
                                <Plus />
                            </ListItemIcon>
                            <ListItemText primary={'Створити товар'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.BLACK02 } }}
                    onClick={handleClick}
                    disabled
                >
                    {/*<NavLink to={'/analytics'} style={{ width: '100%' }}>*/}
                    <ListItemButton sx={{ color: MainColorsEnum.BLACK }}>
                        <ListItemIcon sx={{ color: MainColorsEnum.BLACK }}>
                            <BadgeDollarSign />
                        </ListItemIcon>
                        <ListItemText primary={'Аналітика'} />
                        <Wrench size={16} />
                    </ListItemButton>
                    {/*</NavLink>*/}
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.BLACK02 } }}
                    onClick={handleClick}
                    disabled
                >
                    {/*<NavLink to={'/clients'} style={{ width: '100%' }}>*/}
                    <ListItemButton sx={{ color: MainColorsEnum.BLACK }}>
                        <ListItemIcon sx={{ color: MainColorsEnum.BLACK }}>
                            <Users />
                        </ListItemIcon>
                        <ListItemText primary={'Клієнти'} />
                        <Wrench size={16} />
                    </ListItemButton>
                    {/*</NavLink>*/}
                </ListItem>
            </List>
        </div>
    );
};

export default DrawerElements;
