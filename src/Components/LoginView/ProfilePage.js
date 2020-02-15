import React from 'react';
import { makeStyles } from '@material-ui/core';


//  this page have user details,
//  it present the details
//  the user can edit details here
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50vh',
        fontFamily: '"Lato" sans-serif',
        fontSize: '60px',
        backgroundImage: 'linear-gradient(to bottom right, lemonchiffon , white , lemonchiffon)',
    },
}));
export default function ProfilePage() {
    const classes = useStyles();
    const userDetalis =  {
        userName: 'mitzi regev',
        userEmail: 'mitzi@gmail.com',
        userType: 'client',
    };

    return (
        <div className={classes.root}>
            this is the ProfilePage
        </div>
    )
};