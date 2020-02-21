import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography, makeStyles, Container, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import store from '../../redux/store';


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    orderscontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'DodgerBlue',
    },
    addbutton: {
        textTransform: 'initial',
        color: 'black',
        margin: '0px auto',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
}));

export default function MyOrders() {
    const classes = useStyles();
    const [content, setContent] = useState(<div></div>);
    const [orders, setOrders] = useState(undefined)
    const [id, setId] = useState(1);

    const deleteClicked = orderId => {
        //  @@@@@@@@@@@@@@@@@@@ API CALL @@@@@@@@@@@@@@@@@@@@@  
        //delete order
        //sentence id = sentenceId
        //user id = id
        console.log(`order id: ${orderId}`);
    };

    const buyClicked = (order) => {
        //  @@@@@@@@@@@@@@@@@@@ API CALL @@@@@@@@@@@@@@@@@@@@@  
        //make the same order
        //all the info needed is in the order object
        console.log(`order obj: ${order}`);
    };

    useEffect(() => { 
        //  here we fetch akk client orders with user id
        const state = store.getState();
        const id = state.user.user.id;
        const sentences = state.sentences.items;

        const orders = [
            {
                style: {
                    textColor: 'black',
                    backgroundColor: 'white',
                    fontFamily: 'Ariel',
                },
                sentenceId: 1,
                platform: "canvas",
                orderId: 1,
                updateedAt: "2020-01-28T14:22:19.190+00:00",
            },
            {
                style: {
                    textColor: 'black',
                    backgroundColor: 'blue',
                    fontFamily: 'Ariel',
                },
                sentenceId: 2,
                platform: "t-shirt",
                orderId: 2,
                updateedAt: "2020-01-28T14:22:46.353+00:00",
            },
            {
                style: {
                    textColor: 'black',
                    backgroundColor: 'green',
                    fontFamily: 'Ariel',
                },
                sentenceId: 3,
                platform: "canvas",
                orderId: 3,
                updateedAt: "2020-01-28T14:22:22.353+00:00",
            },
            {
                style: {
                    textColor: 'black',
                    backgroundColor: 'red',
                    fontFamily: 'Ariel',
                },
                sentenceId: 4,
                platform: "photo",
                orderId: 4,
                updateedAt: "2020-01-28T14:22:22.353+00:00",
            },
        ];
        if(orders !== undefined) {
            const display = orders.map(order => (
                <div key={order.orderId} style={{margin: '10px', height: '250px', width: '200px', backgroundColor: order.style.backgroundColor,}}>
                    <div style={{height: '205px', color: order.style.textColor, fontFamily: order.style.fontFamily, }}>{state.sentences.items[order.sentenceId-1].sentenceBody}</div>
                    <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',}}>
                        <Tooltip title="buy now" aria-label="buy now" >
                            <IconButton aria-label="add to shopping cart" onClick={() => deleteClicked(order.orderId)} >
                                <DeleteIcon style={{ color: 'gray' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="buy now" aria-label="buy now" >
                            <IconButton aria-label="add to shopping cart" onClick={() => buyClicked(order)} >
                                <AddShoppingCartIcon style={{ color: 'gray' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>));
            setContent(display);
        }
    }, [orders]); 


    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        My Orders
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Inspirgram team appriciate your contribution to the inspirgram comunity
                    </Typography>
                </Container>
            </div>
            <div className={classes.orderscontainer}>
                {content}
            </div>
        </div>
    )
};





