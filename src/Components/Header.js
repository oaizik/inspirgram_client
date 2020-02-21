import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, Toolbar, Button, Typography, Tooltip } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LoginDialog from './LoginView/LogInDialog';
import SignedupDialog from './LoginView/SignupDialog';
import UpdateProfileDialog from './LoginView/UpdateProfileDialog';
import MuiAlert from '@material-ui/lab/Alert';

import store from '../redux/store';;



const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'linear-gradient(45deg, #dcdcdc 30%, #696969 90%)',
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
    logoDiv: { 
        width: '10vh',
        height: '10vh',
        border: '1px solid',
        zIndex: 2,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Header(props) {
    const classes = useStyles()
    const [isWriter, setWriter] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dialog, setDialog] = useState(true);

    useEffect(() => { 
        const state = store.getState();
        if(state.user.user.userType === 'writer') {
            setWriter(true);
        }
    }, [isLoggedIn]); 
    
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
    const notExist = () => {
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const setLogOut = () => {
        setIsLoggedIn(false);
        //  delete user info that we saved
    };
    const handleUpdate = () => {
        setOpenUpdate(true);
    };
    const handleUpdateClose = () => {
        setOpenUpdate(false);
    };
    const register = (
        <Button className={classes.registerButton} variant="outlined" size="small" onClick={registerClicked}>
            Log-in
        </Button>
    );
    const loggedIn = (
        <div className={classes.iconsContainer}>
            {isWriter &&
            <Tooltip title="my sentences" aria-label="my sentences" >
                <NavLink exact to="/MySentences">
                    <AssignmentIcon style={{color: 'black'}}/>
                </NavLink>
            </Tooltip>}
            <Tooltip title="my orders" aria-label="my orders" >
                <NavLink exact to="/MyOrders">
                    <LocalMallOutlinedIcon style={{color: 'black'}}/>
                </NavLink>
            </Tooltip>
            <Tooltip title="update profile" aria-label="update profile" onClick={handleUpdate}>
                    <AccountCircleOutlinedIcon style={{color: 'black', marginBottom: '5px'}}/>
            </Tooltip>
            <Tooltip title="log-out" aria-label="log-out" >
                <NavLink exact to="/" onClick={setLogOut}>
                    <HighlightOffIcon style={{color: 'black'}}/>
                </NavLink>
            </Tooltip>
        </div>
    );

    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <NavLink exact to="/" className={classes.toolbarLogo}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="34.000000pt" height="36.000000pt" viewBox="0 0 34.000000 36.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M20 340 c-18 -18 -20 -33 -20 -160 0 -186 -5 -180 170 -180 175 0 170 -6 170 180 0 186 5 180 -170 180 -117 0 -132 -2 -150 -20z m288 -12 c17 -17 17 -279 0 -296 -17 -17 -259 -17 -276 0 -17 17 -17 279 0 296 17 17 259 17 276 0z"/>
                        <path d="M262 308 c-16 -16 -15 -33 4 -48 22 -19 54 12 38 37 -14 22 -27 26 -42 11z m35 -14 c8 -21 -13 -42 -28 -27 -13 13 -5 43 11 43 6 0 13 -7 17 -16z"/>
                        <path d="M128 246 c-21 -6 -45 -21 -53 -32 -18 -26 -12 -84 10 -96 8 -5 15 -18 15 -28 0 -11 4 -20 10 -20 18 0 85 41 108 66 22 25 30 64 12 64 -5 0 -7 -7 -4 -15 8 -21 -6 -41 -17 -24 -6 10 -8 6 -7 -11 2 -17 -2 -25 -12 -25 -8 0 -20 -7 -26 -15 -9 -11 -15 -12 -26 -2 -8 6 -18 9 -21 6 -3 -4 -14 1 -23 10 -9 9 -14 20 -10 23 3 3 0 13 -7 21 -9 12 -9 16 1 19 6 3 12 13 12 24 0 18 15 23 58 22 6 -1 12 2 12 6 0 15 43 4 56 -14 16 -22 19 -12 4 14 -11 21 -39 23 -92 7z"/>
                        </g>
                    </svg>
                </NavLink>
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
            </Toolbar>
            {dialog ? (
            <LoginDialog
                open={open} 
                handleClose={handleClose} 
                authUser={authUser}
                notExist={notExist}
                changeDialog={changeDialog}
            /> ) : (
            <SignedupDialog
                open={open} 
                handleClose={handleClose} 
                authUser={authUser}
                changeDialog={changeDialog}
            />
            )}
            <UpdateProfileDialog
                open={openUpdate}
                handleUpdateClose={handleUpdateClose} 
            />
        </div>
    );
}

