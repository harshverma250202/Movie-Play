import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadImage from './pages/UploadImage/UploadImage';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import { ResultPage } from './pages/SearchResults/SearchResultsList';
import Videoplayer from './pages/video/videoplayer.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { Navigate } from 'react-router-dom'
import { UpdateUserInfo } from './store/slices/AuthSlice.js';
import UserPanel from './pages/Admin_Panel/admin_pages/UserPanel.jsx';
import MoviePanel from './pages/Admin_Panel/movie_pages/MoviePanel.jsx';
import Movies from './pages/Movies/Movies.jsx';
import Subscription from './pages/subscription_page/subscription_page';
import Payment from './pages/Payment/Payment.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const { isOpen, type, message } = useSelector((state) => state.snackbar);
  const auth = useSelector((state) => state.auth)
  const isAuthenticated = auth.isAuthenticated;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UpdateUserInfo());
  }, [])
  return (
    <Fragment>
            <GoogleOAuthProvider clientId='1013126984686-f49t6rvvgone51319ilrokd3m9m1kuvd.apps.googleusercontent.com'>

      <Snackbar
        open={isOpen}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => dispatch(snackbarSliceActions.close(""))}
      >
        <Alert
          onClose={() => dispatch(snackbarSliceActions.close(""))}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Result" element={<ResultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/player/:id" element={!isAuthenticated?<Navigate to="/login" state={{isLogged: false}} replace />:<Videoplayer />}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
        <Route path='/editprofile' element={isAuthenticated ? <EditProfile /> : <Navigate to="/" replace />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/payment' element={<Payment />}></Route>
        {/* <Route path='/admin-panel/userpanel' element={auth?.isAuthenticated && auth?.user.role ? <UserPanel /> : <Navigate to="/" replace />} /> */}
        <Route path='/admin-panel/userpanel' element={<UserPanel />} />
        {/* <Route path='/admin-panel/moviepanel' element={auth?.isAuthenticated && auth?.user.role ? <MoviePanel /> : <Navigate to="/" replace />} /> */}
        <Route path='/admin-panel/moviepanel' element={<MoviePanel />} />
      </Routes>
      </GoogleOAuthProvider>
    </Fragment>

  );
};

export default App;
