// @flow
class FileWithPreview {
    file: File;
    preview: string | ArrayBuffer;

    constructor(file: File, preview: string | ArrayBuffer) {
        this.file = file;
        this.preview = preview;
    }

    getFile = (): File => this.file;
    getPreview = ():string | ArrayBuffer => this.preview;
}

export default FileWithPreview;