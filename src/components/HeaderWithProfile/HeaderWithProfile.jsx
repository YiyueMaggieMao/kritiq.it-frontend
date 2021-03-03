import React from 'react';

// No specific CSS for this file, check App.css for all header styles

const HeaderWithProfile = (props) => {
    const {profilePictureURL} = props;

    /* Renders the  */
    const getHeaderProfileContent = () => {
        return profilePictureURL? 
            <img className="page-header-profile-picture" src={profilePictureURL} alt="Profile Pic"/>:
            <div className="page-header-profile-placeholder"/>;
    }

    return (
        <div className="page-header">
            <div className="page-header-logo"><span>kritiq.it</span></div>
            <div className="page-header-profile">
                {getHeaderProfileContent()}
            </div>
        </div>
    )
}

export default HeaderWithProfile;