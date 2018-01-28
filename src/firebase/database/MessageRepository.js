import { Component } from 'react';
import fire from '../../fire';
import Message from './Message';

class MessageRepository extends Component {
    static MESSAGE_TABLE = 'messages';
    static CHILD_ADDED = 'child_added';
    static VALUE = 'value';

    static subscribeToMessages(limitToLast, callback) {
        return fire.database()
            .ref(MessageRepository.MESSAGE_TABLE)
            .orderByKey()
            .limitToLast(limitToLast)
            .on(MessageRepository.CHILD_ADDED, snapshot => callback(snapshot));
    }

    static fetchAllMessages(limit) {
        return fire.database()
            .ref(MessageRepository.MESSAGE_TABLE)
            .limitToLast(limit)
            .once(MessageRepository.VALUE)
            .then( snapshot => {
                let messagesArray = [];
                Object.keys(snapshot.val()).forEach(key => {
                    let message = new Message(key, snapshot.val()[key]);
                    messagesArray = [message].concat(messagesArray);
                });
                return messagesArray;
            })
    }

    static saveMessage(message) {
        fire.database().ref(MessageRepository.MESSAGE_TABLE).push( message );
    }
}

export default MessageRepository;