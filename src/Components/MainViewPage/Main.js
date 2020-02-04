import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0px auto',
        height: '100vh',
        width: '97%',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    textGrid: {
        backgroundColor: 'rgba(255, 99, 71, 0.5)',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
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
}));

export default function SignInSide() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.textGrid}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Image with text
                    </Typography>
                    <p><b>
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                        bla bla bla, our website is very very nice.
                        bla bla bla, our website is very very nice and good looking.
                    </b></p>
                    <div className={classes.seperator}></div>
                    <Grid item xs={3}>
                        <Button variant="outlined">button</Button>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}