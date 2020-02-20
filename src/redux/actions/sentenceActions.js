import { FETCH_SENTENCES, NEW_SENTENCE } from './types';

export const fetchSentences = () => dispatch => {
    fetch('https://inspirgram.herokuapp.com/sentences')
        .then(res => res.json())
        .then(sentences =>
            dispatch({
                type: FETCH_SENTENCES,
                payload: sentences.data
            })
    );
};

export const createSentence = sentenceData => ({
    //  need to insert sentense data to the db 

    type: NEW_SENTENCE,
    payload: sentenceData
});
    
