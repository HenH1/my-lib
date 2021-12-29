import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import LibraryAppBar from '../components/LibraryAppBar';
import LibraryAppDrawer from '../components/LibraryAppDrawer';
import LContainerManagement from '../components/LContainerManagement';
import RContainerManagement from '../components/RContainerManagement';
import { selectLoggedUser, setLoggedUser } from '../store/features/loggedUserSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const useStyles = createUseStyles({
    container: {
        display: 'flex',
    },
    leftRightMainScreen: {
        flexGrow: 1, p: 3
    },
    grid: {
        justifyContent: "space-evenly",
        height: "85vh",
        paddingTop: "16px"
    }
});

const AppPage = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [selectedMenuItemIndex, setSelectedMenuItemIndex] = React.useState(0);
    const [selectedCard, setSelectedCard] = React.useState<any>();
    const loggedUser = useAppSelector(selectLoggedUser);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleMenuItemClick = (index: number) => {
        setSelectedMenuItemIndex(index);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Card id object from type User,Book or author.
    const handleSelectCard = (card: any) => {
        // setting the selected card obj
        setSelectedCard(card);
    };

    useEffect(() => {
        const userJson = localStorage.getItem("loggedUser");
        if (userJson) {
            dispatch(setLoggedUser(JSON.parse(userJson)))
        }

        if (!(loggedUser || userJson)) {
            history.push("/login");
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const appBar = useMemo(() => <LibraryAppBar open={open} handleDrawerOpen={handleDrawerOpen} />, [open]);
    const leftScreen = useMemo(() => <LContainerManagement objectType={selectedMenuItemIndex} rightCardObj={selectedCard}></LContainerManagement>, [selectedCard]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box component="main" className={classes.container}>
            <CssBaseline />
            {appBar}
            <LibraryAppDrawer handleMenuItemClick={handleMenuItemClick} handleDrawerClose={handleDrawerClose} open={open} selectedIndex={selectedMenuItemIndex} />
            <Box className={classes.leftRightMainScreen}>
                <DrawerHeader />
                <Grid container spacing={2} columns={16} className={classes.grid}>
                    <RContainerManagement
                        onClick={handleSelectCard} objectType={selectedMenuItemIndex}></RContainerManagement>
                    <Divider orientation="vertical" flexItem></Divider>
                    {leftScreen}
                </Grid>
            </Box>
        </Box >
    );
}

export default AppPage;