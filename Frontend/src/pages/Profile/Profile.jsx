
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

import profileImage from './profile.jpg';
import Slider from '../../components/Slider/Slider';
import { BACKEND_URL } from '../../constants';
import { useSelector } from 'react-redux';

const topPicks = [
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BYjQyMmIyODMtYWU3YS00NTMzLWI3OTAtOWVlNzczMTc1NjQ4XkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BYzIxMDA2ZGQtMjFiNS00ODI0LThiYTYtNWVjOThmNGVkOWQxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BNjdhMjM3ZDUtMzA0Ny00NmZiLTgxYjctYTczNjU2ODQxYzg1XkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMTg4NTc3NjI1Nl5BMl5BanBnXkFtZTcwMjMwMTM5MQ@@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BNjdhMjM3ZDUtMzA0Ny00NmZiLTgxYjctYTczNjU2ODQxYzg1XkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BOTdmODZkNmQtYjU4Mi00MTcyLTg5YmEtNmVjMWU1M2Y5NzgyXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SY1000_SX677_AL_.jpg"
    }
];

const recentWatches = [
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMjI0ZmZhYTctMzRkNy00ZDc3LWJiODItOWY0MDRiMjlhNjUwXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BYmMwZjQ4NzYtYzAzNC00Yjg0LWJhZWEtMTg5NzA4ZmZmOTI2XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMzJjNTIwMDAtNmI2NS00N2UxLThmNzYtNmFlYzBhMjJhMTFjXkEyXkFqcGdeQXVyMjc1NDA2OA@@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BOTFkODRmYTQtNTk4MC00YThiLWE5ZDAtN2MyMzlkYzk2MzI0XkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMTk4NjMxNjcyOV5BMl5BanBnXkFtZTgwNDAwNTIxMDE@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMTk4YzdjOTgtNjM4NS00YjljLThhM2QtYTI3OTQ0OGVhNTMxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BODQzM2RjZjctNmFjYS00ZDE0LWI1M2ItMzk4NjU2ZmJkZDQyXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SY1000_SX677_AL_.jpg"
    },
    {
        url:
            "https://m.media-amazon.com/images/M/MV5BMDIyNDA3NGMtNWFmMi00NDRlLWEzMTEtOGIxMDZhZmRmYjJlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SY1000_SX677_AL_.jpg"
    },
];

function getValidityDate(lastPayment, period) {
    const months = {
        '1 month': 1,
        '6 months': 6,
        '1 year': 12
    };

    const lastPaymentDate = new Date(lastPayment);
    const validityDate = new Date(lastPaymentDate);
    validityDate.setMonth(validityDate.getMonth() + months[period]);

    return validityDate.toLocaleDateString();
}

const Profile = () => {

    // const userID = "6605495ac18c44ab1b09a78e";

    // const [userData, setUserData] = useState({});
    const [subscriptionData, setSubscriptionData] = useState({});
    // const [photo, setPhoto] = useState('');

    const userData = useSelector(state => state.auth.user);

    // console.log(userD);
    // setUserData(userD);
    // setPhoto(userData.profilePicture);
    const userID = userData._id;

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/editprofile");
    }

    const handleUpgrade = () => {
        navigate("/subscription");
    }

    const handleLogout = () => {
        navigate("/");
    }

    // const fetchData = async () => {
    //     try {
    //         console.log(userData.subscription);
    //         const subscriptionResponse = await axios.get(`${BACKEND_URL}/subscription/${userData.subscription}`);
    //         setSubscriptionData(subscriptionResponse.data);
    //         console.log(subscriptionResponse.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const fetchPhoto = async () => {
    //     try {
    //         const response = await axios.get(`${BACKEND_URL}/users/${userID}/photo`);
    //         setPhoto(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    //     // fetchPhoto();
    // }, []);

    return (
        <div className={styles.Container}>
            <div className={styles.backgroundImage}></div>
            <Grid container spacing={0}>
                <Grid item className={styles.imageContainer} xs={12} sm={4}>
                    <Grid container spacing={0}>
                        <Grid item className={styles.imageBox} xs={12}>
                            <div className={styles.profileImage} style={{ backgroundImage: `url(${userData.profilePicture ? `${userData.profilePicture}` : profileImage})` }}></div>
                        </Grid>
                        <Grid item className={styles.editButton} xs={12}>
                            <Button variant="contained" onClick={handleEdit}>
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={styles.details} xs={12} sm={8}>
                    <Grid container spacing={0}>
                        <Grid item className={styles.heading} xs={12}>
                            <span>Hello</span> {userData.username}
                            <hr />
                        </Grid>
                        <Grid item className={styles.content} xs={12}>
                            <span >Email:</span>  {userData.email}
                        </Grid>
                        <Grid item className={styles.content} xs={12}>
                            <span >Phone:</span> {userData.mobileNumber}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={styles.details2} xs={12} sm={12}>
                    <hr />
                    <Grid container className={styles.details3} spacing={3}>
                        <Grid item className={styles.content} xs={12} sm={6}>
                            <span>Current Plan:</span> {userData.subscription?.name}
                        </Grid>
                        <Grid item className={styles.content} xs={12} sm={6}>
                            <span>Plan Validity:</span> {userData.lastPayment ? getValidityDate(userData.lastPayment, userData.subscription?.timeperiod) : 'N/A'}
                        </Grid>
                        <Grid item className={styles.content} xs={12} sm={6}>
                            <span>Devices:</span> 2
                        </Grid>
                        <Grid item className={styles.content} xs={12} sm={6}>
                            <span>Last Payment:</span> {userData.lastPayment ? new Date(userData.lastPayment).toLocaleDateString() : 'N/A'}
                        </Grid>
                    </Grid>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item className={styles.heading2} xs={12}>
                    Top Picks for You
                    <hr />
                    <Slider images={topPicks} />
                </Grid>
                <Grid item className={styles.heading2} xs={12}>
                    Recently Watched
                    <hr />
                    <Slider images={recentWatches} />
                </Grid>
            </Grid>
        </div>
    );
}


export default Profile;

