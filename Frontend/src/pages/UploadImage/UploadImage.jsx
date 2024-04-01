import './UploadImage.css'
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const userID = "65fe9fad430c49dc4448b967";

const uploadPhoto = async (userId, base64Image) => {
    try {
        // Create data object with base64Image
        const data = { photo: base64Image };

        // Send PATCH request with JSON data
        const response = await axios.patch(`${BACKEND_URL}/api/users/${userId}/photo`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
};

const UploadImage = () => {

    const [profileImage, setProfileImage] = useState("");

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setProfileImage(base64);
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    }


    return (
        <div className="Container_uploadimage">

            <p id="upload_word">Upload <span id="image_word">Image</span></p>

            <div className="upload_image">
                
                <p id="upload_image_words">Drop files here or
                
                <label htmlFor="file_input" id="browse_files_label" onClick={handleImageClick}>
                        <img id="upload_image_img" src="https://s3-alpha-sig.figma.com/img/4c7b/3206/901d9d23e6fd9f7c2225c9579378efc1?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g-UUAWDoYe~SGqbJwEBNyUzB3XtO7VY6CD5BsMLk38pWQwsbmCkcwhIx1ICCBVeGatFVHe1qP7vkS2bPnXVyKOWe8HYbnkGDkVgHLuTZIt0mnoDiCY1YQkh8sA9PZvk2hY8bwE1f-nB5vzPl~R3K8SdfTfV3z9Bt~rtKDxwpJSDI0MOKcSJxNz45R8cle1CmTTPNKiFfpY0AjOxfDelvTwObBybOS07S6gCOCfjbE3gy5x2YPgAWLKBCXBS83~y2kfz-goZ1fDJ736eYohRi6aLcIbroOvCiG3hHQSO7BEl7jGgkqHjtM~rcaHgPMuC3xTCGwHU3BaeKAolDkxC4DQ__" alt="Upload image"  />
                    </label>
                    

                    <input className="file_uploader" type="file" label="Image" name="myFile" id="file_input" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileChange(e)} />
                </p>
            </div>

            <button id="upload_button" onClick={() => uploadPhoto(userID, profileImage)}>Upload</button>

            <div className="footer_profile">
                <hr className="footer_hr"></hr>
                <a href="" className="twitter_hyper">
                    <img className="twitter_logo" src="https://th.bing.com/th/id/OIP.j1AtWp7O0KgfObVeVDdlvwHaHa?rs=1&pid=ImgDetMain"></img>
                </a>
                <a href="" className="insta_hyper">
                    <img className="insta_logo" src="https://th.bing.com/th/id/OIP.brtwvak9gTGJ9lRr84Tg0AAAAA?rs=1&pid=ImgDetMain"></img>
                </a>
                <a href="" className="facebook_hyper">
                    <img className="facebook_logo" src="https://th.bing.com/th/id/OIP._yvdUfBAoIKWlsNDyy9JVwHaHa?rs=1&pid=ImgDetMain"></img>
                </a>hh
                <img className="copyright_symbol" src="https://clipground.com/images/copyright-symbol-png-11.png"></img>
                <p className="rights_reserved">2024. All rights reserved</p>
            </div>

        </div>
    );
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

export default UploadImage