import React, { useState } from 'react';
import {IconButton, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';


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
}));

const cards = [1, 2, 3, 4, 5]; 

export default function Catalog() {
    const classes = useStyles();
    const [like, setLike] = useState(true);

    return (
        <React.Fragment>
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
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map(card => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardActions style={{display: 'flex', justifyContent: 'space-between',}}>
                                    {/* that icon should the sentence content to user liked list [if we decide to make that list] */}
                                    <IconButton color="primary" aria-label="add to shopping cart" onClick={e=> setLike(!like)}>
                                        {like ? (
                                            <FavoriteBorderTwoToneIcon style={{ color: 'red' }}/>
                                        ) : (
                                            <FavoriteBorderTwoToneIcon style={{ color: 'green' }}/>
                                        )}
                                    </IconButton>
                                    {/* that icon should move to editor page with the sentence content */}
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    {/* that icon should move to sentence content to the user cart */}
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

