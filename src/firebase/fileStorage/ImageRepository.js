import React, { Component } from 'react';
import fire from '../../fire';


class ImageRepository extends Component {

    static MAX_FILE_SIZE = 5242880; //5MB
    static ACCEPTED_FILE_TYPES = "image/jpeg, image/png";

    static saveImage() {
        var storageRef = fire.storage().ref();
        var ref = storageRef.child("image1.jpg");
        var message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
        ref.putString(message, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!');
            console.log(snapshot);
        });

    }
}

export default ImageRepository;