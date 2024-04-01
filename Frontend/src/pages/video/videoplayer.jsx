import React, { createRef, useEffect, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import styles from './videoplayer.module.css';
import ReactHlsPlayer from 'react-hls-player';
import { BACKEND_URL } from '../../constants.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@material-ui/core/Tooltip';
import UpgradePopup from '../../components/Popup/UpgradePopup.jsx';

import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import baseApi from '../../api/baseApi.js';
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FF0000',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Videoplayer = () => {
    const getVideoUrl = (res) => res == 0 ? `${BACKEND_URL}/video/play/${videoNumber}` : `${BACKEND_URL}/video/res/${videoNumber}/${res}`;

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const alert = useAlert();
    useEffect(() => {
        if (auth.user.subscription == null) {
            alert.error('Please Subscribe to access this page');
            navigate('/subscription');
        }
    },[auth]);

    const [isClick, setClick] = useState(null);
    const [videoNumber, setVideoNumber] = useState(0);
    const [videoRes, setVideoRes] = useState(0);
    const [videoUrl, setVideoUrl] = useState(getVideoUrl(videoRes));
    const [videoStartPosition, setVideoStartPosition] = useState(-1);
    const { id } = useParams();
    const playerRef = createRef();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        new Plyr(playerRef.current);
    }, [videoNumber]);

    useEffect(() => {
        setVideoUrl(getVideoUrl(videoRes));
    }, [videoNumber]);

    const redirectIf30 = (e) => {
        if (e.target.currentTime >= 30) {
            if(auth.user.subscription?.name==='Free'&& isClick?.subscriptionType!=='Free')
            {
                alert.error('Please Subscribe to Standard Or Premium Plan to continue watching');
                navigate('/subscription');
            }
            else if(auth.user.subscription?.name==='Standard'&& isClick?.subscriptionType==='Premium')
            {
                alert.error('Please Subscribe to Premium Plan to continue watching');
                navigate('/subscription');
            }
        }
    }

    useEffect(() => {
        getData(id);
    }, [id]);

    useEffect(() => {
        /**
         * @type {HTMLVideoElement}
         */
        const video = playerRef.current;

        if (isClick) {
            video.addEventListener('timeupdate', redirectIf30);
        }

        // const checkTime = () => {
        //     if (video.currentTime > 30 && !showPopup) {
        //         setShowPopup(true);
        //     }
        // };

        // video.addEventListener('timeupdate', checkTime);

        // return () => {
        //     video.removeEventListener('timeupdate', checkTime);
        // };
    }, [id, showPopup, isClick]);

    const displayTitleWithDots = inputString => {
        const words = inputString.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : inputString;
    };

    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    const MOVIE_VIDEO_MAP = {
        'Free': 1,
        'Standard': 5,
        'Premium': 6
    }

    const getData = async (id) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/movies/${id}`);
            setVideoNumber(MOVIE_VIDEO_MAP[response.data.subscriptionType]);
            setClick(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleResolutionChange = (e) => {
        setVideoRes(e.target.value);
        setVideoUrl(getVideoUrl(e.target.value));
        setVideoStartPosition(playerRef.current.currentTime);
    }

    return (
        <div className={styles.total}>
            <div className={styles.container__total}>
                <ReactHlsPlayer
                    style={
                        {
                            height: '100%',
                            width: '100%'
                            // width: '60rem',
                            // backgroundColor: 'black'
                        }
                    }
                    autoPlay={true}
                    playerRef={playerRef}
                    src={videoUrl}
                    hlsConfig={{
                        /**
                         *
                         * @param {XMLHttpRequest} xhr
                         * @param {*} url
                         */
                        xhrSetup: function (xhr, url) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
                        },
                        startPosition: videoStartPosition
                    }}
                />

                {!isClick && <div>Loading...</div>}
                {isClick &&
                    <div className={styles.Extradetailsofresult}>
                        <div className={styles.boxoneofextra}>
                            <div className={styles.detailsofextra}>
                                <div className={styles.box1ofextradetails}>
                                    <h2 style={{ padding: '1rem' }} >
                                        {typeof isClick.title === 'string' && displayTitleWithDots(isClick.title)}
                                    </h2>
                                </div>
                                <div className={styles.box23ofextradetails}>
                                    <div className={styles.box2ofextradetails}>
                                        {`${isClick.genres?.toString().replace(/,/g, ', ')}`} | {`${isClick.year}`}
                                    </div>
                                    <div className={styles.box3ofextradetails}>
                                        {`${isClick.imdb.rating} IMDb`} | {`${isClick.rated ?? 'U'}`}
                                    </div>
                                </div>
                                <div className={styles.box4ofextradetails}>
                                    <span>Cast: </span>{`${isClick.cast?.toString().replace(/,/g, ', ')}`}
                                </div>
                            </div>
                            <div className={styles.imgdetailsofextra}>
                                <div style={{
                                    backgroundColor: `${isClick.subscriptionType === 'Free' ? '#006400' :
                                        isClick.subscriptionType === 'Premium' ? '#371F76' : '#880000'
                                        }`
                                }} className={styles.subscription_tag}>{`${isClick.subscriptionType}`}</div>
                                <img onError={handleImageError} id='img123' src={`${isClick.poster}`} alt={isClick.title} />
                            </div>
                        </div>
                        <div className={styles.boxtwoofextra}>
                            <h3 className={styles.plotTitle}>Plot</h3>
                            {typeof isClick.fullplot === 'string' && `${isClick.fullplot.substring(0, 375)}...`}
                        </div>

                        <div>
                            {auth?.user?.subscription?.name === "Premium" &&

                                (<Button variant="contained" onClick={(e) => {
                                    e.preventDefault();
                                    const a = document.createElement('a');
                                    a.style.display = 'none';
                                    a.href = `${BACKEND_URL}/video/download/${videoNumber}?authorization=${'Bearer%20' + localStorage.getItem('jwtToken')}`
                                    a.download = `${isClick.title}.mp4`;

                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                }}>Download</Button>)}
                        </div>

                        {/* {auth?.user?.subscription?.name==="Premium"&&

                       ( <Button variant="contained" onClick={(e) => {
                            e.preventDefault();
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = `${BACKEND_URL}/video/download/${videoNumber}?authorization=${'Bearer%20' + localStorage.getItem('jwtToken')}`
                            a.download = `${isClick.title}.mp4`;

                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }}>Download</Button>)} */}

                    </div>}
            </div>
            <div style={{ paddingLeft: '150px' }} >
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Resolution</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={videoRes}
                        label="Resolution"
                        onChange={handleResolutionChange}
                        className={styles.selectResolution}
                    >
                        <MenuItem value={0} style={{ color: 'black' }}>Auto</MenuItem>
                        {auth.user.subscription?.name === 'Premium' && <MenuItem value={1080} style={{ color: 'black' }}>1080p</MenuItem>}
                        {auth.user.subscription?.name !== 'Free' && <MenuItem value={720} style={{ color: 'black' }}>720p</MenuItem>}
                        <MenuItem value={360} style={{ color: 'black' }}>360p</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* {showPopup && (
                <UpgradePopup />
            )} */}
        </div>
    );
}

export default Videoplayer;