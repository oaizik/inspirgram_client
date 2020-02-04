import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LoggedInUserContext from '../loggedInUserContext';
import App from '../App';
import theme from '../Theme';

import MainView from '../Components/MainViewPage/MainView';
import Catalog from '../Components/CatalogPage/Catalog';
import Editor from '../Components/SentenceEditor/Editor';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <LoggedInUserContext.Consumer>
//         {context => ( 
//             <Route {...rest} render={props =>
//                 context.user_id ? (
//                     <Component {...props} />
//                 ) : (<LoginView {...props} />) }
//         />)}
//     </LoggedInUserContext.Consumer>
// );

const InspirgramRouter = ({}) => {
    return <BrowserRouter basename='/'>
        <MuiThemeProvider theme={theme}>
            <App>
                <Header />
                <Route exact path="/" component={MainView} />
                <Route exact path="/Catalog" component={Catalog}/>
                <Route exact path="/Editor" component={Editor}/>
                <Footer />
            </App>
        </MuiThemeProvider>
    </BrowserRouter>;
}

export default InspirgramRouter;

// const ReactRouter = () => {
//     return (
//         <React.Fragment>
//             <Header />
//             <Route exact path="/" component={MainView}/>
//             <Route path="/Catalog" component={Catalog}/>
//             <Footer />
//         </React.Fragment>
//     )
// }
// export default ReactRouter;