import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

const style = {
    error: {
        button: {
            backgroundColor: 'red'
        },
        text: {
            color:'red'
        }

    },
    success: {
        button: {
            backgroundColor: 'green'
        },
        text: {
            color:'green'
        }
    }
};

class BannerMessage extends Component {

    static ACCEPTED_TYPES = ['success', 'error'];
    static errorBanner = (message) =>  {
        return (
        <BannerMessage
            message={message}
            type='error'
        /> )
    };
    static successBanner = (message) =>  {
        return (
            <BannerMessage
                message={message}
                type='success'
            /> )
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    getStyle(type) {
        if(BannerMessage.ACCEPTED_TYPES.includes(type)) {
            return style[type]
        } else {
            console.log(type+" not a recognized banner type");
        }
    }

    dismissButton(typeStyle) {
        return (
                <Button
                    style={typeStyle.button}
                    onClick={this.handleClose}
                >
                    Dismiss
                </Button>
        )
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        var typeStyle = this.getStyle(this.props.type);
        return (
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={this.state.open}
                    onClose={this.handleClose}
                    message={<span style={typeStyle.text}>{this.props.message}</span>}
                    action={this.dismissButton(typeStyle)}
                />
        )
    }
}

BannerMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

};


export default BannerMessage;