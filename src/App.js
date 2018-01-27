import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Template from './Template';
import AddressBook from './AddressBook';
import './App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Template}/>
                <Route path='/address-book' component={AddressBook}/>
            </Switch>
        );
    }
}

export default App;
