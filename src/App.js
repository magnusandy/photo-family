import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Template from './Template';
import AddressBook from './AddressBook';
import ImageUpload from './imageUpload/ImageUpload'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import green from 'material-ui/colors/green';
import {ROOT, MESSAGER, IMAGE_UPLOAD} from './common/Routes';
import DefaultHeader from './common/DefaultHeader';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: green,
    },
    status: {
        danger: 'red',
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <DefaultHeader/>
                <Switch>
                    <Route exact path={ROOT} component={Template}/>
                    <Route path={MESSAGER} component={AddressBook}/>
                    <Route path={IMAGE_UPLOAD} component={ImageUpload}/>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default App;
