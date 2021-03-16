import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from '../Components/Nav/Nav';
import Home from '../pages/Home/Home';
import Bridge from '../pages/Bridge/Bridge';
import Page1 from '../pages/Page1/Page1';



const getRouter = () => (
    <Router>
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/bridge" component={Bridge}/>
                <Route path="/page1" component={Page1}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;