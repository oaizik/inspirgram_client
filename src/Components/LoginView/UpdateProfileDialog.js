import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox, FormControlLabel, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }  from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    dialog: {
        maxWidth: '450px',
        margin: '0px auto',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
}));



export default function UpdateProfileDialog(props) {
    const classes = useStyles();
    const [name, setName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [writer, setWriter] = useState(false);
    const [credentials, setCredentials] = useState(undefined);
    
    const {open, handleUpdateClose } = props;
    
    const incorectCredentials = (
        <div style={{color: 'red', margin: '0px auto',}}>
            there is a problem with your credentials, Please try again
        </div>
    );
    
    const handleSubmit = async() => {
        let userType;
        if(writer) {
            userType = 'writer';
        } else {
            userType = 'client';
        }
        let parsed;
        try {
            const res = await fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'inspirgram_auth_token':  localStorage.getItem('inspirgram_auth_token')},
            body: JSON.stringify({ name: name, password: password, email: email, userType: userType}),
            })
            parsed = await res.json();
        } catch(e) {
            console.log(e);
            setCredentials(incorectCredentials);
        }
        if(parsed.status === 1) { 
            if(writer) {
                localStorage.setItem('userType', 'writer');
            } else {
                localStorage.setItem('userType', 'client');
            }
            handleUpdateClose();
        } else { // problem with response
            setCredentials(incorectCredentials);
        }
    };
    const handleWriter = () => {
        setWriter(!writer);
    };

    return <Dialog className={classes.dialog} open={open} onClose={handleUpdateClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Inspirgram Update details</DialogTitle>
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
                Please Fill your details
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
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </DialogActions>
    </Dialog>
};


