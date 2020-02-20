import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LoggedInUserContext from '../loggedInUserContext';
import App from '../App';
import theme from '../Theme';

import MainView from '../Components/MainViewPage/MainView';
import Catalog from '../Components/CatalogPage/Catalog';
import Editor from '../Components/SentenceEditor/Editor';
import MyOrders from '../Components/UsersPages/MyOrders';
import MySentences from '../Components/UsersPages/MySentences';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const InspirgramRouter = ({}) => {
    return <BrowserRouter basename='/'>
        <MuiThemeProvider theme={theme}>
            <App>
                <Header />
                <Route exact path="/" component={MainView} />
                <Route exact path="/Catalog" component={Catalog}/>
                <Route exact path="/Editor" component={Editor}/>
                <Route exact path="/MyOrders" component={MyOrders}/>
                <Route exact path="/MySentences" component={MySentences}/>
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