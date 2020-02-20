import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography, makeStyles, Container, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
        backgroundColor: 'DodgerBlue',
    },
    addbutton: {
        textTransform: 'initial',
        color: 'black',
    },
}));

export default function MySentences() {
    const classes = useStyles();
    const state = store.getState();
    const [info, setInfo] = useState(store.getState());
    const [content, setContent] = useState(<div></div>);
    const [sentences, setSentences] = useState(undefined)
    const [id, setId] = useState(1);

    const deleteClicked = sentenceId => {
        //delete sentence
        //sentence id = sentenceId
        //user id = id
    };

    useEffect(() => { 
        console.log('here');
        console.log(`info.sentences.items: ${info.sentences.items}`);
        setSentences(info.sentences.items);
        console.log(`sentences: ${sentences}`);
        setId(info.user.user.id);
        console.log(`id: ${id}`);
        if(sentences !== undefined) {
            const empty = [];
            sentences.forEach(function(obj){
                if(obj.writerId === 1) {
                    empty.push(obj);
                }
            });
            const display = empty.map(sentence => (
                <div key={sentence.sentenceId} style={{margin: '10px', height: '250px', width: '200px', backgroundColor: sentence.style.backgroundColor,}}>
                    <div style={{height: '205px', color: sentence.style.textColor, fontFamily: sentence.style.fontFamil, }}>{sentence.sentenceBody}</div>
                    <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',}}>
                        <Tooltip title="edit" aria-label="edit" >
                            <NavLink to = {{
                                pathname:'/Editor',
                                params: sentence.sentenceId}}
                            >
                                <EditOutlinedIcon style={{ color: 'gray', marginTop: '10px' }} />
                            </NavLink>
                        </Tooltip>
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
                    {/* <NavLink to = {{pathname:'/Editor'}}>
                        <Button variant="outlined" className={classes.addbutton} >Add New Sentence</Button>
                    </NavLink> */}
                </Container>
            </div>
            <div className={classes.sentencescontainer}>
                {content}
            </div>
        </div>
    )
};