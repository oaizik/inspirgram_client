import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';
import { connect } from 'react-redux';
import { fetchSentences } from '../../redux/actions/sentenceActions';
import './sentences.css';
import store from '../../redux/store';

class Sentences extends Component {

    componentDidMount() {
        const state = store.getState();
        if(state.sentences.items.length === 0) {
            this.props.fetchSentences();
        }
    };

    likeClicked(e) {
        console.log(e);
    };

    async buyClicked(sentenceId) {
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
                                            textColor: this.props.sentences[sentenceId].style.textColor,
                                            backgroundColor: this.props.sentences[sentenceId].style.backgroundColor,
                                            fontFamily: this.props.sentences[sentenceId].style.fontFamily,
                                            fontSize: this.props.sentences[sentenceId].style.fontSize,
                                            fontWeight: this.props.sentences[sentenceId].style.fontWeight,
                                            fontStyle: this.props.sentences[sentenceId].style.fontStyle,
                                            textDecoration: this.props.sentences[sentenceId].style.textDecoration,
                                            textAlign: this.props.sentences[sentenceId].style.textAlign,
                                            alignItems: this.props.sentences[sentenceId].style.alignItems } 
                                            // alignItems: state.sentences.items[sentenceId].style.alignItems
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
    
    render() {
        let liked = 'gray';
        const sentenceItems = this.props.sentences.map(sentence => (
            <div key={sentence.sentenceId} style={{border: '1px solid', margin: '10px', height: '250px', width: '300px', backgroundColor: sentence.style.backgroundColor,}}>
                <div style={{height: '205px', fontSize: '18px', display: 'flex', color: sentence.style.textColor, fontFamily: sentence.style.fontFamily, fontWeight: sentence.style.fontWeight, fontStyle: sentence.style.fontStyle, textDecoration: sentence.style.textDecoration, textAlign: sentence.style.textAlign, alignItems: sentence.style.alignItems }}>{sentence.sentenceBody}</div>
                <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',}}>
                    <Tooltip title="like" aria-label="like" >
                        <IconButton aria-label="add to shopping cart" onClick={() => this.likeClicked(this)}>
                            <FavoriteBorderTwoToneIcon style={{ color: liked }} />
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
                        <IconButton aria-label="add to shopping cart" onClick={() => this.buyClicked(sentence.sentenceId)} >
                            <AddShoppingCartIcon style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        ));
            return (
                <div className="sentencescontainer" >
                    {sentenceItems}
                </div>
        );
    }
}

const mapStateToProps = state => ({
    sentences: state.sentences.items,
    newSentence: state.sentences.item
});

export default connect(mapStateToProps, { fetchSentences })(Sentences);


