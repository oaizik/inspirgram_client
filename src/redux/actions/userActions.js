import { CREATE_USER } from './types';


export const createUser = userData => ({
    type: CREATE_USER,
    payload: userData
});