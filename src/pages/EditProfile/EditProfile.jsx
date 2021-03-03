import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './EditProfile.css';

const EditProfile = (props) => {
    const {userData, setUserData} = props;
    const history = useHistory();

    const[saveButtonClassName, setSaveButtonClassName] = useState("page-header-edit");
    
    /* 
     * Splits user's name into first and last
     * Returns array with format [firstName, lastName]
     */
    const getFirstAndLastName = () => {
        const lastSpaceIndex = userData.name.lastIndexOf(' ');
        const firstName = userData.name.substring(0,lastSpaceIndex);
        const lastName = userData.name.substring(lastSpaceIndex + 1);
        return [firstName, lastName];
    }

    const [firstName, setFirstName] = useState(getFirstAndLastName()[0]);
    const [lastName, setLastName] = useState(getFirstAndLastName()[1]);
    const [bio, setBio] = useState(userData.bio);

    /*
     * Attempts changing the style of the save button
     * Only calls the set method if the button isn't already pink
     * In order to save run time
     */
    const changeButtonStyle = () => {
        if(saveButtonClassName === "page-header-edit"){
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
        history.push("/profile");
    }

    /* Saves info, then redirects to profile */
    const saveAndRedirectToProfile = () => {
        const name = firstName + " " + lastName;
        setUserData({name: name, picture: userData.picture, bio: bio});
        redirectToProfile();
    }

    /* Renders page content */
    return (
        <div className="page-content">
            <div className="page-header profile-page-header">
                <div className="page-header-back page-header-left" onClick={redirectToProfile}>x</div>
                <div className={saveButtonClassName} onClick={saveAndRedirectToProfile}>Save</div>
            </div>
            <div className="user-info-edit">
                <div className="large-profile-pic-wrapper">
                    <img className="large-profile-pic" src={userData.picture}/>
                </div>
                <table className="user-bio">
                    <tr>
                        <td className="table-field-name-edit">First Name</td>
                        <td className="table-field-value-edit">
                            <input defaultValue={firstName} onChange={updateFirstName}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-field-name-edit">Last Name</td>
                        <td className="table-field-value-edit">
                            <input defaultValue={lastName} onChange={updateLastName}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-field-name-edit">Bio</td>
                        <td className="table-field-value-edit">
                            <textarea defaultValue={bio} onChange={updateBio}/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default EditProfile;