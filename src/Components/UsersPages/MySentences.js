import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Snackbar, Button, Typography, makeStyles, Container, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { fetchSentences } from '../../redux/actions/sentenceActions';
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
    sentencescontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    addbutton: {
        textTransform: 'initial',
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
    },
    navButton: {
        textDecoration: 'none',
        backgroundColor: 'pink',
    },
    addDiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    orders: {
        marginTop: '0px',
        marginLeft: '10px',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MySentences = props => {
    const classes = useStyles();
    const [content, setContent] = useState(<div></div>);
    const [sentences, setSentences] = useState(undefined)
    const [goodAlertOpen, setGoodAlertOpen] = useState(false);
    const [badAlertOpen, setBadAlertOpen] = useState(false);

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

    const deleteClicked = async (sentenceId) => {
        let parsed;
        const res = await fetch('http://localhost:5000/sentences/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                       'inspirgram_auth_token':  localStorage.getItem('inspirgram_auth_token')
                     },
            body: JSON.stringify({ sentenceId: sentenceId })
        })
        parsed = await res.json();

        if(parsed.status === 1) { 
            goodAlertClick();
        } else { 
            badAlertClick();
        }
    };

    useEffect(() => { 
        const info = store.getState();
        if(info.sentences.items.length === 0) {
            props.fetchSentences();
        };
        setSentences(info.sentences.items);
        if(sentences !== undefined) {
            const empty = [];
            sentences.forEach(function(obj){
                if(obj.writerId == localStorage.getItem('userId')) {
                    empty.push(obj);
                }
            });

            
            const display = empty.map(sentence => (
                <div key={sentence.sentenceId} style={{margin: '10px', height: '250px', width: '300px', backgroundColor: sentence.style.backgroundColor,}}>
                    <div style={{height: '205px', fontSize: '18px', display: 'flex', color: sentence.style.textColor, fontFamily: sentence.style.fontFamil, fontWeight: sentence.style.fontWeight, fontStyle: sentence.style.fontStyle, textDecoration: sentence.style.textDecoration, textAlign: sentence.style.textAlign, alignItems: sentence.style.alignItems}}>{sentence.sentenceBody}</div>
                    <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',}}>
                        <Tooltip title="edit" aria-label="edit" >
                            <NavLink to = {{
                                pathname:'/Editor',
                                params:  sentence.sentenceId, 
                            }}
                            >
                                <EditOutlinedIcon style={{ color: 'gray', marginTop: '15px', marginLeft: '8px' }} />
                            </NavLink>
                        </Tooltip>
                        <div className={classes.orders}><PaymentIcon style={{ color: 'gray', marginTop: '15px' }} />{sentence.numOfOrders}</div>
                        <Tooltip title="buy now" aria-label="buy now" >
                            <IconButton aria-label="add to shopping cart" onClick={() => deleteClicked(sentence.sentenceId)} >
                                <DeleteIcon style={{ color: 'gray' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>));
            setContent(display);
        }
    }, [sentences]); 


    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        My Sentences
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Inspirgram team appriciate your contribution to the inspirgram comunity
                    </Typography>
                </Container>
                <div className={classes.addDiv}>
                    <NavLink to = {{pathname:'/Editor'}} className={classes.navButton}>
                        <Button variant="outlined" className={classes.addbutton} >Add New Sentence</Button>
                    </NavLink>
                </div>
            </div>
            <div className={classes.sentencescontainer}>
                {content}
            </div>
            <Snackbar open={goodAlertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                    your sentence has been deleted successfuly!
                </Alert>
            </Snackbar>
            <Snackbar open={badAlertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error">
                    sentence hasent been deleted, please try again later
                </Alert>
            </Snackbar>
        </div>
    )
};

const mapStateToProps = state => ({
    sentences: state.sentences.items,
});

export default connect(mapStateToProps, { fetchSentences })(MySentences);


