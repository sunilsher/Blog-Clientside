import React from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import NavigationBar from './common/NavigationBar';
import {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from './store/slices/authSlice';
import PrivateRoute from './common/PrivateRoute';

function App() {
  const {isAuthenticating} = useSelector(state=>state.auth); 
  const dispatch = useDispatch();

  const userId = localStorage.getItem('user_id');

  React.useEffect(()=>{
    if(userId){
      dispatch(getLoggedInUser(userId));
    }
  }, [userId])

  if(isAuthenticating){
    return <h2>Loading please wait ...</h2>
  }

  return (
    <React.Fragment>
      <Toaster />
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
