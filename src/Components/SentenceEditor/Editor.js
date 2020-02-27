import React, { useState, useEffect } from 'react';
import {Snackbar, TextField, Tab, Tabs, Paper, Button, Typography, makeStyles, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router';
import {config, useSpring, animated} from 'react-spring';
import { connect } from 'react-redux';
import { createSentence } from '../../redux/actions/sentenceActions';
import store from '../../redux/store';

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
    },
    container: {
        display: 'flex',
        height: '70vh',
        margin: '0px auto',
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down(700)]: {
            height: '100%',
            width: '100%',
            flexDirection: 'column-reverse',
            alignItems: 'center',
        },
    },
    paper: {
        width: '40%',
        borderRadius: '10px',
        border: '1px solid',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
        [theme.breakpoints.down(700)]: {
            marginTop: '5vh',
            width: '90%',
        },
    },
    buttonGroup: {
        marginTop: '4vh',
    },
    colorGroup: {
        marginTop: '4vh',
        fontFamily: "'Lato', sans-serif",
        textAlign: 'center',
        overflow: 'scroll',
        height: '56vh',
    },
    colors: {
        textTransform: 'initial',
        margin: '2px',
        textAlign: 'center',
    },
    button: {
        textTransform: 'initial',
        margin: '10px 10px 10px 10px',
        background: 'linear-gradient(45deg, #dcdcdc 30%, #dcdcef 90%)',
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    form: {
        display: 'flex',
    },
    colorBar: {
        width: '100%' + theme.spacing(3) * 2,
    },
    tab: {
        textTransform: 'initial',
    },
    input: {
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'center',
        width: '95%',
        height: '11vh',
        fontFamily: '"Lucida Console", Monaco, monospace',
        [theme.breakpoints.down(950)]: {
            width: '99%',
        },
    },
    finish: {
        width: '80%',
        margin: '60px auto',
        height: '10vh',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down(700)]: {
            flexDirection: 'column',
            width: '90%',
            alignItems: 'center',
        },
    },
    finishButton: {
        textTransform: 'initial',
        margin: '10px 10px 10px 10px',
        width: '100%',
        background: 'linear-gradient(45deg, #dcdcdc 30%, #dcdcef 90%)',
        color: 'black',
        fontSize: '18px',
        fontWeight: 'bold',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const sentenceDefaultStyle = {
    style: {
        color: 'black',
        backgroundColor: 'white',
        fontFamily: 'Courier New", Courier, monospace',
        fontSize: '50px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'center',
        alignItems: 'center',
    },
    sentenceBody: '"Dont let yesterday take up too much of today"',
    sentenceId: -1,
};
const calcButton = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const transButton = (x, y, s) => `perspective(600px) scale(${s})`;
const calcFinish = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const transFinish = (x, y, s) => `perspective(600px) scale(${s})`;
const calcSentence = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.2];
const transSentence = (x, y, s) => `perspective(600px) scale(${s})`;

const Editor = props => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(undefined);
    const [writer, setWriter] = useState(false);

    const handleWriter = () => {
        setWriter(true);
        setSentenceBody('please enter your creation in the input field');
    };
    const handleWriterEdit = () => {
        setWriter(true);
    };
    useEffect(() => {
        const state = store.getState();
        if(props.location.params === -1) {
            setSentenceId(6);
        } else if(props.location.params) {
            setSentenceId(state.sentences.items[props.location.params-1].sentenceId);
            setSentenceBody(state.sentences.items[props.location.params-1].sentenceBody);
            setSentenceStyle({...sentenceStyle,
                color: state.sentences.items[props.location.params-1].style.textColor,
                backgroundColor: state.sentences.items[props.location.params-1].style.backgroundColor,
                fontFamily: state.sentences.items[props.location.params-1].style.fontFamily
            });
            if(localStorage.getItem('userId') == state.sentences.items[props.location.params-1].writerId) {
                handleWriterEdit();
            } else {
            }
        } else if(localStorage.getItem('userType') === 'writer') {
            handleWriter();
        } else {
            setRedirect("/");
        }

    }, [writer]);

    const [sentenceStyle, setSentenceStyle] = useState(sentenceDefaultStyle.style);
    const [sentenceBody, setSentenceBody] = useState(sentenceDefaultStyle.sentenceBody);
    const [sentenceId, setSentenceId] = useState(sentenceDefaultStyle.sentenceId);
    let tabAction = 0;

    const buySentenceClicked = async () => {
        if(localStorage.getItem('userId')) {
            //  new order
            let parsedRes;
            try {
                const response = await fetch('https://inspirgram.herokuapp.com/orders/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'inspirgram_auth_token': localStorage.getItem('inspirgram_auth_token')
                            },
                    body: JSON.stringify({ clientId: localStorage.getItem('userId'),
                                           sentenceId: sentenceId,
                                           platform: "canvas",
                                           style: {
                                            textColor: sentenceStyle.color,
                                            backgroundColor: sentenceStyle.backgroundColor,
                                            fontFamily: sentenceStyle.fontFamily,
                                            fontSize: sentenceStyle.fontSize,
                                            fontWeight: sentenceStyle.fontWeight,
                                            fontStyle: sentenceStyle.fontStyle,
                                            textDecoration: sentenceStyle.textDecoration,
                                            textAlign: sentenceStyle.textAlign,
                                            alignItems: sentenceStyle.alignItems }
                                        }),
                    })
                    parsedRes = await response.json();
            } catch(e) {
                console.log(e);
                badAlertClick();
            }
            if(parsedRes.status === 1) {
                goodAlertClick();
            } else {
                badAlertClick();
            }

            //  paypal pay
            let parsed;
            try {
                const res = await fetch('https://inspirgram.herokuapp.com/paypal/pay', {
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
                badAlertClick();
            }
            if(parsed.paymentLink) {
                window.location = `${parsed.paymentLink}`;
            } else {
                badAlertClick();
            };

        } else { //   if user is not logged in
            warningAlertClick();
        }
    };
    const saveSentenceClicked = async () => {
        if(sentenceId === -1) { //  adding new sentence
            let parsed;
            try {
                const res = await fetch('https://inspirgram.herokuapp.com/sentences', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'inspirgram_auth_token': localStorage.getItem('inspirgram_auth_token')
                             },
                    body: JSON.stringify({ writerId: localStorage.getItem('userId'),
                                           sentenceBody: sentenceBody,
                                           style: {
                                            textColor: sentenceStyle.color,
                                            backgroundColor: sentenceStyle.backgroundColor,
                                            fontFamily: sentenceStyle.fontFamily,
                                            fontSize: sentenceStyle.fontSize,
                                            fontWeight: sentenceStyle.fontWeight,
                                            fontStyle: sentenceStyle.fontStyle,
                                            textDecoration: sentenceStyle.textDecoration,
                                            textAlign: sentenceStyle.textAlign,
                                            alignItems: sentenceStyle.alignItems }
                                        }),
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
        } else { //  editing sentence
            let parsed;
            try {
                const res = await fetch('https://inspirgram.herokuapp.com/sentences', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json',
                               'inspirgram_auth_token': localStorage.getItem('inspirgram_auth_token')
                            },
                    body: JSON.stringify({ userId: localStorage.getItem('userId'),
                                           sentenceBody: sentenceBody,
                                           style: {
                                            textColor: sentenceStyle.color,
                                            backgroundColor: sentenceStyle.backgroundColor,
                                            fontFamily: sentenceStyle.fontFamily,
                                            fontSize: sentenceStyle.fontSize,
                                            fontWeight: sentenceStyle.fontWeight,
                                            fontStyle: sentenceStyle.fontStyle,
                                            textDecoration: sentenceStyle.textDecoration,
                                            textAlign: sentenceStyle.textAlign,
                                            alignItems: sentenceStyle.alignItems },
                                           sentenceId: sentenceId,
                                        }),
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
        }
    };
    const warningAlertClick = () => {
        setAlertOpen(true);
    };
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
        setAlertOpen(false);
        setGoodAlertOpen(false);
        setGoodAlertOpen(false);
    };
    const ChangeTextSize = e => {
        setSentenceStyle({...sentenceStyle, fontSize: `${e}px`, lineHeight: `${e+10}px`});
        setOpenFontSize(false);
    };
    const ChangeTextAlign = e => {
        setSentenceStyle({...sentenceStyle, textAlign: `${e}`});
        setOpenTextAlign(false);
    };
    const ChangeAlignItems = e => {
        setSentenceStyle({...sentenceStyle, alignItems: `${e}`});
        setOpenAlignItems(false);
    };
    const ChangeFontFamily = e => {
        setSentenceStyle({...sentenceStyle, fontFamily: `${e}`});
        setOpenFontFamily(false);
    };
    const setFontWeight = () => {
        setSentenceStyle({...sentenceStyle, fontWeight: 'normal'});
    };
    const setFontWeightBold = () => {
            setSentenceStyle({...sentenceStyle, fontWeight: 'bold'});
    };
    const setFontStyle = () => {
        setSentenceStyle({...sentenceStyle, fontStyle: 'normal'});
    };
    const setFontStyleItalic = () => {
        setSentenceStyle({...sentenceStyle, fontStyle: 'italic'});
    };
    const setUnderLine = () => {
        setSentenceStyle({...sentenceStyle, textDecoration: 'underline'});
    };
    const setNoUnderLine = () => {
        setSentenceStyle({...sentenceStyle, textDecoration: 'none'});
    };
    const changeColor = c => {
        if(tabAction === 1) {
            setSentenceStyle({...sentenceStyle, color: c});
        } else {
            setSentenceStyle({...sentenceStyle, backgroundColor: c});
        }
    };
    const changeSentenceBody = e => {
        setSentenceBody(e);
    };
    const tabClicked = val => {
        tabAction = val;
    };
    const handleTabChange = (event, newValue) => {
        setTebValue(newValue);
        if(newValue === 0) {
            setButtonsGroup(textGroup);
        } else {
            setButtonsGroup(colorGroup);
        }
    };
    const [buttonSpring, setButtonSpring] = useSpring(() => ({ xys: [0, 0, 1], config: config.wobbly }))
    const [finishSpring, setFinishSpring] = useSpring(() => ({ xys: [0, 0, 1], config: config.wobbly }))
    const [sentenceSpring, setSentenceSpring] = useSpring(() => ({ xys: [0, 0, 1], config: config.wobbly }))
    const textGroup = (
        <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setButtonSpring({ xys: calcButton(x, y) })}
            onMouseLeave={() => setButtonSpring({ xys: [0, 0, 1] })}
            style={{ transform: buttonSpring.xys.interpolate(transButton) }}
        >
            <Button className={classes.button} variant="contained" onClick={()=> setOpenTextAlign(true)}>Horizonal alingment</Button>
            <Button className={classes.button} variant="contained" onClick={()=> setOpenAlignItems(true)}>Vertical alingment</Button>
            <Button className={classes.button} variant="contained" onClick={()=> setOpenFontSize(true)}>Font size</Button>
            <Button className={classes.button} variant="contained" onClick={()=> setOpenFontFamily(true)}>Font family</Button>
            <Button className={classes.button} variant="contained" onClick={setFontWeightBold}><b>B</b></Button>
            <Button className={classes.button} variant="contained" onClick={setFontWeight}>B</Button>
            <Button className={classes.button} variant="contained" onClick={setFontStyleItalic}><i>I</i></Button>
            <Button className={classes.button} variant="contained" onClick={setFontStyle}>I</Button>
            <Button style={{textDecoration: 'underline'}} className={classes.button} variant="contained" onClick={setUnderLine}>U</Button>
            <Button className={classes.button} variant="contained" onClick={setNoUnderLine}>U</Button>
        </animated.div>
    );
    const colorGroup = (
        <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setButtonSpring({ xys: calcButton(x, y) })}
            onMouseLeave={() => setButtonSpring({ xys: [0, 0, 1] })}
            style={{ transform: buttonSpring.xys.interpolate(transButton) }}
            className={classes.colorGroup}
        >
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Red Colors:</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightsalmon'}} onClick={e=> changeColor('lightsalmon')}>lightsalmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'salmon'}} onClick={e=> changeColor('salmon')}>salmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darksalmon'}} onClick={e=> changeColor('darksalmon')}>darksalmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'indianred'}} onClick={e=> changeColor('indianred')}>indianred</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'crimson'}} onClick={e=> changeColor('crimson')}>crimson</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'firebrick'}} onClick={e=> changeColor('firebrick')}>firebrick</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'red'}} onClick={e=> changeColor('red')}>red</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkred', color: 'white'}} onClick={e=> changeColor('darkred')}>darkred</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Orange Colors:</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'coral'}} onClick={e=> changeColor('coral')}>coral</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'orangered'}} onClick={e=> changeColor('orangered')}>orangered</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'gold'}} onClick={e=> changeColor('gold')}>gold</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'orange'}} onClick={e=> changeColor('orange')}>orange</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Yellow colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightyellow'}} onClick={e=> changeColor('lightyellow')}>lightyellow</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lemonchiffon'}} onClick={e=> changeColor('lemonchiffon')}>lemonchiffon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'papayawhip'}} onClick={e=> changeColor('papayawhip')}>papayawhip</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'moccasin'}} onClick={e=> changeColor('moccasin')}>moccasin</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'khaki'}} onClick={e=> changeColor('khaki')}>khaki</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'yellow'}} onClick={e=> changeColor('yellow')}>yellow</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Green colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lawngreen'}} onClick={e=> changeColor('lawngreen')}>lawngreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'limegreen'}} onClick={e=> changeColor('limegreen')}>limegreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lime'}} onClick={e=> changeColor('lime')}>lime</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'green'}} onClick={e=> changeColor('green')}>green</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkgreen', color: 'white'}} onClick={e=> changeColor('darkgreen')}>darkgreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'springgreen'}} onClick={e=> changeColor('springgreen')}>springgreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'palegreen'}} onClick={e=> changeColor('palegreen')}>palegreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkseagreen'}} onClick={e=> changeColor('darkseagreen')}>darkseagreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumseagreen'}} onClick={e=> changeColor('mediumseagreen')}>mediumseagreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'seagreen'}} onClick={e=> changeColor('seagreen')}>seagreen</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'olivedrab'}} onClick={e=> changeColor('olivedrab')}>olivedrab</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Cyan colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'cyan'}} onClick={e=> changeColor('cyan')}>cyan</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'aquamarine'}} onClick={e=> changeColor('aquamarine')}>aquamarine</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'paleturquoise'}} onClick={e=> changeColor('paleturquoise')}>paleturquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'turquoise'}} onClick={e=> changeColor('turquoise')}>turquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkturquoise'}} onClick={e=> changeColor('darkturquoise')}>darkturquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'cadetblue', color: 'white'}} onClick={e=> changeColor('cadetblue')}>cadetblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'teal', color: 'white'}} onClick={e=> changeColor('teal')}>teal</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Blue colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightblue'}} onClick={e=> changeColor('lightblue')}>lightblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightskyblue'}} onClick={e=> changeColor('lightskyblue')}>lightskyblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'deepskyblue'}} onClick={e=> changeColor('deepskyblue')}>deepskyblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightsteelblue'}} onClick={e=> changeColor('lightsteelblue')}>lightsteelblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'dodgerblue'}} onClick={e=> changeColor('dodgerblue')}>dodgerblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'cornflowerblue'}} onClick={e=> changeColor('cornflowerblue')}>cornflowerblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'royalblue'}} onClick={e=> changeColor('royalblue')}>royalblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'blue', color: 'white'}} onClick={e=> changeColor('blue')}>blue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumblue', color: 'white'}} onClick={e=> changeColor('mediumblue')}>mediumblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'navy', color: 'white'}} onClick={e=> changeColor('navy')}>navy</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumslateblue'}} onClick={e=> changeColor('mediumslateblue')}>mediumslateblue</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Purple colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lavender'}} onClick={e=> changeColor('lavender')}>lavender</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'plum'}} onClick={e=> changeColor('plum')}>plum</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'violet'}} onClick={e=> changeColor('violet')}>violet</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'orchid'}} onClick={e=> changeColor('orchid')}>orchid</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'fuchsia'}} onClick={e=> changeColor('fuchsia')}>fuchsia</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumorchid'}} onClick={e=> changeColor('mediumorchid')}>mediumorchid</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'blueviolet'}} onClick={e=> changeColor('blueviolet')}>blueviolet</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkorchid'}} onClick={e=> changeColor('darkorchid')}>darkorchid</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkmagenta', color: 'white'}} onClick={e=> changeColor('darkmagenta')}>darkmagenta</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'indigo', color: 'white'}} onClick={e=> changeColor('indigo')}>indigo</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Pink colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'pink'}} onClick={e=> changeColor('pink')}>pink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'hotpink'}} onClick={e=> changeColor('hotpink')}>hotpink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'deeppink'}} onClick={e=> changeColor('deeppink')}>deeppink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'palevioletred'}} onClick={e=> changeColor('palevioletred')}>orchid</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumvioletred'}} onClick={e=> changeColor('mediumvioletred')}>mediumvioletred</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>White colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'white'}} onClick={e=> changeColor('white')}>white</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'honeydew'}} onClick={e=> changeColor('honeydew')}>honeydew</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'ghostwhite'}} onClick={e=> changeColor('ghostwhite')}>ghostwhite</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'beige'}} onClick={e=> changeColor('beige')}>beige</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'linen'}} onClick={e=> changeColor('linen')}>linen</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Gray colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightgray'}} onClick={e=> changeColor('lightgray')}>lightgray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'silver'}} onClick={e=> changeColor('silver')}>silver</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'gray', color: 'white'}} onClick={e=> changeColor('gray')}>gray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'dimgray', color: 'white'}} onClick={e=> changeColor('dimgray')}>dimgray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'slategray', color: 'white'}} onClick={e=> changeColor('slategray')}>slategray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkslategray', color: 'white'}} onClick={e=> changeColor('darkslategray')}>darkslategray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'black', color: 'white'}} onClick={e=> changeColor('black')}>black</Button>
            <div style={{fontFamily: 'Lato', fontWeight: 700}}>Brown colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'brown', color: 'white'}} onClick={e=> changeColor('brown')}>brown</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'wheat'}} onClick={e=> changeColor('wheat')}>wheat</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'burlywood'}} onClick={e=> changeColor('burlywood')}>burlywood</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'sandybrown'}} onClick={e=> changeColor('sandybrown')}>sandybrown</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'goldenrod'}} onClick={e=> changeColor('goldenrod')}>goldenrod</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'chocolate'}} onClick={e=> changeColor('chocolate')}>chocolate</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'sienna', color: 'white'}} onClick={e=> changeColor('sienna')}>sienna</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'maroon', color: 'white'}} onClick={e=> changeColor('maroon')}>maroon</Button>
        </animated.div>
    );


    const [openFontSize, setOpenFontSize] = useState(false);
    const [openTextAlign, setOpenTextAlign] = useState(false);
    const [openAlignItems, setOpenAlignItems] = useState(false);
    const [openFontFamily, setOpenFontFamily] = useState(false);
    const [tabValue, setTebValue] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [goodAlertOpen, setGoodAlertOpen] = useState(false);
    const [badAlertOpen, setBadAlertOpen] = useState(false);
    const [buttonsGroup, setButtonsGroup] = useState(textGroup);
    const [fade, toggleFade] = useState(true)
    const { x } = useSpring({ from: { x: 0 }, x: fade ? 1 : 0, config: { duration: 1000 } })
    const [contentSpring, setContentSpring] = useSpring(()=>({
        from: { opacity: 0,
            transform: 'translate3d(0px, -1000px, 0px)'},
        to: {   opacity: 1,
            transform: 'translate3d(0px,0px,0px)'},
        delay: 500,
        config: config.stiff
    }));


    if(redirect !== undefined) {
        return ( <Redirect to={redirect}/> );
    }
    return (
        <div>
            <animated.div
                className={classes.heroContent}
                onMouseEnter={() => toggleFade(!fade)}
                style={{
                    opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
                    transform: x.interpolate({range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]}).interpolate(x => `scale(${x})`)
            }}>
                <Container maxWidth="sm">
                    <Typography style={{fontFamily: "'Lato', sans-serif"}} component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Welcome to our Mighty editor!
                    </Typography>
                    {writer &&
                    <div className={classes.input}>
                    <p>Insert your new inspiration here:</p>
                    <TextField
                        id="outlined-name"
                        label="Inspirgram"
                        placeholder="Add your words"
                        onChange={e=> changeSentenceBody(e.target.value)}
                        variant="outlined"
                    />
                    </div>}
                </Container>
            </animated.div>
            <animated.div style={contentSpring} className={classes.container}>
                <Paper className={classes.paper}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab className={classes.tab} label="Text" onClick={e=> tabClicked(0)} />
                        <Tab className={classes.tab} label="Color" onClick={e=> tabClicked(1)} />
                        <Tab className={classes.tab} label="Background color" onClick={e=> tabClicked(2)} />
                    </Tabs>
                    {buttonsGroup}
                </Paper>
                <animated.div
                    style={{...sentenceStyle, padding: '10px', border: '1px dashed', borderRadius: '2%', width: '90%', minHeight: '50vh', display: 'flex', transform: sentenceSpring.xys.interpolate(transSentence)}}
                    onMouseMove={({ clientX: x, clientY: y }) => setSentenceSpring({ xys: calcSentence(x, y) })}
                    onMouseLeave={() => setSentenceSpring({ xys: [0, 0, 1] })}
                >
                    {sentenceBody}
                </animated.div>
            </animated.div>
            <animated.div
                className={classes.finish}
                onMouseMove={({ clientX: x, clientY: y }) => setFinishSpring({ xys: calcFinish(x, y) })}
                onMouseLeave={() => setFinishSpring({ xys: [0, 0, 1] })}
                style={{ transform: finishSpring.xys.interpolate(transFinish) }}
            >
                {writer &&
                <Button
                    onClick={saveSentenceClicked}
                    variant="contained"
                    color="secondary"
                    className={classes.finishButton}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload now
                </Button>}
                <Button
                    onClick={buySentenceClicked}
                    variant="contained"
                    color="secondary"
                    className={classes.finishButton}
                    startIcon={<AddShoppingCartIcon />}
                >
                    Buy now
                </Button>
            </animated.div>
            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="warning">
                    You have to be logged in before making such action!
                </Alert>
            </Snackbar>
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
            {/* change Font Size section */}
            <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={openFontSize} onClose={e=> setOpenFontSize(false)}>
                <DialogTitle>select Text Size</DialogTitle>
                <DialogContent>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">{sentenceStyle.fontSize}</InputLabel>
                        <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={sentenceStyle.textSize} onChange={e=> ChangeTextSize(e.target.value)} input={<Input />}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={40}>40 px</MenuItem>
                            <MenuItem value={44}>44 px</MenuItem>
                            <MenuItem value={48}>48 px</MenuItem>
                            <MenuItem value={52}>52 px</MenuItem>
                            <MenuItem value={56}>56 px</MenuItem>
                            <MenuItem value={60}>60 px</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button className={classes.tab} onClick={e=> setOpenFontSize(false)} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            {/* change Font Size section */}
            {/* change Text Alignment section */}
            <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={openTextAlign} onClose={e=> setOpenTextAlign(false)}>
                <DialogTitle>select Text Alignment</DialogTitle>
                <DialogContent>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">{sentenceStyle.textAlign}</InputLabel>
                        <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={sentenceStyle.textAlign} onChange={e=> ChangeTextAlign(e.target.value)} input={<Input />}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'left'}>left</MenuItem>
                            <MenuItem value={'justify'}>justify</MenuItem>
                            <MenuItem value={'center'}>center</MenuItem>
                            <MenuItem value={'right'}>right</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button className={classes.tab} onClick={e=> setOpenTextAlign(false)} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            {/* change Text Alignment section */}
            {/* change items Alignment section */}
            <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={openAlignItems} onClose={e=> setOpenAlignItems(false)}>
                <DialogTitle>select Text Alignment</DialogTitle>
                <DialogContent>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">{sentenceStyle.alignItems}</InputLabel>
                        <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={sentenceStyle.textAlign} onChange={e=> ChangeAlignItems(e.target.value)} input={<Input />}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'start'}>start</MenuItem>
                            <MenuItem value={'center'}>center</MenuItem>
                            <MenuItem value={'flex-end'}>end</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button className={classes.tab} onClick={e=> setOpenAlignItems(false)} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            {/* change items Alignment section */}
            {/* change font family section */}
            <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={openFontFamily} onClose={e=> setOpenFontFamily(false)}>
                <DialogTitle>select Text Alignment</DialogTitle>
                <DialogContent>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">{sentenceStyle.fontFamily}</InputLabel>
                        <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={sentenceStyle.textAlign} onChange={e=> ChangeFontFamily(e.target.value)} input={<Input />}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem style={{fontFamily: 'Georgia, serif'}} value={'Georgia, serif'}>Georgia Example Text</MenuItem>
                            <MenuItem style={{fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif'}} value={'"Palatino Linotype", "Book Antiqua", Palatino, serif'}>Palatino Example Text</MenuItem>
                            <MenuItem style={{fontFamily: 'Arial, Helvetica, sans-serif'}} value={'Arial, Helvetica, sans-serif'}>Arial Example Text</MenuItem>
                            <MenuItem style={{fontFamily: '"Courier New", Courier, monospace'}} value={'"Courier New", Courier, monospace'}>Courier Example Text</MenuItem>
                            <MenuItem style={{fontFamily: '"Lucida Console", Monaco, monospace'}} value={'"Lucida Console", Monaco, monospace'}>Lucida Example Text</MenuItem>
                            <MenuItem style={{fontFamily: 'Impact, Charcoal, sans-serif'}} value={'Impact, Charcoal, sans-serif'}>Impact Example Text</MenuItem>
                            <MenuItem style={{fontFamily: '"Trebuchet MS", Helvetica, sans-serif'}} value={'"Trebuchet MS", Helvetica, sans-serif'}>Trebuchet Example Text</MenuItem>
                            <MenuItem style={{fontFamily: 'Verdana, Geneva, sans-serif'}} value={'Verdana, Geneva, sans-serif'}>Verdana Example Text</MenuItem>
                            <MenuItem style={{fontFamily: '"Comic Sans MS", cursive, sans-serif'}} value={'"Comic Sans MS", cursive, sans-serif'}>Comic Example Text</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button className={classes.tab} onClick={e=> setOpenFontFamily(false)} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            {/* change font family section */}
        </div>
    );
};

const mapStateToProps = state => ({
    sentences: state.sentences.items
});

export default connect(
    mapStateToProps,
    { createSentence }
)(Editor);












