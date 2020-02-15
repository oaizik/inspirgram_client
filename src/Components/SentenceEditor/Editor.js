import React, { useState } from 'react';
import {TextField, Tab, Tabs, Paper, Button, Typography, makeStyles, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';

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
        fontFamily: "'Lato', sans-serif",
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        height: '60vh',
    },
    colorDiv: {
        width: '90%',
        margin: '2px auto',
        border: '1px solid',
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
}));

export default function Catalog() {
    const classes = useStyles();
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
    const changeTextColor = c => {
        setSentenceStyle({...sentenceStyle, color: c});
        console.log(`sentence color: ${c}`);
    };
    const changeBackgroundColor = c => {
        setSentenceStyle({...sentenceStyle, backgroundColor: c});
        console.log(`sentence color: ${c}`);
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
        //  need to add all the colors from table, and arrange according to primary color and gradiant
        <div className={classes.colorGroup}>
            <div>Red Colors:</div>
            <div style={{backgroundColor: 'lightsalmon'}} className={classes.colorDiv} onClick={e=> changeTextColor('lightsalmon')}>lightsalmon</div>
            <div style={{backgroundColor: 'salmon'}} className={classes.colorDiv} onClick={e=> changeTextColor('salmon')}>salmon</div>
            <div style={{backgroundColor: 'lightcoral'}} className={classes.colorDiv} onClick={e=> changeTextColor('lightcoral')}>lightcoral</div>
            <div style={{backgroundColor: 'indianred'}} className={classes.colorDiv} onClick={e=> changeTextColor('indianred')}>indianred</div>
            <div style={{backgroundColor: 'crimson'}} className={classes.colorDiv} onClick={e=> changeTextColor('crimson')}>crimson</div>
            <div style={{backgroundColor: 'firebrick'}} className={classes.colorDiv} onClick={e=> changeTextColor('firebrick')}>firebrick</div>
            <div style={{backgroundColor: 'red'}} className={classes.colorDiv} onClick={e=> changeTextColor('red')}>red</div>
            <div style={{backgroundColor: 'darkred'}} className={classes.colorDiv} onClick={e=> changeTextColor('darkred')}>darkred</div>
            <div style={{backgroundColor: 'orangered'}} className={classes.colorDiv} onClick={e=> changeTextColor('orangered')}>orangered</div>
            <div style={{backgroundColor: 'gold'}} className={classes.colorDiv} onClick={e=> changeTextColor('gold')}>gold</div>
            <div style={{backgroundColor: 'darkorange'}} className={classes.colorDiv} onClick={e=> changeTextColor('darkorange')}>darkorange</div> 
            <div style={{backgroundColor: 'lemonchiffon'}} className={classes.colorDiv} onClick={e=> changeTextColor('lemonchiffon')}>lemonchiffon</div>           
            <div style={{backgroundColor: 'lightgoldenrodyellow'}} className={classes.colorDiv} onClick={e=> changeTextColor('lightgoldenrodyellow')}>lightgoldenrodyellow</div>
            <div style={{backgroundColor: 'moccasin'}} className={classes.colorDiv} onClick={e=> changeTextColor('moccasin')}>moccasin</div>
            <div style={{backgroundColor: 'peachpuff'}} className={classes.colorDiv} onClick={e=> changeTextColor('peachpuff')}>peachpuff</div>
            <div style={{backgroundColor: 'palegoldenrod'}} className={classes.colorDiv} onClick={e=> changeTextColor('palegoldenrod')}>green</div>
            <div style={{backgroundColor: 'khaki'}} className={classes.colorDiv} onClick={e=> changeTextColor('khaki')}>khaki</div>
            <div style={{backgroundColor: 'yellow'}} className={classes.colorDiv} onClick={e=> changeTextColor('yellow')}>yellow</div>
            <div style={{backgroundColor: 'lawngreen'}} className={classes.colorDiv} onClick={e=> changeTextColor('lawngreen')}>lawngreen</div>
            <div style={{backgroundColor: 'limegreen'}} className={classes.colorDiv} onClick={e=> changeTextColor('limegreen')}>limegreen</div>
            <div style={{backgroundColor: 'lime'}} className={classes.colorDiv} onClick={e=> changeTextColor('lime')}>lime</div>
            <div style={{backgroundColor: 'green'}} className={classes.colorDiv} onClick={e=> changeTextColor('green')}>green</div>
            <div style={{backgroundColor: 'darkgreen'}} className={classes.colorDiv} onClick={e=> changeTextColor('darkgreen')}>darkgreen</div>
            <div style={{backgroundColor: 'yellowgreen'}} className={classes.colorDiv} onClick={e=> changeTextColor('yellowgreen')}>yellowgreen</div>
            <div style={{backgroundColor: 'white'}} className={classes.colorDiv} onClick={e=> changeTextColor('white')}>white</div>
            <div style={{backgroundColor: 'black'}} className={classes.colorDiv} onClick={e=> changeTextColor('black')}>black</div>
            <div style={{backgroundColor: 'gray'}} className={classes.colorDiv} onClick={e=> changeTextColor('gray')}>gray</div>
        </div>
    );
    const backgroundColorGroup = (
        //  need to add all the colors from table, and arrange according to primary color
        <div className={classes.colorGroup}>
            <div style={{backgroundColor: 'lightsalmon'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lightsalmon')}>lightsalmon</div>
            <div style={{backgroundColor: 'salmon'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('salmon')}>salmon</div>
            <div style={{backgroundColor: 'lightcoral'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lightcoral')}>lightcoral</div>
            <div style={{backgroundColor: 'indianred'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('indianred')}>indianred</div>
            <div style={{backgroundColor: 'crimson'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('crimson')}>crimson</div>
            <div style={{backgroundColor: 'firebrick'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('firebrick')}>firebrick</div>
            <div style={{backgroundColor: 'red'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('red')}>red</div>
            <div style={{backgroundColor: 'darkred'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('darkred')}>darkred</div>
            <div style={{backgroundColor: 'orangered'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('orangered')}>orangered</div>
            <div style={{backgroundColor: 'gold'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('gold')}>gold</div>
            <div style={{backgroundColor: 'darkorange'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('darkorange')}>darkorange</div> 
            <div style={{backgroundColor: 'lemonchiffon'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lemonchiffon')}>lemonchiffon</div>           
            <div style={{backgroundColor: 'lightgoldenrodyellow'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lightgoldenrodyellow')}>lightgoldenrodyellow</div>
            <div style={{backgroundColor: 'moccasin'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('moccasin')}>moccasin</div>
            <div style={{backgroundColor: 'peachpuff'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('peachpuff')}>peachpuff</div>
            <div style={{backgroundColor: 'palegoldenrod'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('palegoldenrod')}>green</div>
            <div style={{backgroundColor: 'khaki'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('khaki')}>khaki</div>
            <div style={{backgroundColor: 'yellow'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('yellow')}>yellow</div>
            <div style={{backgroundColor: 'lawngreen'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lawngreen')}>lawngreen</div>
            <div style={{backgroundColor: 'limegreen'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('limegreen')}>limegreen</div>
            <div style={{backgroundColor: 'lime'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('lime')}>lime</div>
            <div style={{backgroundColor: 'green'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('green')}>green</div>
            <div style={{backgroundColor: 'darkgreen'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('darkgreen')}>darkgreen</div>
            <div style={{backgroundColor: 'yellowgreen'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('yellowgreen')}>yellowgreen</div>
            <div style={{backgroundColor: 'white'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('white')}>white</div>
            <div style={{backgroundColor: 'black'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('black')}>black</div>
            <div style={{backgroundColor: 'gray'}} className={classes.colorDiv} onClick={e=> changeBackgroundColor('gray')}>gray</div>
        </div>
    );
    const [buttonsGroup, setButtonsGroup] = useState(textGroup);
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        if(newValue === 0) {
            setButtonsGroup(textGroup);
        } else if(newValue === 1) {
            setButtonsGroup(colorGroup);
        } else {
            setButtonsGroup(backgroundColorGroup);
        }
        setValue(newValue);
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
                    value={value}
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





  

    
  


