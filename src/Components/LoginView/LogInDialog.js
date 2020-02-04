import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }  from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


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
};

export default function LoginDialog(props) {
    const classes = useStyles()
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const {open, handleClose, authUser, changeDialog } = props;
    

    const componentClicked = () => console.log("clicked");
    const handleLogIn = async() => {
        console.log(`email: ${email}, password: ${password}`);
        // await setIsLoading(true);
        //  api call to authenticate user using email & password
        // put an access token in local storege
        authUser();
    }
    const responseFacebook = facebookResponse => {
        if(facebookResponse.picture === undefined) {
            // Do nothing, the user didnt send request
            console.log('the user is not authenticate');
        } else {
            facebookUser(facebookResponse);
        }
    };
    const facebookUser = async(facebookResponse) => {
        try{
            // await setIsLoading(true);
            //  api call to authenticate user using facebook email 
            //  if email exist log in the user
            //  if user dosent exist create one using facebook.responce:
            // const parsedResponse = {
            //     email: facebookResponse.email,
            //     name: facebookResponse.name,
            //     facebook_id: facebookResponse.id,
            // }
            console.log('the user is authenticate by facebook');
            
            console.log(`facebook email: ${facebookResponse.email}`);
            // put an access token in local storege
            authUser();
        } catch(e) {
            console.error(e);
        } finally {
            // await setIsLoading(false);
        }
    };
    const singupClicked = () => {
        changeDialog();
    };
    const forgotPasswordClicked = () => {

    };

    return <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Inspirgram Log-in</DialogTitle>
        <DialogTitle id="form-dialog-title" className={classes.title}>Logo</DialogTitle>
        <DialogContent>
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
            onClick={componentClicked}
            // callback={responseFacebook}
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


