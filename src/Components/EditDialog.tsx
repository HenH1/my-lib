import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, TextField } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useEffect } from 'react';

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
    textLabel: {
        "& .MuiOutlinedInput-notchedOutline": {
            textAlign: "right",
        }
    },
    dialogContent: {
        width: "400px",

    },
    saveBtn: {
        margin: "16px !important"
    }
});

const EditDialog = (props: editDialogProps) => {
    const [value, setValue] = React.useState("");
    const defaultValue = (props.obj?.userName || props.obj?.bookName || props.obj?.authorName);
    const classes = useStyles()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        props.onClose(value, value !== defaultValue);
        setValue(defaultValue);
    };

    const handleCloseWithoutSave = () => {
        props.onClose(value, false);
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [props.open, defaultValue]);

    return (
        <Dialog open={props.open} onClose={handleCloseWithoutSave} className={classes.root}>
            <DialogContent className={classes.dialogContent}>
                <FormControl fullWidth className={classes.form}>
                    <TextField id="outlined-basic"
                        label="ערוך שם"
                        variant="outlined"
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        className={classes.textLabel} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button fullWidth className={classes.saveBtn} variant="outlined" onClick={handleClose}>שמור</Button>
            </DialogActions>
        </Dialog>
    );
}

interface editDialogProps {
    obj: any;
    open: boolean;
    onClose: (name: String, isChanged: boolean) => void;
}

export default EditDialog;