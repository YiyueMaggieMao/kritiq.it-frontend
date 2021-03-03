import React from 'react';
import { useHistory } from 'react-router-dom';
import './Profile.css';

const Profile = (props) => {
    const { userData } = props;
    const history = useHistory();

    /* Redirects to home page upon closing profile */
    const redirectToHome = () => {
        history.push("/home");
    }

    /* Returns the bio, or the placeholder if the user hasn't set one up yet */
    const getUserBio = () => {
        return userData.bio? userData.bio : "This user hasn't set up a bio yet"
    }

    return (
        <div className="page-content">
            {/* Header to go home / edit */}
            <div class="page-header profile-page-header">
                <div class="page-header-back page-header-left" onClick={redirectToHome}>x</div>
                <div class="page-header-edit">Edit</div>
            </div>
            <div className="user-info-view">
                {/* Profile picture and name */}
                <div className="user-name-and-picture-container">
                    <img className="medium-profile-pic" src={userData.picture} />
                    <div className="user-name-large-font">{userData.name}</div>
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