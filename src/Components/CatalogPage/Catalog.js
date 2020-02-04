import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, makeStyles, Container } from '@material-ui/core';

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

const cards = [1, 2, 3]; 

export default function Catalog() {
    const classes = useStyles();

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
                                  <CardContent className={classes.cardContent}>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Buy Button
                                      </Typography>
                                      <Typography>
                                          This we need to replace in a <b>shopify buy button</b>.
                                          the buy button only available after you join sto one of the hopify plans.
                                      </Typography>
                                  </CardContent>
                                  <CardActions>
                                      <Button size="small" color="primary">
                                          buy now
                                      </Button>
                                      <Button size="small" color="primary">
                                          Add to cart
                                      </Button>
                                  </CardActions>
                              </Card>
                          </Grid>
                      ))}
                  </Grid>
              </Container>
        </React.Fragment>
    );
}

