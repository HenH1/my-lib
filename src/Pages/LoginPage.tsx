import { Box, Container } from '@mui/material';
import { createUseStyles } from 'react-jss';
import Particles from 'react-particles-js';
import { theme } from '../theme';

const useStyles = createUseStyles({
    background: {
        textAlign: 'center',
        height: '100vh'
    },
    container: {
        maxWidth: '100% !important',
        padding: '0 !important',
    },
    connectContainer: {
        position: 'absolute',
        width: '60vh !important',
        height: '40vh',
        top: '50%',
        left: '50%',
        zIndex: '100',
        background: 'white',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    }
});

function Login() {
    const classes = useStyles()
    return (<Container className={classes.container}>
        <Particles className={classes.background} params={{
            particles: {
                number: {
                    value: 120
                },
                size: {
                    value: 3
                },
                color: {
                    value: theme.palette.primary.main
                },
                line_linked: {
                    color: theme.palette.secondary.main,
                    opacity: 1
                }

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
            <Box sx={{ bgcolor: 'black', height: '30vh', display: 'inline-block', position: 'absolute', overflow: 'auto' }} />
        </Container>
    </Container>
    );

}

export default Login;
