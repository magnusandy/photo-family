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
    }

    addAllMessages(snapshotValue) {
        let messages = [];
        Object.keys(snapshotValue).forEach(key => {
            let message = { text: snapshotValue[key], id: key };
            messages = [message].concat(messages);
        });
        this.setState({ messages: messages });
    }

    componentWillMount(){
        MessageRepository.subscribeToMessages(4, this.subscribeAction);
        //MessageRepository.fetchAllMessages(100)
        //    .then(snapshot => this.addAllMessages(snapshot.val()));
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
                        this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
                    }
                </ul>
            </form>
        );
    }
}

export default AddressBook;