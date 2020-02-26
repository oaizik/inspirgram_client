import { FETCH_SENTENCES, NEW_SENTENCE } from './types';

export const fetchSentences = () => dispatch => {
    fetch('http://localhost:5000/sentences')
        .then(res => res.json())
        .then(sentences =>
            dispatch({
                type: FETCH_SENTENCES,
                payload: sentences.data
            })
    );
};

export const createSentence = sentenceData => ({
    type: NEW_SENTENCE,
    payload: sentenceData
});
    
