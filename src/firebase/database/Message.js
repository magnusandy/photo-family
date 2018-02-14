// @flow
class Message {
    id: string;
    text: string;

    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }

    getId = (): string => this.id;
    getText = ():string => this.text;
}

export default Message;