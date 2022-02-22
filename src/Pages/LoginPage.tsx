import { Container } from '@mui/material';
import React from 'react';
import { createUseStyles } from 'react-jss';
import Particles from 'react-particles-js';
import { baseURL } from '../Consts';
import { User } from '../models/User';
import { theme } from '../theme';
import axios from "axios";
import LoginContainer from '../components/LoginContainer';

const useStyles = createUseStyles({
    particles: {
        textAlign: 'center',
        height: '100vh'
    },
    root: {
        maxWidth: '100% !important',
        padding: '0 !important',
        background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    },
    // stavDiv: {
    //     height: '100%',
    //     display: 'flex !important',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     position: 'fixed',
    //     top: 0,
    //     maxWidth: '100% !important'
    // }
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
            {/* <Container className={classes.stavDiv}> */}
            <LoginContainer users={users}></LoginContainer>
            {/* </Container> */}
        </Container>
    );

}

export default Login;
