import React from 'react';
import { useState,useEffect} from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BACKEND_URL } from '../../constants';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors, normalLogin, googleLogin } from '../../store/slices/AuthSlice';
import { Link } from 'react-router-dom';
import {useAlert} from 'react-alert';
import Loader from '../Layouts/Loader';
import { GoogleLogin } from '@react-oauth/google';

function Login() {

	const navigate = useNavigate();
	const [alignment, setAlignment] = React.useState('User');
	const [email, setEmail] = useState('');
	const alert = useAlert();
	const [password, setPassword] = useState('');
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	const dispatch = useDispatch();
	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(normalLogin({ email, password, alignment }));
	}
	const googleSuccess = async (res) => {
		dispatch(googleLogin({ token: res.credential }));
	}


	const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
	const loader = useSelector(state=>state.auth.loginloader)
	const error = useSelector(state=>state.auth.error)
	
	const location = useLocation();
	
	// part of logic for attempt to play movie without login
	const defaultAttempt = (location.state && location.state.isLogged !== undefined) ? location.state.isLogged : true;
	const [isLogged, setIsLogged] = useState(defaultAttempt);
	useEffect(()=>{
		if(!isLogged)
		{
			setIsLogged(true);
			alert.error('Please Login to view movie');
			dispatch(clearErrors())
		}
	},[error])


	useEffect(()=>{
		if(isAuthenticated)
		{
			alert.success('Login Successful');
			navigate('/');
			dispatch(clearErrors());
		}
	},[isAuthenticated])
	useEffect(()=>{
		if(error)
		{
			alert.error('Login Failed');
			dispatch(clearErrors())
		}
	},[error])

	return (
		<>
		    {loader? <Loader/> :
			<div className={styles.Total}>
				<div className={styles.content}>
					<div className={styles.box} >
						<div className={styles.box1}>
							<h1>Movies Prime</h1>

							<p>Nice to see you again</p>
						</div>
						<div className={styles.Google_signup}>
							<GoogleLogin
								onSuccess={googleSuccess}
								onError={(res) => {
									alert.error('Google Signin Failed')
								}}
							>
								SignIn with Google
							</GoogleLogin>
						</div>
						<div className={styles.separator}>
							<div className={styles.ray}></div>
							<span className={styles['separator-text']}>or</span>
							<div className={styles['ray-left']}></div>

						</div>

						<form onSubmit={handleSubmit}>
							<label htmlFor="name" className={styles.name} >
								<p>Email:</p>
								<input
									type="text"
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="Enter your email" required />
							</label>
							<br />
							<label className={styles.password}>
								<p>Password:</p>
								<input
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder="Enter your password" required />
							</label>
							<br />
							<div className={styles.login}>
								<button type="submit">Login</button>
							</div>
						</form>
						<div className={styles.signup}>
							Don't have an account? <Link to="/Signup">Sign up</Link>
						</div>
					</div>
				</div>
			</div>}
		</>

	);
}
export default Login;
