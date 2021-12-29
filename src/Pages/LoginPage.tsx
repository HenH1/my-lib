import { Container } from '@mui/material';
import React from 'react';
import { createUseStyles } from 'react-jss';
import Particles from 'react-particles-js';
import { baseURL } from '../Consts';
import { User } from '../models/User';
import { theme } from '../theme';
import axios from "axios";
import UsersSelect from '../components/LoginContainer';

const useStyles = createUseStyles({
    particles: {
        textAlign: 'center',
        height: '100vh'
    },
    root: {
        maxWidth: '100% !important',
        padding: '0 !important',
        background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.primary.main})`

    },
    connectContainer: {
        position: 'absolute',
        width: '35vw !important',
        height: '40vh',
        top: '50%',
        left: '50%',
        zIndex: '100',
        background: 'white',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    }
});


const Login = () => {
    const classes = useStyles()
    const [users, setUsers] = React.useState<Array<User>>([]);

    React.useEffect(() => {
        axios.get(baseURL + "/users").then((response) => {
            setUsers(response.data);
        });
    }, []);

    return (
        <Container className={classes.root}>
            <Particles className={classes.particles} params={{
                particles: {
                    number: {
                        value: 120
                    },
                    size: {
                        value: 3
                    },

                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }} />
            <Container fixed className={classes.connectContainer}>
                <UsersSelect users={users}></UsersSelect>
            </Container>
        </Container>
    );

}

export default Login;
