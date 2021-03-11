import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import './Profile.css';

const Profile = (props) => {
    const { userData } = props;
    const history = useHistory();

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Redirects to home page upon closing profile */
    const redirectToHome = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected to Home from Profile page"
        })
        history.push("/home");
    }

    /* Redirects to edit page upon clicking edit */
    const redirectToEdit = () => {
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected to Edit Profile from Profile page"
        })
        history.push("/edit-profile");
    }

    /*
     * Returns the name if the user already set it up, or a default name otherwise
     */
    const getName = () => {
        return userData.name? userData.name: "Unnamed User";
    }

    /* Renders a placeholder div if the user hasn't set up a profile, 
     * and the actual profile picture if they did
     */
    const getProfilePic = () => {
        return userData.picture?
        <img className="medium-profile-pic" src={userData.picture}/>:
        <div className="medium-profile-pic"></div>;
    }

    /* Returns the bio, or the placeholder if the user hasn't set one up yet */
    const getUserBio = () => {
        return userData.bio? userData.bio : "This user hasn't set up a bio yet"
    }

    return (
        <div className="page-content">
            {/* Header to go home / edit */}
            <div class="page-header profile-page-header">
                <div class="page-header-back page-header-left">
                    <span  onClick={redirectToHome}>x</span>
                </div>
                <div class="page-header-edit" onClick={redirectToEdit}>Edit</div>
            </div>
            <div className="user-info-view">
                {/* Profile picture and name */}
                <div className="user-name-and-picture-container">
                    {getProfilePic()}
                    <div className="user-name-large-font">{getName()}</div>
                </div>
                {/* Bio info */}
                <table className="user-bio">
                    <td className="table-field-name">Bio</td>
                    <td className="table-field-value">{getUserBio()}</td>
                </table>
            </div>
        </div>
    );
}

export default Profile;