import './Navbar.css'

import { Link, useLocation,useNavigate } from 'react-router-dom';
import React, { useState,useEffect} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../store/slices/AuthSlice"
import Searchbar from '../Searchbar/Searchbar';

import profileImage from '../../pages/Profile/profile.jpg';

// import { set } from 'immer/dist/internal';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth?.user?.role);
    const sub = useSelector(state => state.auth?.user?.subscription?.name);
    const profilePicture = useSelector(state => state.auth?.user?.profilePicture);
    useEffect(() => {
        setCurrentPath(location.pathname);
    },[location.pathname])

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleEnterKeyPress = (event) => {
        setIsSearchOpen(false);
    }

    useEffect(() => {
        const handleResult = (event) => {
            if (event.key === 'Enter' && isSearchOpen) {
                // handleEnterKeyPress();
            } else if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setIsSearchOpen(true);
            }
        };
    
        document.addEventListener('keydown', handleResult);
    
        return () => {
            document.removeEventListener('keydown', handleResult);
        };
    }, [isSearchOpen]);

    return (
        <div className={`navbar ${isOpen ? 'open' : ''}`}>

            {isSearchOpen && <Searchbar 
                                defaultFocus={isSearchOpen} 
                                onClose={handleEnterKeyPress}
                            />}

            <div className={`TitleOfPlatforms ${isOpen ? 'open' : ''}`}>

                <div id='Before600px' className="TitleOfPlatform">
                    <div id="name1">MOVIE</div>
                    <div id="name2">PLAY</div>
                </div>

                <div id='After600px' className="TitleOfPlatform">
                    <div id="name1">M</div>
                    <div id="name2">P</div>
                </div>

            </div>



            <button id='hambutton' className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </button>



            {isAuthenticated === true ?
                (<div className={`Navigation ${isOpen ? 'open' : ''}`}>

                    <div className={`NavigatingOptions ${isOpen ? 'open' : ''}`}>
                        <div className={`MainPartNavBar ${isOpen ? 'open' : ''}`}>
                            {role &&
                                <li onClick={() => {
                                    if (isOpen) {
                                        toggleMenu()
                                    }
                                }}>
                                    <Link to="/admin-panel/userpanel">Admin</Link>
                                </li>
                            }
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/movies">Movies</Link>
                            </li>
                            {currentPath !== '/' &&
                                <li style={{cursor: "pointer", display: "grid", placeItems: "center"}} onClick={toggleSearch}>
                                    <SearchIcon />
                                </li>
                            }

                        </div>
                        {currentPath === '/profile' ?
                            (
                                <div className={`profile-buttons-navbar ${isOpen ? 'open' : ''}`}>
                                    <li onClick={() => {
                                        if (isOpen) {
                                        toggleMenu()
                                    }
                                    }}>
                                        <button className="profile-buttons-logout" onClick={() => { dispatch(logout()) }}>
                                            Logout
                                        </button>

                                    </li>
                                    <li onClick={() => {
                                        if (isOpen) {
                                        toggleMenu()
                                    }
                                    }}>
                                        {(!role && sub!=='Premium')&&
                                            <button className='profile-button-upgrade' onClick={() => { navigate('/subscription') }}>
                                                Upgrade
                                            </button>
                                        }
                                    </li>
                                </div>
                            ) : (
                                <li>
                                    <Link to="/profile" onClick={() => {
                                        if (isOpen) {
                                            toggleMenu()
                                        }
                                    }}>
                                        <div className="navbar-profile-picture">
                                            <img className='navbar-pfp' src={`${profilePicture ? profilePicture : profileImage}`} alt="profile" />
                                        </div>
                                    </Link>
                                </li>
                            )
                        }

                    </div>


                </div>) :
                (<div className={`Navigation ${isOpen ? 'open' : ''}`}>

                    <div className={`NavigatingOptions ${isOpen ? 'open' : ''}`}>
                        <div className={`MainPartNavBar ${isOpen ? 'open' : ''}`}>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/">Home</Link>
                            </li>
                            {currentPath !== '/' &&
                                <li style={{cursor: "pointer", display: "grid", placeItems: "center"}} onClick={toggleSearch}>
                                    <SearchIcon />
                                </li>
                            }
                        </div>
                        <div className={`profile-buttons-navbar ${isOpen ? 'open' : ''}`}>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link className='LoginNavBar' to='/Login'>Log In</Link>
                            </li>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link className='SigupNavBar' to='/Signup'>Sign Up</Link>
                            </li>
                        </div>
                    </div>

                </div>)}


        </div>
    );
}

export default Navbar;
