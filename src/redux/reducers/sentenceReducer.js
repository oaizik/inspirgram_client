import { FETCH_SENTENCES, NEW_SENTENCE } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SENTENCES:
      return {
        ...state,
        items: action.payload
      };
    case NEW_SENTENCE:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}