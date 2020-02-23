import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0px auto',
        height: '100%',
        width: '97%',
    },
    image: {
        backgroundImage: 'linear-gradient(45deg, #dcdcdc 30%, #696969 90%)',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    sentence: {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '60px',
        textAlign: 'center',
        margin: '10px',
    },
    textGrid: {
        backgroundImage: 'linear-gradient(45deg, #f8f8ff 30%, #dcdcdc 90%)',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'left',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    text: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    seperator: {
        margin: '10vh',
    },
    button: {
        backgroundImage: 'linear-gradient(45deg, #dcdcdc 30%, #696969 90%)',
        textTransform: 'initial',
        width: '20vh',
        fontWeight: 700,
    },
}));

export default function SignInSide() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={7} md={7} className={classes.image}>
                <Typography className={classes.sentence}>
                    "Dont let yesterday take up too much of today"
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={5} component={Paper} elevation={6} square className={classes.textGrid}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        inspirgem Editor
                    </Typography>
                    <p><b>
                        here we tell about our editor...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.
                    </b></p>
                    <div className={classes.seperator}></div>
                    <Grid item xs={3}>
                    <NavLink to = {{
                        pathname:'/Editor',
                        params: -1}}
                        style={{ textDecoration: 'none '}}
                    >
                        <Button className={classes.button} variant="outlined">Goto Edit</Button>
                    </NavLink>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}