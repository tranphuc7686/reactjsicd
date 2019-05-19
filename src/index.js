import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Visit from './Visit';
import Diagnose from './Diagnose';
import TestLab from './TestLab';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Login from './Login';
import Patient from './Patient';


ReactDOM.render(
<Router>
  <Switch>
    <Route path="/" exact render={()=><App subreddit="patients"/>}></Route>
    <Route path="/login"   component={Login}></Route>
    <Route path="/patient"   component={Patient}></Route>
    <Route path="/hisvisit/:id"   component={Visit}></Route>
    <Route path="/diagnose/:id"  component={Diagnose}></Route>
    <Route path="/testlab/:id"  component={TestLab}></Route>
    <Route component={NotFound}></Route>

  </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
