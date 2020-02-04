import React from 'react';


const LoggedInUserContext = React.createContext({
    user: {},
    update: async(userId) => {},
});

export default LoggedInUserContext;
