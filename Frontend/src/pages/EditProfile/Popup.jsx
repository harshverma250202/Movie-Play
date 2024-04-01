import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './Popup.module.css';
import { Grid, Button } from '@mui/material';
import cloud from './cloud.png';
import { BACKEND_URL } from '../../constants';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

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
};

const Popup = () => {

    // const userID = "6605495ac18c44ab1b09a78e";

    const userID = useSelector(state => state.auth.user._id);
    const alert=useAlert();
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();

    const uploadPhoto = async (userId, base64Image) => {
        try {
            // Create data object with base64Image
            const data = { photo: base64Image };
            // Send PATCH request with JSON data
            const response = await axios.patch(`${BACKEND_URL}/users/${userID}/photo`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert.success("Photo Uploaded Successfully");
            navigate("/profile",{replace:true});
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert.error('unable to upload photo');
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setProfileImage(base64);
    }

    return (
        <div className={styles.container}>
            <div className={styles.Box}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <p className={styles.heading}>
                            <span>Upload</span> Image
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={styles.uploadBox}>
                            <div className={styles.uploadIcons}>
                                <img className={styles.cloud} src={cloud} alt="cloud" />
                                <label htmlFor="file_input" className={styles.browse}><span  >Browse files</span></label>
                                <input className={styles.file_uploader} type="file" label="Image" name="myFile" id="file_input" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileChange(e)} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={styles.buttonBox}>
                            <Button variant="contained" onClick={() => uploadPhoto(userID, profileImage)}>
                                Upload
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};


export default Popup;