import React, { useState } from 'react';
import {Snackbar, TextField, Tab, Tabs, Paper, Button, Typography, makeStyles, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
    },
    container: {
        display: 'flex',
        height: '70vh',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down(700)]: {
            height: '100%',
            flexDirection: 'column-reverse',
            alignItems: 'center',
        },
    },
    paper: {
        width: '40%',
        backgroundColor: 'azure',
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
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
        // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        // boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    },
    input: {
        margin: '10% auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'center',
        width: '95%',
        height: '20vh',
        fontFamily: '"Lucida Console", Monaco, monospace',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        [theme.breakpoints.down(700)]: {
            margin: '20% auto',
        },
    },
    finish: {
        width: '80%',
        margin: '0px auto',
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
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Catalog() {
    const classes = useStyles();
    const saveSentenveClicked = async () => {
        //  if user is not logged in
            handleAlertClick();
        //  else
        //  await need to save the sentence to the db
        //  return success or failed to the user
    };
    const buySentenveClicked = async () => {
        //  if user is not logged in
        handleAlertClick();
        //  else
        //  await need to save the order to the db
        //  move to payPal payment
    };
    //  sentence state, thats the sentence style we need to get from the db
    const [sentenceStyle, setSentenceStyle] = useState({
        color: 'black',
        backgroundColor: 'snow',
        fontFamily: 'Verdana, Geneva, sans-serif', //  safe fonts
        fontSize: '40px',   //  40 - 60      
        lineHeight: '50px', //  adjust according the font size + 10
        fontWeight: 'normal',  //  toggle between normal/bold
        fontStyle: 'normal',   //  toggle between normal/italic
        textDecoration: 'none', //  toogle between none/underline
        textAlign: 'left',    //  left, right, justify
        alignItems: 'center',   //    start, end
        sentenceBody: 'Im a testing sentence! Lets see how its gona work...',
        //  unmutable
        padding: '10px 10px 10px 10px',
        border: '0.5px solid',
        borderRadius: '2%',
        width: '90%',
        minHeight: '50vh',
        display: 'flex',
    });
    //  if user is writer he can write and change sentence body
    const writer = true;
    let bCounter = 0, uCounter = 0, iCounter = 0;
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openTextAlign, setOpenTextAlign] = useState(false);
    const [openAlignItems, setOpenAlignItems] = useState(false);
    const [openFontFamily, setOpenFontFamily] = useState(false);
    const [tabValue, setTebValue] = useState(0);
    const [alertOpen, setAlertOpen] = React.useState(false);

    const handleAlertClick = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setAlertOpen(false);
    }; 
    const ChangeTextSize = async e => {
        await setSentenceStyle({...sentenceStyle, fontSize: `${e}px`, lineHeight: `${e+10}px`});
        console.log(`sentence style font size: ${sentenceStyle.fontSize}`);
        setOpenFontSize(false);
    };
    const ChangeTextAlign = async e => {
        await setSentenceStyle({...sentenceStyle, textAlign: `${e}`});
        console.log(`sentence style text align: ${sentenceStyle.textAlign}`);
        setOpenTextAlign(false);
    };
    const ChangeAlignItems = async e => {
        await setSentenceStyle({...sentenceStyle, alignItems: `${e}`});
        console.log(`sentence style text align: ${sentenceStyle.textAlign}`);
        setOpenAlignItems(false);
    };
    const ChangeFontFamily = async e => {
        await setSentenceStyle({...sentenceStyle, fontFamily: `${e}`});
        console.log(`sentence style text align: ${sentenceStyle.fontFamily}`);
        setOpenFontFamily(false);
    };   
    const setFontWeight = () => {
        if(bCounter === 0) {
            setSentenceStyle({...sentenceStyle, fontWeight: 'bold'});
            bCounter = 1;
        } else {
            setSentenceStyle({...sentenceStyle, fontWeight: 'normal'});
            bCounter = 0;
        }
        console.log(`sentence style font-weight: ${sentenceStyle.fontWeight}`);
    };
    const setFontStyle = () => {
        if(iCounter === 0) {
            setSentenceStyle({...sentenceStyle, fontStyle: 'italic'});
            iCounter = 1;
        } else {
            setSentenceStyle({...sentenceStyle, fontStyle: 'normal'});
            iCounter = 0;
        }
        console.log(`sentence style font-style: ${sentenceStyle.fontStyle}`);
    };
    const setUnderLine = () => {
        if(uCounter === 0) {
            setSentenceStyle({...sentenceStyle, textDecoration: 'underline'});
            uCounter = 1;
        } else {
            setSentenceStyle({...sentenceStyle, textDecoration: 'none'});
            uCounter = 0;
        }
        console.log(`sentence style text-decoration: ${sentenceStyle.textDecoration}`);
    };
    const changeColor = c => {
        if(tabValue === 1) {
            setSentenceStyle({...sentenceStyle, color: c});
        } else {
            setSentenceStyle({...sentenceStyle, backgroundColor: c});
        }
        console.log(`tab value: ${tabValue}`);
        console.log(`color: ${c}`);
    };
    const changeSentenceBody = e => {
        setSentenceStyle({...sentenceStyle, sentenceBody: e});
        console.log(`sentence color: ${e}`);
    };

    
    //tabs nav
    const textGroup = (
        <div className={classes.buttonGroup}>
            <Button className={classes.button} variant="contained" onClick={e=> setOpenTextAlign(true)}>Horizonal alingment</Button>
            <Button className={classes.button} variant="contained" onClick={e=> setOpenAlignItems(true)}>Vertical alingment</Button>
            <Button className={classes.button} variant="contained" onClick={e=> setOpenFontSize(true)}>Font size</Button>
            <Button className={classes.button} variant="contained" onClick={e=> setOpenFontFamily(true)}>Font family</Button>
            <Button className={classes.button} variant="contained" onClick={setFontWeight}><b>B</b></Button>
            <Button className={classes.button} variant="contained" onClick={setFontStyle}><i>I</i></Button>
            <Button style={{textDecoration: 'underline'}} className={classes.button} variant="contained" onClick={setUnderLine}>U</Button>
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
        </div>
    );
    const colorGroup = (
        //  maybe add gradiant
        <div className={classes.colorGroup}>
            <div>Red Colors:</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightsalmon'}} onClick={e=> changeColor('lightsalmon')}>lightsalmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'salmon'}} onClick={e=> changeColor('salmon')}>salmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darksalmon'}} onClick={e=> changeColor('darksalmon')}>darksalmon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'indianred'}} onClick={e=> changeColor('indianred')}>indianred</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'crimson'}} onClick={e=> changeColor('crimson')}>crimson</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'firebrick'}} onClick={e=> changeColor('firebrick')}>firebrick</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'red'}} onClick={e=> changeColor('red')}>red</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkred', color: 'white'}} onClick={e=> changeColor('darkred')}>darkred</Button>
            <div>Orange Colors:</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'coral'}} onClick={e=> changeColor('coral')}>coral</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'orangered'}} onClick={e=> changeColor('orangered')}>orangered</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'gold'}} onClick={e=> changeColor('gold')}>gold</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'orange'}} onClick={e=> changeColor('orange')}>orange</Button>
            <div>Yellow colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightyellow'}} onClick={e=> changeColor('lightyellow')}>lightyellow</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lemonchiffon'}} onClick={e=> changeColor('lemonchiffon')}>lemonchiffon</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'papayawhip'}} onClick={e=> changeColor('papayawhip')}>papayawhip</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'moccasin'}} onClick={e=> changeColor('moccasin')}>moccasin</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'khaki'}} onClick={e=> changeColor('khaki')}>khaki</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'yellow'}} onClick={e=> changeColor('yellow')}>yellow</Button>
            <div>Green colors</div>
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
            <div>Cyan colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'cyan'}} onClick={e=> changeColor('cyan')}>cyan</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'aquamarine'}} onClick={e=> changeColor('aquamarine')}>aquamarine</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'paleturquoise'}} onClick={e=> changeColor('paleturquoise')}>paleturquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'turquoise'}} onClick={e=> changeColor('turquoise')}>turquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkturquoise'}} onClick={e=> changeColor('darkturquoise')}>darkturquoise</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'cadetblue', color: 'white'}} onClick={e=> changeColor('cadetblue')}>cadetblue</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'teal', color: 'white'}} onClick={e=> changeColor('teal')}>teal</Button>
            <div>Blue colors</div>
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
            <div>Purple colors</div>
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
            <div>Pink colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'pink'}} onClick={e=> changeColor('pink')}>pink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'hotpink'}} onClick={e=> changeColor('hotpink')}>hotpink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'deeppink'}} onClick={e=> changeColor('deeppink')}>deeppink</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'palevioletred'}} onClick={e=> changeColor('palevioletred')}>orchid</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'mediumvioletred'}} onClick={e=> changeColor('mediumvioletred')}>mediumvioletred</Button>
            <div>White colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'white'}} onClick={e=> changeColor('white')}>white</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'honeydew'}} onClick={e=> changeColor('honeydew')}>honeydew</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'ghostwhite'}} onClick={e=> changeColor('ghostwhite')}>ghostwhite</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'beige'}} onClick={e=> changeColor('beige')}>beige</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'linen'}} onClick={e=> changeColor('linen')}>linen</Button>
            <div>Gray colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'lightgray'}} onClick={e=> changeColor('lightgray')}>lightgray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'silver'}} onClick={e=> changeColor('silver')}>silver</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'gray', color: 'white'}} onClick={e=> changeColor('gray')}>gray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'dimgray', color: 'white'}} onClick={e=> changeColor('dimgray')}>dimgray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'slategray', color: 'white'}} onClick={e=> changeColor('slategray')}>slategray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'darkslategray', color: 'white'}} onClick={e=> changeColor('darkslategray')}>darkslategray</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'black', color: 'white'}} onClick={e=> changeColor('black')}>black</Button>
            <div>Brown colors</div>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'brown', color: 'white'}} onClick={e=> changeColor('brown')}>brown</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'wheat'}} onClick={e=> changeColor('wheat')}>wheat</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'burlywood'}} onClick={e=> changeColor('burlywood')}>burlywood</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'sandybrown'}} onClick={e=> changeColor('sandybrown')}>sandybrown</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'goldenrod'}} onClick={e=> changeColor('goldenrod')}>goldenrod</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'chocolate'}} onClick={e=> changeColor('chocolate')}>chocolate</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'sienna', color: 'white'}} onClick={e=> changeColor('sienna')}>sienna</Button>
            <Button className={classes.colors} variant="contained" style={{backgroundColor: 'maroon', color: 'white'}} onClick={e=> changeColor('maroon')}>maroon</Button>
        </div>
    );
    const [buttonsGroup, setButtonsGroup] = useState(textGroup);
    const handleTabChange = (event, newValue) => {
        if(newValue === 0) {
            setButtonsGroup(textGroup);
        } else {
            setButtonsGroup(colorGroup);
        }
        setTebValue(newValue);
        console.log(`tab value: ${tabValue}`);
    };


  return (
    <React.Fragment>
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography style={{fontFamily: "'Lato', sans-serif"}} component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Welcome to our Mighty editor!
                </Typography>
            </Container>
        </div>
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab className={classes.tab} label="Text" />
                    <Tab className={classes.tab} label="Color" />
                    <Tab className={classes.tab} label="Background color" />
                </Tabs>
                {buttonsGroup}
            </Paper>
            <div style={sentenceStyle}>
                {sentenceStyle.sentenceBody}
            </div>
        </Container>
        <div className={classes.finish}>
        {writer && 
                <Button
                    onClick={saveSentenveClicked}
                    variant="contained"
                    color="secondary"
                    className={classes.finishButton}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload now
                </Button>}
            <Button
                onClick={buySentenveClicked}
                variant="contained"
                color="secondary"
                className={classes.finishButton}
                startIcon={<AddShoppingCartIcon />}
            >
                Buy now
            </Button>
        </div>
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="warning">
                You have to be logged in before making such action!
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

    </React.Fragment>
  );
};





  

    
  


