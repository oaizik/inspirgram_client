import React from 'react';
import { Typography, makeStyles, Container } from '@material-ui/core';
import Sentences from './Sentences';
import {config, useSpring, animated} from 'react-spring';

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));


export default function Catalog() {
    const classes = useStyles();

    const [leftSpring, setLeftSpring] = useSpring(()=>({
        from: { opacity: 0,
            transform: 'translate3d(0px, -1000px, 0px)'},
        to: {   opacity: 1,
            transform: 'translate3d(0px,0px,0px)'},
        delay: 500,
        config: config.wobbly
    }));   
    const [hrSpring, setHrSpring] = useSpring(()=>({
        from: { opacity: 0,
            transform: 'translate3d(0px, -1000px, 0px)'},
        to: {   opacity: 1,
            transform: 'translate3d(0px,0px,0px)'},
        delay: 1000,
        config: config.wobbly
    }));   

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Our Products
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        our product are very good and helpful and you really want to buy them,
                        is simply dummy text of the printing and typesetting industry. 
                    </Typography>
                </Container>
            </div>
            
            <animated.div style={hrSpring}>
                <hr />
            </animated.div>
            <animated.div style={leftSpring}>
                <Sentences />
            </animated.div>
        </div>
    );
}

