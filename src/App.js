import React from 'react';
import LoggedInUserContext from  './loggedInUserContext';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user_id: localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')).id : undefined,
            update: async (user_id) => {
                this.setState(state => Object.assign({}, state, { user_id }));
            }           
        }
    }
    // componentDidUpdate(prevProps) {
        // if (prevProps.location && this.props.location !== prevProps.location) {
        //     this.state.updateLastURL(prevProps.location);
        // }
    // }
    async componentDidMount() {
        try {
            let currentUser = JSON.parse(localStorage.getItem('current_user'));
            if (currentUser) {
                await this.state.update(currentUser.id);
                document.cookie=`access_token=${localStorage.getItem('access_token')}`;
            }
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return <LoggedInUserContext.Provider value={this.state}>
            {this.props.children}
        </LoggedInUserContext.Provider>
    }
}

export default withRouter(App);
