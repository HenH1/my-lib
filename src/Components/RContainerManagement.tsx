import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import DetailsCard from './DetailsCard';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { baseURL, MenuItemsIndices } from '../Consts';
import EditDialog from './EditDialog';
import { Book } from '../models/Book';
import { Author } from '../models/Author';
import { User } from '../models/User';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLoggedUser, setLoggedUser } from '../store/features/loggedUserSlice';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
    grid: {
        minWidth: 500
    },
    selected: {
        backgroundColor: "rgba(0, 0, 0, 0.14) !important"
    },
});

const RContainerManagement = (props: RContainerManagementProps) => {
    const [selectedCardId, setSelectedCardId] = React.useState(0);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editObj, setEditObj] = React.useState<any>();
    const [rightScreenArray, setRightScreenArray] = React.useState<Array<User> | Array<Book> | Array<Author>>([]);
    const loggedUser = useAppSelector(selectLoggedUser) as User;
    const classes = useStyles()
    const history = useHistory();
    const dispatch = useAppDispatch();
    const urlPath = (index: number): String =>
        (index === MenuItemsIndices.Users) ? '/users'
            : (index === MenuItemsIndices.Books) ? '/books' :
                '/authors';

    const getData = (url: String, cardId: any) => {
        axios.get(baseURL + url).then((response) => {
            setRightScreenArray(response.data);
            // set first card
            handleSelectCard(response.data[cardId])
        });
    };
    const handleSelectCard = (card: any) => {
        // setting the selected card obj
        props.onClick(card);
        if (card) {
            setSelectedCardId(card.id);
        }
    }

    const handleClose = (name: String, isChanged: boolean) => {
        setOpenEdit(false);
        if (isChanged) {
            axios.post(baseURL + `/edit${getPath()}/${editObj?.id}/name/${name}`)
                .then((response) => {
                    setRightScreenArray(response.data);
                    handleSelectCard(response.data[selectedCardId] || response.data)
                });
        }
    };

    const getPath = (): String =>
        (props.objectType === MenuItemsIndices.Users) ? 'User'
            : (props.objectType === MenuItemsIndices.Books) ? 'Book' : 'Author';

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        event.stopPropagation();
        const editedObj = (rightScreenArray as Array<any>).find(obj => obj.id === index);
        setEditObj(editedObj);
        setOpenEdit(true);
        console.log(index)
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        event.stopPropagation();
        const deletedTypeName = getPath();

        axios.post(baseURL + `/delete${deletedTypeName}/` + id)
            .then((response) => {
                if (loggedUser.id === id && deletedTypeName === 'User') {
                    logout();
                }
                else {
                    console.log(response.data)
                    if (response.data[0] !== undefined) {
                        setSelectedCardId(0);
                        handleSelectCard(response.data[0]);
                        setRightScreenArray(response.data);
                    }
                    else {
                        setRightScreenArray([]);
                        handleSelectCard(undefined);
                    }
                }
            });

        console.log(id)
    }

    const logout = () => {
        dispatch(setLoggedUser(undefined))
        localStorage.removeItem("loggedUser");
        history.push("/Login");
    };

    const actions = (id: number): JSX.Element & React.ReactNode => {
        const deletedTypeName = getPath();
        const isDeleteDisabled = loggedUser.id === id && deletedTypeName === 'User';

        return <div>
            <IconButton aria-label="edit"
                onClick={(event) => handleEdit(event, id)}
            >
                <EditIcon />
            </IconButton>
            {isDeleteDisabled ? undefined :
                <IconButton aria-label="delete"
                    onClick={(event) => handleDelete(event, id)}
                >
                    <DeleteIcon />
                </IconButton>}
        </div>;
    }

    useEffect(() => {
        getData(urlPath(props.objectType), 0);

    }, [props.objectType]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid item xs={7} className={classes.grid}>
            <EditDialog open={openEdit} onClose={handleClose} obj={editObj} />
            {rightScreenArray?.map((obj, index) =>
                <DetailsCard
                    object={obj}
                    className={selectedCardId === obj?.id ? classes.selected : undefined}
                    actions={actions(obj?.id)}
                    key={obj?.id}
                    onClick={() => {
                        setSelectedCardId(obj?.id);
                        handleSelectCard(obj);
                    }}
                />
            )
            }
        </Grid >
    );

}

interface RContainerManagementProps {
    onClick: any;
    objectType: MenuItemsIndices;
}

export default RContainerManagement;

