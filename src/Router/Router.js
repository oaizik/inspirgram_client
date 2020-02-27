import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from '../App';
import theme from '../Theme';

import MainView from '../Components/MainViewPage/MainView';
import Catalog from '../Components/CatalogPage/Catalog';
import Editor from '../Components/SentenceEditor/Editor';
import MyOrders from '../Components/UsersPages/MyOrders';
import MySentences from '../Components/UsersPages/MySentences';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const InspirgramRouter = () => {
    return <BrowserRouter basename='/'>
        <MuiThemeProvider theme={theme}>
            <App>
                <Header />
                <Route exact path="/" component={MainView} />
                <Route exact path="/Catalog" component={Catalog}/>
                <Route exact path="/Editor" component={Editor}/>
                <Route path="/paypal/success" component={Editor}/>
                <Route exact path="/MyOrders" component={MyOrders}/>
                <Route exact path="/MySentences" component={MySentences}/>
                <Redirect to="/" />
                <Footer />
            </App>
        </MuiThemeProvider>
    </BrowserRouter>;
}

export default InspirgramRouter;

