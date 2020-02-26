import React from 'react';
import { Typography, makeStyles, Container } from '@material-ui/core';
import Sentences from './Sentences';


const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));


export default function Catalog() {
    const classes = useStyles();
    // const [like, setLike] = useState(true);

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
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type spe
                    </Typography>
                </Container>
            </div>
            <div>
                <hr />
                <Sentences />
            </div>
        </div>
    );
}

