import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import styles from './EditProfile.module.css';
import profileImage from '../Profile/profile.jpg';
import Popup from './Popup';
import { BACKEND_URL } from '../../constants';
import {useSelector,useDispatch} from 'react-redux';
import {UpdateUserInfo} from '../../store/slices/AuthSlice';


const EditProfile = () => {

    const dispatch = useDispatch();
    // const userID = "6605495ac18c44ab1b09a78e";

    const userID = useSelector(state => state.auth.user._id);


    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [responseMsg, setResponseMsg] = useState(null);
    const [responseMsg2, setResponseMsg2] = useState(null);
    const [color, setColor] = useState('#E70000');
    const navigate = useNavigate();

    const handlePopup = () => {
        setIsOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${BACKEND_URL}/users/${userID}`, {
                username: name,
                mobileNumber: phoneNumber
            });
            dispatch(UpdateUserInfo);
            setResponseMsg(response.data);
            setColor('#90EE90');
        } catch (error) {
            console.error(error);
            setResponseMsg(error.response.data);
            setColor('#E70000');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${BACKEND_URL}/users/${userID}/resetPassword`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
                reenterPassword: reenterPassword
            });
            dispatch(UpdateUserInfo);
            setResponseMsg2(response.data);
            setColor('#90EE90');
        } catch (error) {
            console.error(error);
            setResponseMsg2(error.response.data);
            setColor('#E70000');
        }
    };

    const handleDone = () => {
        navigate("/profile");
        window.location.reload();
    };

    const fetchPhoto = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users/${userID}/photo`);
            setPhoto(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setIsOpen(false);
        fetchPhoto();
    }, []);


    return (
        <div className={styles.container}>
            {isOpen && <Popup />}
            <Grid container spacing={0}>
                <Grid item className={styles.heading} xs={12}>
                    <hr />
                    <span>Update</span> Profile
                    <hr />
                </Grid>
                <Grid item className={styles.main} xs={12}>
                    <Grid container className={styles.mainContainer} spacing={0}>
                        <Grid item className={styles.imageContainer} xs={12} sm={4}>
                            <Grid container spacing={0}>
                                <Grid item className={styles.imageBox} xs={12}>
                                    <div className={styles.profileImage} style={{ backgroundImage: `url(${photo ? `${photo}` : profileImage})` }}></div>
                                </Grid>
                                <Grid item className={styles.editButton} xs={12}>
                                    <Button variant="contained" onClick={handlePopup}>
                                        Update Image
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={styles.forms} item xs={12} sm={8}>
                            <Grid container className={styles.formContainer} spacing={0}>
                                <Grid item className={styles.form1} xs={12}>
                                    <form onSubmit={handleUpdate}>
                                        <div className={styles.mb_3}>
                                            <label htmlFor="exampleInputEmail1" className={`form-label ${styles.content}`}>Change Display Name</label>
                                            <input type="text" className={styles['form-control']} id="exampleInputEmail1" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className={styles.mb_3}>
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.content}`}>Change Phone Number</label>
                                            <input type="number" className={styles['form-control']} id="exampleInputPassword1" placeholder='Phone No.' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                        <button type="submit" className={`btn btn-primary ${styles.submitButton}`}>Update</button>
                                        {responseMsg && <span className={styles.responseMsg} style={{ color: color }}>{responseMsg}</span>}
                                    </form>
                                </Grid>
                                <Grid item className={styles.heading2} xs={12}>
                                    <hr />
                                    Reset Password
                                </Grid>
                                <Grid item className={styles.form2} xs={12}>
                                    <form>
                                        <div className={styles.mb_5}>
                                            <input type="password" className={styles['form-control', 'inputField']} placeholder='Current Password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        </div>
                                        <div className={styles.mb_5}>
                                            <input type="password" className={styles['form-control', 'inputField']} placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div className={styles.mb_5}>
                                            <input type="password" className={styles['form-control', 'inputField']} placeholder='Re-enter Password' value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className={`btn btn-primary ${styles.submitButton}`} onClick={handleReset}>Reset</button>
                                        {responseMsg2 && <span className={styles.responseMsg} style={{ color: color }}>{responseMsg2}</span>}
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={styles.closeButtonBox} xs={12}>
                    <hr />
                    <div className={styles.closeButton}>
                        <Button variant="contained" onClick={handleDone}>
                            Done
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditProfile;