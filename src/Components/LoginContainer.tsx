import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../models/User';
import { createUseStyles } from 'react-jss';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
import { useAppDispatch } from '../store/hooks'
import { setLoggedUser } from '../store/features/loggedUserSlice';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
        "& .MuiFormLabel-root": {
            left: 'auto',
            transformOrigin: "top right",

        },
        minWidth: 50
    },
    form: {
        marginTop: "16px",
        '& label': {
            padding: "0 34px 0 0",
        }
    },
    select: {
        '& svg': {
            right: "auto",
            left: '7px'
        },
        "& .MuiOutlinedInput-notchedOutline": {
            textAlign: "right",
        }
    },
    button: {
        marginTop: "16px",
    },
    typo: {
        marginTop: "16px",
        textAlign: "center"
    },
    connectContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35vw !important',
        height: '40vh',
        background: 'white',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    }

});

const UsersSelect = (props: LoginContainerProps) => {
    const classes = useStyles()
    const [username, setUsername] = React.useState("");
    const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);
    const dispatch = useAppDispatch()
    const history = useHistory();

    const handleChange = (event: SelectChangeEvent) => {
        setUsername(event.target.value as string);
        setSelectedUser(props.users.find(obj => obj.id === Number(event.target.value))
        )
    };

    const handleLogin = () => {
        if (selectedUser) {
            dispatch(setLoggedUser(selectedUser))
            localStorage.setItem('loggedUser', JSON.stringify(selectedUser));
            history.push("/");
        }
    };


    return (
        <Container fixed className={classes.connectContainer}>
            <Box className={classes.root}>
                <Typography className={classes.typo} variant="h5" noWrap component="div">
                    ברוכים הבאים לספריה שלי
                </Typography>
                <FormControl fullWidth className={classes.form} >
                    <InputLabel id="user-select-label">בחר משתמש</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={username}
                        label="שם משתמש"
                        onChange={handleChange}
                        className={classes.select}>
                        {props.users?.map((user) =>
                            <MenuItem value={user.id} key={user.id}>{user.userName}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button fullWidth variant="outlined" className={classes.button} onClick={handleLogin}>התחבר</Button>
            </Box>
        </Container>

    );
}

interface LoginContainerProps {
    users: Array<User>;
}

export default UsersSelect;