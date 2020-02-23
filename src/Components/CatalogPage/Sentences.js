import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';
import { connect } from 'react-redux';
import { fetchSentences } from '../../redux/actions/sentenceActions';
import './sentences.css';
import store from '../../redux/store';

class Sentences extends Component {

    componentDidMount() {
        const state = store.getState();
        if(state.sentences.items.length === 0) {
            this.props.fetchSentences();
        }
    };

    likeClicked(sentenceId) {
        console.log(`${sentenceId}`);
    };

    buyClicked(sentenceId) {
        //  @@@@@@@@@@@@@ API CALL @@@@@@@@@@@@@@@
        //  need to make order of sentence id to the client
        console.log(`${sentenceId}`);
    };
    


    
    render() {
        const sentenceItems = this.props.sentences.map(sentence => (
            <div key={sentence.sentenceId} style={{margin: '10px', height: '250px', width: '300px', backgroundColor: sentence.style.backgroundColor,}}>
                <div style={{height: '205px', fontSize: '18px', display: 'flex', color: sentence.style.textColor, fontFamily: sentence.style.fontFamily, fontWeight: sentence.style.fontWeight, fontStyle: sentence.style.fontStyle, textDecoration: sentence.style.textDecoration, textAlign: sentence.style.textAlign, alignItems: sentence.style.alignItems }}>{sentence.sentenceBody}</div>
                <div className="iconsdiv" style={{height: '45px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',}}>
                    <Tooltip title="like" aria-label="like" >
                        <IconButton aria-label="add to shopping cart" onClick={() => this.likeClicked(sentence.sentenceId)}>
                            <FavoriteBorderTwoToneIcon style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="edit" aria-label="edit" >
                        <NavLink to = {{
                            pathname:'/Editor',
                            params: sentence.sentenceId}}
                        >
                            <EditOutlinedIcon style={{ color: 'gray', marginTop: '10px' }} />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="buy now" aria-label="buy now" >
                        <IconButton aria-label="add to shopping cart" onClick={() => this.buyClicked(sentence.sentenceId)} >
                            <AddShoppingCartIcon style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        ));
            return (
                <div className="sentencescontainer" >
                    {sentenceItems}
                </div>
        );
    }
}

const mapStateToProps = state => ({
    sentences: state.sentences.items,
    newSentence: state.sentences.item
});

export default connect(mapStateToProps, { fetchSentences })(Sentences);


// const Posts = props => {

//     useEffect( () => {
//         props.fetchPosts();
//         console.log('first');
//     }, [props.count]);
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.newPost) {
    //         this.props.posts.unshift(nextProps.newPost);
    //     }
    // }
//     const postItems = props.posts.map(post => (
//         <div key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>
//         </div>
//     ));
        
//     return (
//         <div>
//             <h1>Posts</h1>
//             {postItems}
//         </div>
//     );
// };

// const mapStateToProps = state => ({
//     posts: state.posts.items,
//     newPost: state.posts.item
// });

// export default connect(mapStateToProps, { fetchPosts })(Posts);