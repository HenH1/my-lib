import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import { User } from '../models/User';
import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles({
    hover: {
        '&:hover': {
            backgroundColor: "rgb(211 211 211 / 25%)",
            cursor: "pointer",
        }
    },
    card: {
        margin: "16px",
        minWidth: 275
    }
});

const DetailsCard = (props: DetailsCardProps) => {
    const classes = useStyles()
    return (
        <Card
            className={classNames(props.className, classes.card, props.onClick ? classes.hover : "")}
            onClick={props.onClick}
        >
            <CardHeader
                action={props.actions}
                title={(props.object as User).userName ||
                    (props.object as Book).bookName ||
                    (props.object as Author).authorName} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`מזהה: ${props.object.id}`}<br />
                    {((props.object as Book).bookName) ?
                        `סופר: ${(props.object as Book).author?.authorName || "לא קיים"}`
                        : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}

interface DetailsCardProps {
    object: User | Book | Author;
    actions?: JSX.Element & React.ReactNode;
    onClick?: any;
    className?: string | undefined;
}

export default DetailsCard;