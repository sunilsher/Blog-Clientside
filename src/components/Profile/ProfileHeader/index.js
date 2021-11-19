import React from 'react';
import API_ROUTES from '../../../constants/apiRoute';
import './style.css';
const ProfileHeader = ({user}) => {
    return <div className='profile'>
        <div className='profile-image mb-3'>
            <img width='100%' height='100%' src={user.photo ? `${API_ROUTES.API_BASE}${user.photo}` : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} />
        </div>
        <h4>{user.firstname} {user.lastname}</h4>
        <p className='text-muted'>{user.email}</p>
        <div className='profile-stats d-flex justify-content-center'>
            <div className='stat-box'>
                <h5>400</h5>
                <h6 className='text-muted'>Posts</h6>
            </div>
            <div className='stat-box'>
                <h5>100K</h5>
                <h6 className='text-muted'>Followers</h6>
            </div>
            <div className='stat-box'>
                <h5>80%</h5>
                <h6 className='text-muted'>Popularity</h6>
            </div>
        </div>
    </div>
}

export default ProfileHeader;