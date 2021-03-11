import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import './EditProfile.css';
import editIcon from '../../img/edit.png';

const EditProfile = (props) => {
    const { userData, setUserData } = props;
    const history = useHistory();

    const [saveButtonClassName, setSaveButtonClassName] = useState("page-header-edit");

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* 
     * Splits user's name into first and last
     * Returns array with format [firstName, lastName]
     */
    const getFirstAndLastName = () => {
        // If user hasn't set a name yet, return an empty array 
        if (!userData.name) {
            return ["", ""];
        }
        // Otherwise, split the name by the last space index
        const lastSpaceIndex = userData.name.lastIndexOf(' ');
        // If no space, return the whole name as first name and nothing as last
        if (lastSpaceIndex === -1) {
            return [userData.name, ""];
        }
        // If a space is present, return first and last name
        const firstName = userData.name.substring(0, lastSpaceIndex);
        const lastName = userData.name.substring(lastSpaceIndex + 1);
        return [firstName, lastName];
    }

    const [firstName, setFirstName] = useState(getFirstAndLastName()[0]);
    const [lastName, setLastName] = useState(getFirstAndLastName()[1]);
    const [bio, setBio] = useState(userData.bio);

    /* Renders a placeholder div if the user hasn't set up a profile, 
     * and the actual profile picture if they did
     */
    const getProfilePic = () => {
        return userData.picture ?
            <img className="large-profile-pic" src={userData.picture} /> :
            <div className="large-profile-pic large-profile-pic-div"></div>;
    }

    /*
     * Attempts changing the style of the save button
     * Only calls the set method if the button isn't already pink
     * In order to save run time
     */
    const changeButtonStyle = () => {
        if (saveButtonClassName === "page-header-edit") {
            setSaveButtonClassName("page-header-edit page-header-edit-pink")
        }
    }

    /* Updates first name */
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
        changeButtonStyle();
    }

    /* Updates last name */
    const updateLastName = (e) => {
        setLastName(e.target.value);
        changeButtonStyle();
    }

    /* Updates bio */
    const updateBio = (e) => {
        setBio(e.target.value);
        changeButtonStyle();
    }

    /* Redirects to profile page on page closed */
    const redirectToProfile = () => {
        ReactGA.event({
            "category": "Cancel",
            "action": "User canceled editing profile"
        })
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected from EditProfile to Profile"
        })
        history.push("/profile");
    }

    /* Saves info, then redirects to profile */
    const saveAndRedirectToProfile = () => {
        ReactGA.event({
            "category": "Submit",
            "action": "User saved changes to profile"
        })
        ReactGA.event({
            "category": "Redirect",
            "action": "User redirected from EditProfile to Profile"
        })
        const name = firstName + " " + lastName;
        setUserData({ name: name, picture: userData.picture, bio: bio });
        redirectToProfile();
    }

    /* Renders page content */
    return (
        <div className="page-content">
            <div className="page-header profile-page-header">
                <div className="page-header-back page-header-left">
                    <span onClick={redirectToProfile}>x</span>
                </div>
                <div className={saveButtonClassName} onClick={saveAndRedirectToProfile}>Save</div>
            </div>
            <div className="user-info-edit">
                <div className="large-profile-pic-wrapper">
                    {getProfilePic()}
                    <span className="edit-icon-wrapper"><img src={editIcon} /></span>
                </div>
                <table className="user-bio">
                    <div>
                        <tr>
                            <td className="table-field-name-edit">First Name</td>
                            <td className="table-field-value-edit">
                                <input defaultValue={firstName} onChange={updateFirstName} />
                            </td>
                        </tr>
                    </div>
                    <div>
                        <tr>
                            <td className="table-field-name-edit">Last Name</td>
                            <td className="table-field-value-edit">
                                <input defaultValue={lastName} onChange={updateLastName} />
                            </td>
                        </tr>
                    </div>
                    <div>
                        <tr>
                            <td className="table-field-name-edit">Bio</td>
                            <td className="table-field-value-edit">
                                <textarea defaultValue={bio} onChange={updateBio} />
                            </td>
                        </tr>
                    </div>
                </table>
            </div>
        </div>
    );
}

export default EditProfile;