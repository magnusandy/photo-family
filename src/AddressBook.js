import React, { Component } from 'react';
import MessageRepository from './firebase/database/MessageRepository';

class AddressBook extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }

    subscribeAction = (snapshot) => {
        /* Update React state when message is added at Firebase Database */
        let message = { text: snapshot.val(), id: snapshot.key };
        this.setState({ messages: [message].concat(this.state.messages) });
    };

    addAllMessages = (messageList) => {
       this.setState({messages: messageList})
    };

    componentWillMount(){
        MessageRepository.subscribeToMessages(4, this.subscribeAction);
    }

    addMessage(e){
        e.preventDefault();
        MessageRepository.saveMessage( this.inputEl.value );
        this.inputEl.value = ''; // <- clear the input
    }

    render() {
        return (
            <form onSubmit={this.addMessage.bind(this)}>
                <input type="text" ref={ el => this.inputEl = el }/>
                <input type="submit"/>
                <ul>
                    { /* Render the list of messages */
                        this.state.messages.map( message => <li key={message.getId()}>{message.getText()}</li> )
                    }
                </ul>
            </form>
        );
    }
}

export default AddressBook;