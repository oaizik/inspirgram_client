import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LoginDialog from './LoginView/LogInDialog';
import SignedupDialog from './LoginView/SignupDialog';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'linear-gradient(to bottom right, pink , white , pink)',
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
        marginLeft: '12vh',
    },
    //  problem: when switching pages the toolbarSeacondary text changes
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
    },
    registerButton: {
        width: '16vh',
    },
}));


export default function Header(props) {
    const classes = useStyles()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(true);
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
            register
        </Button>
    );
    const loggedIn = (
        <div>
            <IconButton className={classes.icons}>
                <AccountCircleOutlinedIcon />
            </IconButton>
            <IconButton className={classes.icons}>
                <LocalMallOutlinedIcon />
            </IconButton>
            <IconButton className={classes.icons}>
                <MenuRoundedIcon />
            </IconButton>
        </div>
    );

    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography>Logo</Typography>
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
                <NavLink to="/page" color="inherit" variant="body2" className={classes.toolbarLink}>
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

