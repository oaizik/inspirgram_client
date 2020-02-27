import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';
import { connect } from 'react-redux';
import { fetchSentences } from '../../redux/actions/sentenceActions';
import store from '../../redux/store';

const useStyles = makeStyles(theme => ({
    sentencescontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
}));

const Sentences = props => {
    const classes = useStyles();
    const [content, setContent] = useState(<div></div>);

    useEffect(() => { 
        props.fetchSentences();
        const state = store.getState();
        if(Object.keys(state.sentences.item).length !== 0) {
            props.sentences.unshift(state.sentences.item);
        };
        const display = props.sentences.map(sentence => (
            <div key={sentence.sentenceId}
                style={{borderRadius: '10px', border: '2px solid', margin: '10px', height: '300px', width: '350px', backgroundColor: sentence.style.backgroundColor,}}>
                <div style={{height: '255px', fontSize: '22px', display: 'flex', color: sentence.style.textColor, fontFamily: sentence.style.fontFamily, fontWeight: sentence.style.fontWeight, fontStyle: sentence.style.fontStyle, textDecoration: sentence.style.textDecoration, textAlign: sentence.style.textAlign, alignItems: sentence.style.alignItems }}>{sentence.sentenceBody}</div>
                <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between'}}>
                    <Tooltip title="like" aria-label="like" >
                        <IconButton aria-label="add to shopping cart">
                            <FavoriteBorderTwoToneIcon style={{ color: 'red' }} />{sentence.numOfOrders} 
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="edit" aria-label="edit" >
                        <NavLink to = {{
                            pathname:'/Editor',
                            params: sentence.sentenceId}}
                        >
                            <EditOutlinedIcon style={{ color: 'gray', marginTop: '10px' }} />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="buy now" aria-label="buy now" >
                        <IconButton aria-label="add to shopping cart" onClick={() => buyClicked(sentence.sentenceId)} >
                            <AddShoppingCartIcon style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        ));
        setContent(display);
    }, []);

    const buyClicked = async(sentenceId) => {
        if(localStorage.getItem('userId')) { 
            //  new order
            let parsedRes;
            try {
                const response = await fetch('http://localhost:5000/orders/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'inspirgram_auth_token': localStorage.getItem('inspirgram_auth_token')
                            },
                    body: JSON.stringify({ clientId: localStorage.getItem('userId'), 
                                           sentenceId: sentenceId,
                                           platform: "canvas",
                                           style: {
                                            textColor: props.sentences[sentenceId].style.textColor,
                                            backgroundColor: props.sentences[sentenceId].style.backgroundColor,
                                            fontFamily: props.sentences[sentenceId].style.fontFamily,
                                            fontSize: props.sentences[sentenceId].style.fontSize,
                                            fontWeight: props.sentences[sentenceId].style.fontWeight,
                                            fontStyle: props.sentences[sentenceId].style.fontStyle,
                                            textDecoration: props.sentences[sentenceId].style.textDecoration,
                                            textAlign: props.sentences[sentenceId].style.textAlign,
                                            alignItems: props.sentences[sentenceId].style.alignItems } 
                                        }),
                    })
                    parsedRes = await response.json();
            } catch(e) {
                console.log(e);
                alert('an Error occured, order didnt complete!');
            }
            if(parsedRes.status === 1) { 
                alert('redirect to paypal!');
            } else {
                alert('an Error occured, order didnt complete!');
            }

            //  paypal pay
            let parsed;
            try {
                const res = await fetch('http://localhost:5000/paypal/pay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                                            "items":[{
                                                "name": "item", 
                                                "sku": "001",
                                                "price": "25.00",
                                                "currency": "USD",
                                                "quantity": 1 },
                                            ],
                                            "currency":"USD"
                                        }),
                    })
                    parsed = await res.json();
            } catch(e) {
                console.log(e);
            }
            if(parsed.paymentLink) {
                window.location = `${parsed.paymentLink}`;
            } else {
                alert('an Error occured, order didnt complete!');
            };
            
        } else { //   if user is not logged in
            alert('you have to be logged in before making a purches!');
        }
    };
            
    return (
        <div className={classes.sentencescontainer} >
            {content}
        </div>
    );
}

const mapStateToProps = state => ({
    sentences: state.sentences.items,
    newSentence: state.sentences.item
});

export default connect(mapStateToProps, { fetchSentences })(Sentences);
