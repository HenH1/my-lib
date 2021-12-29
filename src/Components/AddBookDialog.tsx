import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Book } from '../models/Book';
import { createUseStyles } from 'react-jss';
import { baseURL } from '../Consts';
import axios from 'axios';
import { User } from '../models/User';

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
        "& .MuiDialogContent-root": {
            overflowY: "visible"
        }
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
    dialogContent: {
        width: "400px",

    },
    addBtn: {
        margin: "16px !important"
    }
});

const AddBookDialog = (props: addBookDialogProps) => {
    const [bookName, setBookname] = React.useState("");
    const classes = useStyles()

    const handleClose = (user?: User) => {
        props.onClose(user);
        setBookname("");
    };

    const handleChange = (event: SelectChangeEvent) => {
        setBookname(event.target.value as string);
    };

    const habdleAddBook = () => {
        let user: User;
        if (bookName !== "") {
            axios.post(baseURL + "/users/" + props.userId + "/addBook/" + bookName).then((response) => {
                user = response.data;
                handleClose(user);
            });
        }
    }
    return (
        <Dialog open={props.open} onClose={e => handleClose(undefined)} className={classes.root}>
            <DialogTitle>הוסף ספר</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <FormControl fullWidth className={classes.form}>
                    <div />
                    <InputLabel id="user-select-label">בחר ספר</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={bookName}
                        label="שם ספר"
                        onChange={handleChange}
                        fullWidth
                        className={classes.select}
                    >
                        {props.books?.map((book) =>
                            <MenuItem key={book.id} value={book.id}>{book.bookName}</MenuItem>)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button fullWidth className={classes.addBtn} variant="outlined" onClick={habdleAddBook}>הוסף ספר</Button>
            </DialogActions>
        </Dialog>
    );
}

interface addBookDialogProps {
    books: Array<Book>;
    open: boolean;
    onClose: (user?: User) => void;
    userId: number;
}

export default AddBookDialog;