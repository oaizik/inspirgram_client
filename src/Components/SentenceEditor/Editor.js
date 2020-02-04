import React, { useState } from 'react';
import {ButtonGroup, Button, Typography, makeStyles, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, FormControl, Select } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '70%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '4vh',
        '& > *': {
            margin: theme.spacing(1),
            color: 'red',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
}));

export default function Catalog() {
    const classes = useStyles();
    //  sentence state
    const [openFontSize, setOpenFontSize] = useState(false);
    const [textSize, setTextSize] = useState('');
    const [openTextAlign, setOpenTextAlign] = useState(false);
    const [textAlign, setTextAlign] = useState('');
    const [sentenceStyle, setSentenceStyle] = useState({
        color: 'rgba(255,0,255,0.3)',
        backgroundColor: 'rgba(192,192,192,0.3)',
        fontFamily: 'Impact, Charcoal, sans-serif',
        fontSize: '30px',       
        textAlign: 'left',    //  left, right, justify
        alignItems: 'center',   //    start, end
        sentenceBody: 'Im a testing sentence! Lets see how its gona work...',
        //
        border: '1px solid',
        borderRadius: '20px',
        height: '60vh',
        display: 'flex',
    });
    //  dialog box state
    const ChangeTextSize = e => {
        setTextSize(Number(e) || '');
        console.log(`font size: |${e}px|`);
        setSentenceStyle({...sentenceStyle, fontSize: `${e}px`});
        console.log(`sentence style font size: ${sentenceStyle.fontSize}`);
    };
    const ChangeTextAlign = e => {
        setTextAlign(Number(e) || '');
        console.log(`text align: ${e}`);
        setSentenceStyle({...sentenceStyle, textAlign: `${e}`});
        console.log(`sentence style text align: ${sentenceStyle.textAlign}`);
    };
    const handleFontSizeClickOpen = () => {
        setOpenFontSize(true);
    };
    const handleFontSizeClickClose = () => {
        setOpenFontSize(false);
    };
    const handleTextAlignClickOpen = () => {
        setOpenTextAlign(true);
    };
    const handleTextAlignClickClose = () => {
        setOpenTextAlign(false);
    };



  return (
    <React.Fragment>
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Our Mighty Editor
                </Typography>
            </Container>
        </div>
        <Container maxWidth="sm" style={sentenceStyle}>
            {sentenceStyle.sentenceBody}
        </Container>

        {/* editor buttons */}
        <div className={classes.buttonGroup}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={handleTextAlignClickOpen}>Change text horizonal alingment</Button>
                <Button onClick={handleFontSizeClickOpen}>Change text size</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </div>
        {/* editor buttons */}

        {/* change Font Size section */}
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={openFontSize} onClose={handleFontSizeClickClose}>
            <DialogTitle>select Text Size</DialogTitle>
            <DialogContent>
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label">{sentenceStyle.fontSize}</InputLabel>
                    <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={textSize} onChange={e=> ChangeTextSize(e.target.value)} input={<Input />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={18}>18 px</MenuItem>
                        <MenuItem value={20}>20 px</MenuItem>
                        <MenuItem value={24}>24 px</MenuItem>
                        <MenuItem value={30}>30 px</MenuItem>
                        <MenuItem value={38}>38 px</MenuItem>
                        <MenuItem value={40}>40 px</MenuItem>
                    </Select>
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleFontSizeClickClose} color="primary">
                Ok
            </Button>
            </DialogActions>
        </Dialog>
        </div>
        {/* change Font Size section */}
        {/* change Text Alignment section */}
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={openTextAlign} onClose={handleTextAlignClickClose}>
            <DialogTitle>select Text Alignment</DialogTitle>
            <DialogContent>
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label">{sentenceStyle.textAlign}</InputLabel>
                    <Select labelId="demo-dialog-select-label" id="demo-dialog-select" value={textAlign} onChange={e=> ChangeTextAlign(e.target.value)} input={<Input />}>
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
            <Button onClick={handleTextAlignClickClose} color="primary">
                Ok
            </Button>
            </DialogActions>
        </Dialog>
        </div>
        {/* change Text Alignment section */}

    </React.Fragment>
  );
}



    
  


