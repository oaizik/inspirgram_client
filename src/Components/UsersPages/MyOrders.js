import React, {useState, useEffect} from 'react';
import {Snackbar, Typography, makeStyles, Container, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import {config, useSpring, animated} from 'react-spring';
import { Redirect } from 'react-router';
import store from '../../redux/store';


const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    orderscontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        minHeight: '300px',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function MyOrders() {
    const classes = useStyles();
    const [content, setContent] = useState(<div></div>);
    const [goodAlertOpen, setGoodAlertOpen] = useState(false);
    const [badAlertOpen, setBadAlertOpen] = useState(false);
    const [redirect, setRedirect] = useState("/");

    const goodAlertClick = () => {
        setGoodAlertOpen(true);
    };
    const badAlertClick = () => {
        setBadAlertOpen(true);
    };
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setGoodAlertOpen(false);
        setGoodAlertOpen(false);
    }; 

    const deleteClicked = async (order) => {  
        let parsed;
        try {
            const res = await fetch('http://localhost:5000/orders/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                           'inspirgram_auth_token':  localStorage.getItem('inspirgram_auth_token')
                         },
                body: JSON.stringify({ sentenceId: order.sentenceId, orderId: order.orderId })
            })
            parsed = await res.json();
        } catch(e) {
            console.log(e);
            badAlertClick();
        }
        if(parsed.status === 1) { 
            goodAlertClick();
        } else { 
            badAlertClick();
        }
    };

    useEffect(() => { 
        async function getData () {
            const state = store.getState();
            let parsed;
            try {
                const res = await fetch('http://localhost:5000/orders/allClient', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                               'inspirgram_auth_token':  localStorage.getItem('inspirgram_auth_token')
                             }
                })
                parsed = await res.json();
            } catch(e) {
                console.log(e);
            }
            if(parsed.status === 1) {
                const orders = parsed.data;
                if(orders.length !== 0) {
                    if(state.sentences.items[0] === undefined) {
                        return ( <Redirect to={redirect} />)
                    } else {
                        const display = orders.map(order => (
                            <div key={order.orderId} style={{border: '1px solid', margin: '10px', height: '250px', width: '300px', backgroundColor: order.style.backgroundColor,}}>
                                <div style={{height: '205px', fontSize: '18px', display: 'flex', color: order.style.textColor, fontFamily: order.style.fontFamily, fontWeight: order.style.fontWeight, fontStyle: order.style.fontStyle, textDecoration: order.style.textDecoration, textAlign: order.style.textAlign, alignItems: order.style.alignItems }}>{state.sentences.items[order.sentenceId-1].sentenceBody}</div>
                                <div style={{ height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
                                    <Tooltip title="cancel order" aria-label="cancel order" >
                                        <IconButton aria-label="add to shopping cart" onClick={() => deleteClicked(order)} >
                                            <DeleteIcon style={{ color: 'gray' }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>));
                        setContent(display);
                    }
                }
            } else {
                setContent(<div>Orders are empty</div>);
            }
            
        };
        getData();
    }, []); 

    const [myOrdersSpring, setMyOrdersSpring] = useSpring(()=>({
        from: { opacity: 0, transform: 'translate3d(0px, -1000px, -100px)'},
        to: { opacity: 1, transform: 'translate3d(0px,0px,0px)'},
        delay: 400,
        config: config.wobbly
    })); 
    const [heroSpring, setHeroSpring] = useSpring(()=>({
        from: { opacity: 0, transform: 'translate3d(0px, -1000px, -100px)'},
        to: { opacity: 1, transform: 'translate3d(0px,0px,0px)'},
        delay: 600,
        config: config.wobbly
    }));   

    return (
        <div>
            <animated.div style={heroSpring} className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        My Orders
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Inspirgram team appriciate your contribution to the inspirgram comunity
                    </Typography>
                </Container>
            </animated.div>
            <animated.div style={myOrdersSpring} className={classes.orderscontainer}>
                {content}
            </animated.div>
            <Snackbar open={goodAlertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                    your action has been completed successfuly!
                </Alert>
            </Snackbar>
            <Snackbar open={badAlertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error">
                    action hasent been completed, please try again later
                </Alert>
            </Snackbar>
        </div>
    )
};





