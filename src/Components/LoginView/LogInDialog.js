import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }  from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { createUser } from '../../redux/actions/userActions';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    dialog: {
        maxWidth: '450px',
        margin: '0px auto',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    helpGrid: {
        displey: 'flex',
        justifyContent: 'center',
    },
    signup: {
        backgroungColor: 'white',
        color: 'primary',
    },
}));

const bStyle = {
    display: 'block',
    margin: '15px auto',
    height: '37px',
    width: '370px',
    borderRadius: '5px',
    padding: '10px 12px',
    lettSpacing: '1px',
    fontWeight: '200',
    backgroundColor: '#3b5998',
    opacity: '0.7',  
    '&:hover': {
        opacity: '1',
    },
    incorect: {
        color: 'red',
        margin: '0px auto',
    },
};

const LoginDialog = props => {
    const classes = useStyles()
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [credentials, setCredentials] = useState(undefined);

    const {open, handleClose, authUser, changeDialog } = props;
    
    const incorectCredentials = (
        <div style={{color: 'red', margin: '0px auto',}}>
            Incorrect Credentials!
        </div>
    );
    const existCredentials = (
        <div style={{color: 'red', margin: '0px auto',}}>
            Your email is already exist in our system, please log in with youe inspirgram credentials!
        </div>
    );
    
    const handleLogIn = async() => {
        let parsed;
        const res = await fetch('http://localhost:5000/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        })
        parsed = await res.json();
        
        if(parsed.status === 1) { 
            const user = {
                id: parsed.userParams.id,
                userType: parsed.userParams.userType
            };
            props.createUser(user);
            localStorage.setItem('inspirgram_auth_token', parsed.userParams.token);
            localStorage.setItem('userId', parsed.userParams.id);
            localStorage.setItem('userType', parsed.userParams.userType);
            authUser();
        } else { //  if user dosent exist
            setCredentials(existCredentials);
        }
    };

    const responseFacebook = facebookResponse => {
        if(facebookResponse.picture === undefined) {
            // Do nothing, the user didnt send request
            console.log('the user is not authenticate');
        } else {
            facebookUser(facebookResponse);
        }
    };

    const facebookUser = async(facebookResponse) => {
        const parsedResponse = {
            email: facebookResponse.email,
            name: facebookResponse.name,
            facebook_id: facebookResponse.id,
        }
        console.log(`email: ${parsedResponse.email}`);
        console.log(`name: ${parsedResponse.name}`);
        console.log(`facebook_id: ${parsedResponse.id}`);
        let parsed;
        const res = await fetch('http://localhost:5000/users/facebookUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: parsedResponse.name, email: parsedResponse.email }),
        })
        parsed = await res.json();
        
        if(parsed.status === 1) { 
            const user = {
                id: parsed.userParams.id,
                userType: parsed.userParams.userType
            };
            props.createUser(user);
            localStorage.setItem('inspirgram_auth_token', parsed.userParams.token);
            localStorage.setItem('userId', parsed.userParams.id);
            localStorage.setItem('userType', parsed.userParams.userType);
            authUser();
        } else { //  if user dosent exist
            setCredentials(incorectCredentials);
        }
        // authUser();
    };
    const singupClicked = () => {
        changeDialog();
    };
    const forgotPasswordClicked = () => {

    };

    return <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Inspirgram Log-in</DialogTitle>
        <DialogTitle id="form-dialog-title" className={classes.title}>
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
        </DialogTitle>
        <DialogContent>
                {credentials}
            <DialogContentText>
                Please Fill in details for Log-in
            </DialogContentText>
            <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                label="Email"
                name="email"
                autoFocus
                onChange={e=> setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                name="password"
                autoFocus
                onChange={e=> setPassword(e.target.value)}
            />
        </DialogContent>
        <DialogActions style={{marginTop: '2vh'}}>
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleLogIn}>
                Log In
            </Button>
        </DialogActions>
        <DialogActions style={{marginTop: '1vh'}}>
        <FacebookLogin
            appId="521519021811129"
            autoLoad={true}
            fields="name, email, picture"
            callback={responseFacebook}
            icon={<FontAwesomeIcon 
                icon={faFacebook} 
                size="lg" 
                style={{float: 'left', paddingBottom: '2px'}} 
                />}
            buttonStyle = {bStyle}
            />
        </DialogActions>
        <DialogActions style={{marginTop: '1vh'}}>
            <Grid item xs>
                <Link component="button" variant="body2" onClick={forgotPasswordClicked}>
                    Forgot password?
                </Link>
            </Grid>
        </DialogActions>
        <DialogActions style={{marginTop: '1vh', marginBottom: '2vh'}}>
            <Grid item xs>
                <Link component="button" variant="body2" onClick={singupClicked}>
                    Don't have an account? Sign-Up
                </Link>
            </Grid>
        </DialogActions>
    </Dialog>
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { createUser }
)(LoginDialog);