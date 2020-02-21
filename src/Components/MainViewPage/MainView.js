import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';

import { connect } from 'react-redux';
import { fetchSentences } from '../../redux/actions/sentenceActions';
import store from '../../redux/store';

const useStyles = makeStyles(theme => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const mainFeaturedPost = {
    title: 'Here we tell about inspirgram idea',
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: 'https://images.unsplash.com/photo-1579065560489-989b0cc394ce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    imgText: 'main image description',
};

const featuredPosts = [
    {
        title: 'Inspirgram Shop',
        description:
            'Here we tell about our shop. as Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut.',
        image: 'https://images.unsplash.com/photo-1580639006571-11f5da1d1731?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        imageText: 'Image Text',
    },
    {
        title: 'Inspirgram Creativity',
        date: '',
        description:
            'Here we tell about our content. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut.',
        image: 'https://images.unsplash.com/photo-1579805876343-8b915fa600c7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        imageText: 'Image Text',
    },
];

const MainView = props => {
    const classes = useStyles();

    useEffect(() => { 
        props.fetchSentences();
        const state = store.getState();
        if(Object.keys(state.sentences.item).length !== 0) {
            this.props.sentences.unshift(state.sentences.item);
        };
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map(post => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Main />
                    </Grid>
                </main>
            </Container>
        </React.Fragment>
    );
};
const mapStateToProps = state => ({
    sentences: state.sentences.items,
});
export default connect(mapStateToProps, { fetchSentences })(MainView);