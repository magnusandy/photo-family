// @flow
import fire from '../../fire';
import Message from './Message';
import type { DataSnapshot } from 'firebase/database';

class MessageRepository {
    static MESSAGE_TABLE = 'messages';
    static CHILD_ADDED = 'child_added';
    static VALUE = 'value';

    mapSnapshotToMessage = (snapshot: DataSnapshot): Message => {
        if (snapshot.key) {
            return new Message(snapshot.key, snapshot.val());
        } else {
            throw new Error("WARNING Data snapshot does not have a key.");
        }
    };

    subscribeToMessages(limitToLast: number, callback: (message: Message) => void): void {
        return fire.database()
            .ref(MessageRepository.MESSAGE_TABLE)
            .orderByKey()
            .limitToLast(limitToLast)
            .on(MessageRepository.CHILD_ADDED, snapshot => callback(this.mapSnapshotToMessage(snapshot)));
    }

    fetchAllMessages(limit: number): Array<Message> {
        return fire.database()
            .ref(MessageRepository.MESSAGE_TABLE)
            .limitToLast(limit)
            .once(MessageRepository.VALUE)
            .then(snapshot => {
                let messagesArray = [];
                Object.keys(snapshot.val()).forEach(key => {
                    let message = new Message(key, snapshot.val()[key]);
                    messagesArray = [message].concat(messagesArray);
                });
                return messagesArray;
            })
    }

    saveMessage(message: string): void {
        fire.database().ref(MessageRepository.MESSAGE_TABLE).push(message);
    }
}

export default MessageRepository;