import { Component } from 'react';
import fire from '../../fire';

class MessageRepository extends Component {
    static MESSAGE_TABLE = 'messages';
    static CHILD_ADDED = 'child_added';

    static subscribeToMessages(limitToLast) {
        return fire.database().ref(MessageRepository.MESSAGE_TABLE).orderByKey().limitToLast(limitToLast);
    }

    static saveMessage(message) {
        fire.database().ref(MessageRepository.MESSAGE_TABLE).push( message );
    }
}

export default MessageRepository;