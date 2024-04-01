import styles from './Signup.module.css';
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { BACKEND_URL } from '../../constants';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors } from '../../store/slices/AuthSlice';


function Signup() {
	// State to manage form data
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const alertk = useAlert();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		mobileNumber: '',
	});

	// Handle input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Validation function
	const validateForm = () => {
		// Check if username is not empty
		if (!formData.username) {
			alert('Please enter your name.');
			return false;
		}

		// Check if email is not empty and is valid
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			alert('Please enter a valid email address.');
			return false;
		}

		// Check if password is not empty and is at least 8 characters long
		if (!formData.password) {
			alert('Please enter a valid password.');
			return false;
		}

		// If all checks pass, return true
		return true;
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}
		// Process form data, e.g., send it to a server
		try{
			axios.post(`${BACKEND_URL}/register`, formData)
			alertk.success('Sign Up Successful');
			dispatch(clearErrors())
			navigate('/login');
		}
		catch(error){
            console.error('some error has occurred')
        }
	};

	const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
	const error = useSelector(state=>state.auth.error)
	useEffect(()=>{
		if(isAuthenticated)
		{
			alertk.success('Already Logged In');
			navigate('/');
			dispatch(clearErrors());
		}
	},[isAuthenticated])
	useEffect(()=>{
		if(error)
		{
			alertk.error('SignUp Failed');
			dispatch(clearErrors())
		}
	},[error])


	const handleSignUpWithGoogle = async () => {
		try {
			// Send request to backend to initiate Google OAuth2 authentication
			const response = await axios.get(`${BACKEND_URL}/auth/google`);
			// If successful, redirect to the provided URL (if any)
			window.location.href = response.data.redirectUrl; // Example: '/auth/google'
		} catch (error) {
			console.error('Error signing up with Google:', error);
			// Handle error
		}
	};

	return (
		<div className={styles.Total}>


			<div className={styles.content}>
				<div className={styles.box}>
					<div className={styles.box1}>
						<h1>Sign up risk free</h1>
					</div>
					
					<div className={styles.separator}>
					</div>

					<form id='registerform' onSubmit={handleSubmit}>
						<label htmlFor="name" className={styles.name} >
							<p>Name</p>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								placeholder="Enter your name"
							/>
						</label>
						<br />
						<label className={styles.email} >
							<p>Email</p>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Enter your email id"
							/>
						</label>
						<br />
						<label className={styles.password} >
							<p>Password</p>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								placeholder="Enter your password"
							/>
						</label>
						<label className={styles.mobileNumber} >
							<p>Mobile Number</p>
							<input
								type="text"
								name="mobileNumber"
								value={formData.mobileNumber}
								onChange={handleInputChange}
								placeholder="Enter your mobile number"
							/>
						</label>
						<br />
						<div className={styles.signup}>
							<button type="submit">Sign up</button>
						</div>

					</form>
					<div className={styles.signin}>
						Already have an account? <a href='/login'> Login </a>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Signup;
