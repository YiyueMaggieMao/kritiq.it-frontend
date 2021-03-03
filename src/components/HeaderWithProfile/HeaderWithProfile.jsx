import React from 'react';
import {useHistory} from 'react-router-dom';

// No specific CSS for this file, check App.css for all header styles

const HeaderWithProfile = (props) => {
    let history = useHistory();
    const {profilePictureURL} = props;

    /* Redirects to profile page when profile picture clicked */
    const redirectToProfile = () => {
        history.push("/profile");
    }

    /* Renders the placeholder if we had wizard of Oz, actual profile otherwise*/
    const getHeaderProfileContent = () => {
        return profilePictureURL? 
            <img className="page-header-profile-picture" src={profilePictureURL} alt="Profile Pic"/>:
            <div className="page-header-profile-placeholder"/>;
    }

    /* Renders all header content */
    return (
        <div className="page-header">
            <div className="page-header-logo"><span>kritiq.it</span></div>
            <div className="page-header-profile" onClick={redirectToProfile}>
                {getHeaderProfileContent()}
            </div>
        </div>
    )
}

export default HeaderWithProfile;