
class Message {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    getId = () => this.id;
    getText = () => this.text;
}

export default Message;