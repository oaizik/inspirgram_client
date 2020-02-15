import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { makeStyles, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LoginDialog from './LoginView/LogInDialog';
import SignedupDialog from './LoginView/SignupDialog';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'linear-gradient(to bottom right, pink , white , pink)',
        marginBottom: '1vh',
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
        marginLeft: '12vh',
        [theme.breakpoints.down(700)]: {
            display: 'none',
        },
    },
    toolbarLogo: {
        [theme.breakpoints.down(700)]: {
            flex: 1,
        },
    },
    toolbarSecondary: {
        justifyContent: 'center',
        overflowX: 'auto',
        minHeight: '10vh',
    },
    toolbarLink : {
        padding: theme.spacing(2),
        flexShrink: 0,
        textDecoration: 'none',
        color: 'black',
        fontSize: '20px',
        '&:hover': { 
            flexShrink: 0,
            textDecoration: 'none',
            color: 'tomato',
        },
        '&:focus': {
            flexShrink: 0,
            textDecoration: 'none',
            color: 'purple',
        },
        [theme.breakpoints.down(700)]: {
            padding: '5px',
        },
    },
    registerButton: {
        textTransform: 'initial',
        width: '16vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '10%',
        paddingTop: '4px',
        [theme.breakpoints.down(1200)]: {
            width: '15%',
        },
        [theme.breakpoints.down(800)]: {
            width: '20%',
        },
        [theme.breakpoints.down(600)]: {
            width: '30%',
        },
        [theme.breakpoints.down(400)]: {
            width: '40%',
        },
    },
}));


export default function Header(props) {
    const classes = useStyles()
    const writer = true;
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const changeDialog = () => {
        setDialog(!dialog);
    };
    const registerClicked = () => {
        setOpen(true);
    };
    const authUser = () => {
        setOpen(false);
        setIsLoggedIn(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const register = (
        <Button className={classes.registerButton} variant="outlined" size="small" onClick={registerClicked}>
            Log-in
        </Button>
    );
    const loggedIn = (
        <div className={classes.iconsContainer}>
            {writer &&
            <NavLink exact to="/MySentences">
                <AssignmentIcon style={{color: 'dimgray'}}/>
            </NavLink>}
            <NavLink exact to="/MyOrders">
                <LocalMallOutlinedIcon style={{color: 'dimgray'}}/>
            </NavLink>
            <NavLink exact to="/ProfilePage">
                <AccountCircleOutlinedIcon style={{color: 'dimgray'}}/>
            </NavLink>
        </div>
    );

    return redirect ? <Redirect to={redirect} /> :(
        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.toolbarLogo}>Logo</Typography>
                <Typography component="h2" variant="h5" color="inherit" align="center" className={classes.toolbarTitle}>
                    Inspirgram
                </Typography>
                {isLoggedIn ? loggedIn : register}
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                <NavLink  id="navinavi" exact to="/" color="inherit" variant="body2" className={classes.toolbarLink}>
                    Home
                </NavLink>
                <NavLink exact to="Catalog" color="inherit" variant="body2" className={classes.toolbarLink}>
                    Catalog
                </NavLink>
                <NavLink to="/" color="inherit" variant="body2" className={classes.toolbarLink}>
                    Contact Us
                </NavLink>
                <NavLink to="/Editor" color="inherit" variant="body2" className={classes.toolbarLink}>
                    Editor
                </NavLink>
            </Toolbar>
            {dialog ? (
            <LoginDialog
                open={open} 
                handleClose={handleClose} 
                authUser={authUser}
                changeDialog={changeDialog}
            /> ) : (
            <SignedupDialog
                open={open} 
                handleClose={handleClose} 
                authUser={authUser}
                changeDialog={changeDialog}
            />
            )}
        </div>
    );
}

