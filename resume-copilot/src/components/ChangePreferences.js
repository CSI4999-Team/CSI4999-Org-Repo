import React, { useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ChangePreferences.css';
import { useNavigate } from 'react-router-dom';

const ChangePreferences = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const audioRef = useRef();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to change your preferences.</div>;
    }

    const handleHomeClick = () => {
        setTimeout(() => {
            navigate('/'); //navigate home
        });
    };

    return (
        <div className="preferences-container">
            <h2>Change Preferences</h2>
            <div className="preferences-info">
                <p>Here you can update your preferences for email notifications, privacy settings, and more.</p>
            </div>
            <div className="note-box">
                <p>Work in Progress - More options will be available soon to customize your experience.</p>
            </div>
            <button onClick={handleHomeClick} className="home-button">Take Me Home</button>
        </div>
    );
};

export default ChangePreferences;
