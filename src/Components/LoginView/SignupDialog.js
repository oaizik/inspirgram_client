import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Link, Checkbox, FormControlLabel, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }  from '@material-ui/core';

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

export default function LoginDialog(props) {
    const classes = useStyles();
    const [name, setName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [writer, setWriter] = useState(false);

    const {open, handleClose, authUser, changeDialog } = props;
    

    const handleSignup = async() => {
        console.log(`name: ${name}, email: ${email}, password: ${password}, writer: ${writer}`);
        //  await setIsLoading(true);
        //  api call to create user using name & email & password $ writer
        //  put an access token in local storege
        authUser();
    };
    const handleWriter = () => {
        setWriter(!writer);
    };
    const backToLogin = () => {
        changeDialog();
    };

    return <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Inspirgram Log-in</DialogTitle>
        <DialogTitle id="form-dialog-title" className={classes.title}>Logo</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please Fill in details for Sign-up
            </DialogContentText>
            <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                label="Name"
                name="name"
                autoFocus
                onChange={e=> setName(e.target.value)}
            />
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
            <FormControlLabel
            control={<Checkbox checked={writer} onChange={handleWriter} value="writer" />}
            label="sign up as a writer"
          />
        </DialogContent>
        <DialogActions style={{marginTop: '2vh'}}>
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSignup}>
                Sign up
            </Button>
        </DialogActions>
        <DialogActions style={{marginTop: '1vh', marginBottom: '2vh'}}>
            <Grid item xs>
                <Link component="button" variant="body2" onClick={backToLogin}>
                    Back to log-in
                </Link>
            </Grid>
        </DialogActions>
    </Dialog>
};


