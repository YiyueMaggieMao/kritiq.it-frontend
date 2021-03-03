import React from 'react';

// No specific CSS for this file, check App.css for all header styles

const HeaderWithProfile = (props) => {
    const {profilePictureURL} = props;

    /* Renders the  */
    const getHeaderProfileContent = () => {
        return profilePictureURL? 
            <img className="page-header-profile-picture"src={profilePictureURL}/>:
            <div class="page-header-profile-placeholder"/>;
    }

    return (
        <div className="page-header">
            <div class="page-header-logo"><span>kritiq.it</span></div>
            <div class="page-header-profile">
                {getHeaderProfileContent()}
            </div>
        </div>
    )
}

export default HeaderWithProfile;