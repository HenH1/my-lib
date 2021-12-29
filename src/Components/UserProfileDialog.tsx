import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { User } from "../models/User";
import { DialogContent, DialogContentText } from '@mui/material';
import { Book } from '../models/Book';
import { useAppSelector } from '../store/hooks';
import { selectLoggedUser } from '../store/features/loggedUserSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../Consts';

const UserProfileDialog = (props: UserProfileDialogProps) => {
    const { onClose, open } = props;
    const loggedUser = useAppSelector(selectLoggedUser) as User;
    const [userName, setUserName] = useState("");
    const [favoriteTitle, setFavoriteTitle] = useState("");

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (props.open) {
            axios.get(baseURL + "/user/" + loggedUser?.id).then((response) => {
                const user: User = response.data;
                setUserName(user.userName);
                const book: Array<Book> = user?.books?.filter(book => book.id === user.favoriteBookId);
                if (book?.length === 0) {
                    setFavoriteTitle("אין לך ספר מועדף :(")
                }
                else if (book) {
                    setFavoriteTitle(`הספר המועדף עליך הוא: ${book[0].bookName}.`)
                }
            });
        }
    }, [props.open, loggedUser?.id]);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>ברוך הבא {userName}!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {favoriteTitle}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

interface UserProfileDialogProps {
    open: boolean;
    onClose: () => void;
}

export default UserProfileDialog;