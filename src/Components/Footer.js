import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';


function Copyright() {
    return (
        <Typography variant="body2" style={{color: 'white', marginTop: '5vh', textAlign: 'left', fontSize: '10px'}} align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Inspirgram
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundImage: 'linear-gradient(to bottom right, black 20%, #00002F, dimgray)',
        marginTop: theme.spacing(5),
        padding: theme.spacing(6, 0),
        height: '100%',
        [theme.breakpoints.down(800)]: {
            marginTop: theme.spacing(8),
        },
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down(800)]: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
    },
    logo: {
        width: '15%',
        [theme.breakpoints.down(800)]: {
            width: '80%',
            margin: '0px auto',
        },
    },
    svg: {
        backgroundColor: 'white',
    },
    contact: {
        width: '35%',
        borderLeft: '2px solid white',
        [theme.breakpoints.down(800)]: {
            width: '80%',
            margin: '15px auto',
            borderLeft: 'none',
            borderTop: '2px solid white',
        },
    },
    socials: {
        width: '40%',
        borderLeft: '2px solid white',
        [theme.breakpoints.down(800)]: {
            width: '80%',
            margin: '15px auto',
            borderLeft: 'none',
            borderTop: '2px solid white',
        },
    },
    font: {
        fontFamily: '"Courier New", Courier, monospace',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    leftfont: {
        fontFamily: '"Courier New", Courier, monospace',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: '3vh',
    },
    socialssDiv: {
        margin: '0px auto',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    copyrite: {
        marginTop: '2vh',
        [theme.breakpoints.down(800)]: {
            display: 'none',
        },
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container className={classes.container} maxWidth="lg">
                <div className={classes.logo}>              
                    <svg className={classes.svg} version="1.0" xmlns="http://www.w3.org/2000/svg" width="87.000000pt" height="84.000000pt" viewBox="0 0 87.000000 84.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,84.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M105 801 c-11 -5 -31 -21 -45 -36 l-25 -27 0 -319 0 -319 33 -32 32 -33 335 0 335 0 32 33 33 32 0 320 0 320 -33 32 -32 33 -323 2 c-177 1 -331 -2 -342 -6z m628 -42 c25 -11 47 -47 47 -74 0 -55 -59 -96 -109 -76 -44 19 -61 67 -40 115 18 40 60 54 102 35z m-212 -138 c4 0 22 -21 41 -46 28 -35 37 -58 42 -105 8 -65 0 -86 -43 -132 -14 -15 -34 -36 -43 -47 -10 -12 -30 -21 -44 -21 -14 0 -40 -12 -57 -26 -19 -16 -40 -24 -57 -22 -19 2 -34 -7 -58 -32 -26 -29 -34 -33 -49 -24 -10 6 -19 22 -20 35 0 13 -1 29 -2 36 -1 6 -24 26 -51 44 -48 31 -60 50 -60 94 0 11 -2 34 -6 52 -4 23 -1 36 14 51 11 11 23 31 7 106 10 137 3z"/>
                            <path d="M667 722 c-22 -24 -21 -55 1 -75 24 -22 45 -21 65 1 22 24 21 55 -1 75 -24 22 -45 21 -65 -1z"/>
                            <path d="M388 581 c-11 -19 -13 -19 -41 -3 -28 16 -30 16 -44 -4 -11 -18 -21 -21 -52 -17 -32 4 -41 1 -55 -18 -9 -13 -16 -32 -16 -42 0 -10 -10 -27 -21 -36 -24 -19 -19 -61 7 -61 8 0 14 -7 14 -15 0 -8 -7 -15 -15 -15 -8 0 -15 -4 -15 -9 0 -23 14 -41 31 -41 11 0 22 -7 26 -16 9 -23 44 -33 76 -21 24 8 31 6 43 -12 27 -38 78 -21 98 33 5 15 9 17 18 8 44 -44 95 34 56 85 -5 7 -7 17 -3 23 9 15 45 -17 45 -39 1 -12 5 -10 20 8 22 25 26 56 9 66 -6 4 -7 19 -4 36 5 23 1 33 -19 52 -14 14 -26 29 -26 35 0 5 -7 13 -16 16 -21 8 -20 8 -39 -10 -15 -15 -17 -15 -34 0 -23 21 -28 20 -43 -3z"/>
                            <path d="M278 233 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
                        </g>
                    </svg>
                    <div className={classes.copyrite}>
                        <Copyright />
                    </div>
                </div>
                <div className={classes.contact}>
                    <Typography className={classes.font} variant="h6" align="center" gutterBottom>
                        Contact Us At
                    </Typography>
                    <Typography className={classes.leftfont} variant="h6" align="center" gutterBottom>
                        support@inspirgram.com
                    </Typography>
                    <NavLink exact to="/" color="inherit">
                        <Typography className={classes.leftfont} variant="h6" align="center" gutterBottom>
                            About inspirgram
                        </Typography>
                    </NavLink>
                    <NavLink exact to="/" color="inherit">
                        <Typography className={classes.leftfont} variant="h6" align="center" gutterBottom>
                            Terms Of Service
                        </Typography>
                    </NavLink>
                    <NavLink exact to="/" color="inherit">
                        <Typography className={classes.leftfont} variant="h6" align="center" gutterBottom>
                            Careers at inspirgram
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.socials}>
                    <Typography className={classes.font} variant="h6" align="center" gutterBottom>
                        look for us in the socials world
                    </Typography>
                    <div className={classes.socialssDiv}>
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <FacebookIcon style={{color: 'white'}}/>
                        </NavLink>}
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <InstagramIcon style={{color: 'white'}}/>
                        </NavLink>
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <LinkedInIcon style={{color: 'white'}}/>
                        </NavLink>
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <PinterestIcon style={{color: 'white'}}/>
                        </NavLink>
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <TwitterIcon style={{color: 'white'}}/>
                        </NavLink>
                        <NavLink exact to="/" style={{margin: '2vh'}}>
                            <YouTubeIcon style={{color: 'white'}}/>
                        </NavLink>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

