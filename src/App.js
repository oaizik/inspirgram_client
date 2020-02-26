import React from 'react';
import { withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


class App extends React.Component {

    render() {
        return <Provider store={store}>
            {this.props.children}
        </Provider>
    }
}

export default withRouter(App);
