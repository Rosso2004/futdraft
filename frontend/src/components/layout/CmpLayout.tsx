import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Container, CssBaseline, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';
import { useGlobalState } from "../../global/GlobalStateContext";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ConfigNavigation} from "./ConfigNavigation.tsx";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

type ICmpLayout = React.PropsWithChildren<{
    title: string;
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    avatarData?: string;
}>

const CmpLayout: React.FC<ICmpLayout> = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const { isVerified, setIsVerified } = useGlobalState();
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <>
            {isVerified ?
                <>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="fixed" open={open} sx={{ backgroundColor: '#e1ff57' }}>
                            <Toolbar>
                                {!isMobile && (
                                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{
                                        marginRight: 5,
                                        color:'black',
                                        ...(open && { display: 'none' }),
                                    }}>
                                        <MenuIcon />
                                    </IconButton>
                                )}
                                <Typography variant="h6" noWrap sx={{ flexGrow: 1, display:'flex', alignItems:'center', gap:1, color:'black', fontWeight:700 }} component="div">
                                    <img src='https://imgur.com/Q0leBft.png' width='50px'/>
                                    {props.title}
                                </Typography>

                                <Tooltip title="Apri impostazioni" placement="top-end">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Rosso Simone">{props.avatarData}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => {
                                        handleNavigate("/profile");
                                        handleCloseUserMenu();
                                    }}>Profilo</MenuItem>
                                    <MenuItem onClick={() => {
                                        setIsVerified(false);
                                        handleNavigate("/");
                                        handleCloseUserMenu();
                                    }}>Esci</MenuItem>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                        {!isMobile ? (
                            <Drawer variant="permanent" open={open}>
                                <DrawerHeader>
                                    <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                                    </IconButton>
                                </DrawerHeader>
                                <Divider />
                                <List>
                                    {ConfigNavigation.map((item) => item.icon && (
                                        <ListItemButton
                                            key={item.path}
                                            onClick={() => handleNavigate(item.path)}
                                            style={location.pathname === item.path ? { borderRight: '4px solid #e1ff57' } : {}}
                                        >
                                            <ListItemIcon>
                                                <item.icon />
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Drawer>
                        ) : (
                            <BottomNavigation
                                showLabels
                                sx={{
                                    position: 'fixed',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                    zIndex: theme.zIndex.drawer + 1,
                                    backgroundColor: '#F0F0F0'
                                }}
                            >
                                {ConfigNavigation.map((item) => item.icon && (
                                    <BottomNavigationAction
                                        key={item.path}
                                        label={item.title}
                                        icon={<item.icon />}
                                        onClick={() => handleNavigate(item.path)}
                                    />
                                ))}
                            </BottomNavigation>
                        )}
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <DrawerHeader />
                            <Container maxWidth={props.maxWidth}>
                                {props.children}
                            </Container>
                        </Box>
                    </Box>
                </> : <>{props.children}</>}
        </>
    );
}

export default CmpLayout;
