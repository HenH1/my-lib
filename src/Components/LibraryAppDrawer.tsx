import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createUseStyles } from 'react-jss';
import { theme } from '../theme';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import AuthorIcon from '@mui/icons-material/Create';

const drawerWidth = 200;
const useStyles = createUseStyles({
    menuItemText: {
        textAlign: 'right',
    },
    selectedScreen: {
        backgroundColor: "rgba(0, 0, 0, 0.14) !important",
        color: "white"
    },
    selectedIcon: {
        color: "white"
    }
});

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
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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

const LibraryAppDrawer = (props: LibraryAppDrawerProps) => {
    const classes = useStyles()
    const menuItems = ['משתמשים', 'ספרים', 'סופרים'];
    const menuIcons = [<PersonIcon />, <BookIcon />, <AuthorIcon />];

    return (
        <Drawer variant="permanent" anchor="right" open={props.open}>
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuItems.map((text, index) => (
                    <ListItem button key={text}
                        onClick={(event) => props.handleMenuItemClick(index)}
                        selected={index === props.selectedIndex}
                        className={props.selectedIndex === index ? classes.selectedScreen : ""}>
                        <ListItemIcon
                            className={props.selectedIndex === index ? classes.selectedIcon : ""}>
                            {menuIcons[index]}
                        </ListItemIcon>
                        <ListItemText className={classes.menuItemText} primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer >
    );
}

interface LibraryAppDrawerProps {
    open?: boolean;
    handleDrawerClose?: () => void;
    handleMenuItemClick: (index: number) => void;
    selectedIndex: number;
}

export default LibraryAppDrawer;