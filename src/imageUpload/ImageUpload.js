import React, {Component} from 'react';
import ImageRepository from '../firebase/fileStorage/ImageRepository'
import Dropzone from 'react-dropzone';
import BannerMessage from "../common/BannerMessage";

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            errorMessage: null,
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        var errorMessage = null;
        if (rejectedFiles.length > 0) {
            errorMessage = "Not all images could be added to the page";
        }
        ;
        this.setState({
            files: acceptedFiles.concat(this.state.files),
            errorMessage: errorMessage
        })
    };

    renderErrorMessage() {
        if (this.state.errorMessage !== null) {
            return BannerMessage.errorBanner(this.state.errorMessage);
        }
    }


    render() {
        var hasFiles = this.state.files.length > 0;
        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop}
                    accept={ImageRepository.ACCEPTED_FILE_TYPES}
                    maxSize={ImageRepository.MAX_FILE_SIZE}
                >
                    <h2>
                        {hasFiles ?
                            "Click or drag to upload more files" :
                            "Click or drag to upload files"
                        }
                    </h2>
                </Dropzone>
                <ul>
                    {this.state.files.map(file => <img key={file.name} src={file.preview}/>)}
                    {this.state.files.map(file => <li key={file.name}>{file.name}</li>)}
                </ul>
                {this.renderErrorMessage()}
            </div>
        );
    }
}

export default ImageUpload;