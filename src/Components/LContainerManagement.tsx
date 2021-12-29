import { Fab, Grid, Typography, IconButton } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { User } from '../models/User';
import DetailsCard from './DetailsCard';
import AddIcon from '@mui/icons-material/Add';
import AddBookDialog from './AddBookDialog';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { baseURL, MenuItemsIndices } from '../Consts';
import { selectLoggedUser } from '../store/features/loggedUserSlice';
import { useAppSelector } from '../store/hooks';
import { createUseStyles } from 'react-jss';
import useType from '../hooks/useType';

const useStyles = createUseStyles({
    grid: {
        minWidth: 500
    },
    addBtn: {
        position: "fixed !important",
        bottom: "46px",
        left: "46px"
    },
    favBook: {
        color: "red"
    }
});

const LContainerManagement = (props: LContainerManagementProps) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    // handle left side data. Could be array of books or users
    const [leftScreenArray, setLeftScreenArray] = React.useState<Array<User> | Array<Book>>([]);
    const loggedUser = useAppSelector(selectLoggedUser) as User;
    // getting books from server 
    const [books, setBooks] = React.useState<Array<Book>>([]);
    const selectedCardType: string = useType(props.rightCardObj);

    const handleClickOpen = () => {
        getBooksToAdd();
        setOpen(true);
    };

    const handleClose = (user?: User) => {
        if (user) {
            setLeftScreenArray(user.books);
        }
        setOpen(false);
    };

    const generateTitle = () => {
        const dict: { [type: string]: string } = {
            'user': `רשימת הספרים שקרא`,
            'book': `רשימת הקוראים של`,
            'author': `רשימת הספרים של`
        };

        if (props.rightCardObj) {
            const name: string = (props.rightCardObj as User).userName ||
                (props.rightCardObj as Book).bookName ||
                (props.rightCardObj as Author).authorName

            return `${dict[selectedCardType]} ${name}:`;
        }
    }

    const addBtn = () => {
        return (
            <Fab size="small" color="secondary" aria-label="add" onClick={handleClickOpen}
                className={classes.addBtn}>
                <AddIcon />
            </Fab>);
    }

    const getBooksToAdd = () => {
        axios.get(baseURL + "/books").then((response) => {

            const allBooks = response.data as Array<Book>;
            const userBooks: Array<Book> = leftScreenArray as Array<Book>;

            setBooks(allBooks.filter(b => !userBooks.some(book => book.id === b.id)));
        });
    };

    const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const handleFavorite = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, bookId: number) => {
        event.stopPropagation();
        const selectedUser: User = props.rightCardObj as User;

        selectedUser.favoriteBookId =
            selectedUser.favoriteBookId === bookId ? -1 : bookId

        axios.post(baseURL + `/users/${selectedUser.id}/editFavorite/${bookId}`)
            .then((response) => {
                console.log(response.data)
            });

        forceUpdate()
        console.log(bookId);
    }

    // Deleting book from user reading list
    const handleDeleteBookFromReader = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, bookId: number) => {
        event.stopPropagation();
        let selectedUser: User = props.rightCardObj as User;

        // if the book we want to delete is favorite book then remove it
        if ((selectedUser).favoriteBookId === bookId) {
            (selectedUser).favoriteBookId = -1;
        }

        axios.post(baseURL + `/users/${selectedUser.id}/deleteBook/${bookId}`)
            .then((response) => {
                console.log(response.data)
                setLeftScreenArray((response.data as User).books);
            });
    }

    // Deleting reader from book readers list
    const handleDeleteReaderFromBook = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: number) => {
        event.stopPropagation();
        let selectedBook: Book = props.rightCardObj as Book;
        let users: Array<User> = leftScreenArray as Array<User>;
        let selectedUser: User = users.filter(u => u.id === userId)[0];

        // if the book we want to delete is favorite book then remove it
        if ((selectedUser).favoriteBookId === selectedBook.id) {
            (selectedUser).favoriteBookId = -1;
        }

        axios.post(baseURL + `/users/${userId}/deleteBook/${selectedBook.id}`)
            .then((response) => {
                console.log(response.data)
                setLeftScreenArray(users.filter(u => u.id !== userId));
            });
    }

    const getUsersByBooks = (bookId: number) => {
        axios.get(baseURL + "/users/books/" + bookId).then((response) => {
            setLeftScreenArray(response.data);
        });
    };

    const getBooksByAuthors = (authorId: number) => {
        axios.get(baseURL + "/books").then((response) => {
            const booksByAuthor = (response.data as Array<Book>)?.filter(book => book.author?.id === authorId);
            setLeftScreenArray(booksByAuthor);
        });
    }

    const getUser = (userId: number) => {
        axios.get(baseURL + "/user/" + userId).then((response) => {
            const user: User = response.data;
            setLeftScreenArray(user.books);
        });
    }

    const actions = (id: number): JSX.Element & React.ReactNode => {
        if (props.rightCardObj && selectedCardType === 'user' && loggedUser?.id === (props.rightCardObj as User).id) {
            return <div>
                <IconButton aria-label="favorite"
                    onClick={(event) => handleFavorite(event, id)}>
                    <FavoriteIcon className={((props.rightCardObj as User).favoriteBookId === id) ? classes.favBook : ""} />
                </IconButton>
                <IconButton aria-label="delete"
                    onClick={(event) => handleDeleteBookFromReader(event, id)}>
                    <DeleteIcon />
                </IconButton>
            </div>;
        } else if (props.rightCardObj && selectedCardType === 'book' && loggedUser?.id === id) {
            return <IconButton aria-label="delete"
                onClick={(event) => handleDeleteReaderFromBook(event, id)}>
                <DeleteIcon />
            </IconButton>;
        }
        return <div />;
    }

    // to prevent un necessary re button render (only happens after calculation)
    const memoBtn = useMemo(() =>
        props.objectType === MenuItemsIndices.Users
            && props.rightCardObj?.id === loggedUser?.id
            && books.length > 0 ? addBtn() : undefined
        , [books, props.objectType]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.rightCardObj) {
            switch (selectedCardType) {
                case 'user':
                    getUser(props.rightCardObj.id);
                    break;
                case 'book':
                    getUsersByBooks(props.rightCardObj.id);
                    break;
                case 'author':
                    getBooksByAuthors(props.rightCardObj.id);
                    break;
            }
        }
        else {
            setLeftScreenArray([]);
        }
    }, [props]) // eslint-disable-line react-hooks/exhaustive-deps

    //only happens after left data has changed
    useEffect(() => {
        //calc 
        if (props.rightCardObj && selectedCardType === 'user') {
            getBooksToAdd();
        }
    }, [leftScreenArray]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid item xs={7} className={classes.grid}>
            <AddBookDialog books={books} open={open} onClose={handleClose} userId={loggedUser?.id} />
            <Typography>{generateTitle()}</Typography>
            {memoBtn}
            {leftScreenArray?.map((obj) =>
                <DetailsCard
                    key={obj["id"]}
                    object={obj}
                    actions={actions(obj["id"])}
                ></DetailsCard>)
            }
        </Grid >
    );

}
interface LContainerManagementProps {
    rightCardObj: any; // selected right card (could be user,book or author)
    objectType: MenuItemsIndices;
}
export default LContainerManagement;
