// @flow
import React, {Component} from 'react';
import ImageRepository from '../firebase/fileStorage/ImageRepository'
import Dropzone from 'react-dropzone';
import BannerMessage from "../common/BannerMessage";
import FileWithPreview from "../common/FileWithPreview";
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

type Props = {};
type State = {
    files: Array<FileWithPreview>,
    errorMessage: ?string
};

const cardWidth = 300;
const style = {
    card: {
        maxWidth: cardWidth
    },
    cardMedia: {
        maxHeight: 300,
        maxWidth: cardWidth,
        height: 'auto',
        width: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class ImageUpload extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            files: [],
            errorMessage: null,
        };

    }

    onDrop = (acceptedFiles: Array<File>, rejectedFiles: Array<File>): void => {
        let errorMessage: ?string = rejectedFiles.length > 0 ?
            "Not all images could be added to the page" :
            null;

        acceptedFiles.forEach(file => this.processFilePreview(file));

        this.setState({
            errorMessage: errorMessage
        })
    };

    processFilePreview(newFile: File): void {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = () => {
            this.setState((previousState) => {
                return {
                    files: [new FileWithPreview(newFile, fileReader.result)].concat(previousState.files)
                };
            })
        };
        fileReader.readAsDataURL(newFile);
    }

    renderErrorMessage(): void {
        if (this.state.errorMessage !== null) {
            return BannerMessage.errorBanner(
                this.state.errorMessage,
                () => {
                    this.setState({errorMessage: null})
                });
        }
    }

    renderImage(fileWithPreview: FileWithPreview) {
        return (
            <img
                key={fileWithPreview.getFile().name}
                src={fileWithPreview.getPreview()}
                style={style.cardMedia}
            />
        )
    }

    renderCardImage(fileWithPreview: FileWithPreview) {
        return (
            <Card
                key={fileWithPreview.getFile().name}
                style={style.card}
            >
                {this.renderImage(fileWithPreview)}
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Lizard
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>
        )
    }


    render() {
        const hasFiles: boolean = this.state.files.length > 0;
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
                {this.state.files.map(f => this.renderCardImage(f))}
                {this.renderErrorMessage()}
            </div>
        );
    }
}

export default ImageUpload;