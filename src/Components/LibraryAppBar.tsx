import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createUseStyles } from 'react-jss';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import UserProfileDialog from './UserProfileDialog';
import { setLoggedUser } from '../store/features/loggedUserSlice';
import { useAppDispatch } from '../store/hooks'
import { useHistory } from 'react-router-dom';

const drawerWidth = 200;
const useStyles = createUseStyles({
    profile: {
        position: "absolute",
        left: "16px"
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const LibraryAppBar = (props: LibraryAppBarProps) => {
    const { open, handleDrawerOpen } = props;
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [profileOpen, SetProfileOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        SetProfileOpen(false);
    };

    const handleOpenProfile = () => {
        setAnchorEl(null);
        SetProfileOpen(true);
    };
    const handleLogout = () => {
        history.push("/Login");
        dispatch(setLoggedUser(undefined))
        localStorage.removeItem("loggedUser");
    };

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginLeft: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    הספריה שלי
                </Typography>
                <div className={classes.profile}>
                    <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleOpenProfile}>פרופיל</MenuItem>
                        <MenuItem onClick={handleLogout}>התנתק</MenuItem>
                    </Menu>
                    <UserProfileDialog onClose={handleClose} open={profileOpen} />
                </div>
            </Toolbar>
        </AppBar>
    );
}

interface LibraryAppBarProps {
    open?: boolean;
    handleDrawerOpen?: () => void;
}

export default LibraryAppBar;