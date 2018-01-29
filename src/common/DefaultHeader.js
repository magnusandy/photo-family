import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu';
import {withTheme} from 'material-ui/styles';
import icon from '../images/photo-family.png';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import {ROOT, MESSAGER, IMAGE_UPLOAD} from './Routes';


const MAIN_MENU_CLASS = 'main-menu';
const styles = {
    root: {
        width: '100%',
    },
    icon : {
        maxWidth:'40px',
        maxHeight:'40px',
        marginRight: "25px"
    },
    title: {
        flex: 1,
    },
    menuButton : {
        float: 'right',
    }
};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuAnchor: null,
        }
    }

    menuClicked = event => {
        this.setState({ menuAnchor: event.currentTarget });
    };

    menuClosed = () => {
        this.setState({menuAnchor: null});
    };

    render(){
        const {menuAnchor} = this.state;
        return (
            <div styles={styles.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            component={props => <Link to="/" {...props}/>}
                        >
                            <img src={icon} style={styles.icon}></img>
                        </IconButton>
                        <Typography style={styles.title} type="title" color="inherit">
                                Photo Family
                        </Typography>
                        <IconButton
                            style={styles.menuButton}
                            color="inherit"
                            aria-owns={menuAnchor ? MAIN_MENU_CLASS : null}
                            aria-haspopup="true"
                            onClick={this.menuClicked}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id={MAIN_MENU_CLASS}
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={this.menuClosed}
                        >
                            <MenuItem onClick={this.menuClosed} component={props => <Link to={ROOT} {...props}/>}>
                                Home
                            </MenuItem>
                            <MenuItem  onClick={this.menuClosed} component={props => <Link to={MESSAGER}{...props}/>}>
                                Messager
                            </MenuItem>
                            <MenuItem  onClick={this.menuClosed} component={props => <Link to={IMAGE_UPLOAD} {...props}/>}>
                                Upload Images
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

DefaultHeader.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(DefaultHeader);
