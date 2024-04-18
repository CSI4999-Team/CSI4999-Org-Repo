import React, { useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ManageAccount.css';
import { useNavigate } from 'react-router-dom';

const ManageAccount = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const audioRef = useRef();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleHomeClick = () => {
        setTimeout(() => {
            navigate('/'); //navigate home
        });
    };

    return (
        isAuthenticated && (
            <div className="manage-account-container">
                <h2>Manage Account</h2>
                <div className="profile-info">
                    <img src={user.picture} alt={user.name} className="profile-pic"/>
                    <div className="text-info">
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
                <div className="note-box">
                    <p>Work in Progress - Soon you will be able to Delete and Update your account</p>
                </div>
                <button onClick={handleHomeClick} className="home-button">Take Me Home</button>
            </div>
        )
    );
};

export default ManageAccount;
