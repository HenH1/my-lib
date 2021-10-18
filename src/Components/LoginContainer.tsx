import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../Models/User';
import { createUseStyles } from 'react-jss';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

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
    },
    form: {
        marginTop: "16px",
        '& label': {
            padding: "0 34px 0 0",
        }
    },
    // label: {
    //     "&.Mui-focused": {
    //         //transformOrigin: "top right",
    //         //padding: "0 34px 0 0",
    //     },
    // },
    select: {
        // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        //     textAlign: "right",
        // },
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
    }
});

export default function UsersSelect(props: LoginContainerProps) {
    // const [user, setUser] = React.useState<User>();
    const classes = useStyles()
    const [username, setUsername] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setUsername(event.target.value as string);
    };

    React.useLayoutEffect(() => {
        document.body.setAttribute("dir", "rtl");
    });


    return (
        <Box sx={{ minWidth: 50 }} className={classes.root}>
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
                    className={classes.select}
                >
                    {props.users?.map((user) =>
                        <MenuItem value={user.id}>{user.userName}</MenuItem>)}
                </Select>
            </FormControl>
            <Button fullWidth variant="outlined" className={classes.button}>התחבר</Button>
        </Box>
    );
}
interface LoginContainerProps {
    users: Array<User>;
}
