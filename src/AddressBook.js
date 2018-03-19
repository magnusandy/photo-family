// @flow
import React, {Component} from 'react';
import MessageRepository from './firebase/database/MessageRepository';
import Message from "./firebase/database/Message";

type Props = {};
type State = { messages: Array<Message> };

class AddressBook extends Component<Props, State> {
    messageRepository: MessageRepository;
    state: State;
    inputEl: ?
        HTMLInputElement;

    constructor(props: Props): void {
        super(props);
        this.messageRepository = new MessageRepository();
        this.state = {messages: []};
    }

    subscribeAction = (message: Message): void => {
        this.setState({messages: [message].concat(this.state.messages)});
    };

    addAllMessages = (messageList: Array<Message>): void => {
        this.setState({messages: messageList})
    };

    componentWillMount(): void {
        this.messageRepository.subscribeToMessages(5, this.subscribeAction);
    }

    addMessage(e: Event): void {
        e.preventDefault();
        if (this.inputEl) {
            let messageToSave = this.inputEl.value;
            this.inputEl.value = '';
            this.messageRepository.saveMessage(messageToSave);
        }
    }

    render() {
        return (
            <form onSubmit={this.addMessage.bind(this)}>
                <input type="text" ref={el => this.inputEl = el}/>
                <input type="submit"/>
                <ul>
                    {/* Render the list of messages */
                        this.state.messages.map(message => <li key={message.getId()}>{message.getText()}</li>)
                    }
                </ul>
            </form>
        );
    }
}

export default AddressBook;