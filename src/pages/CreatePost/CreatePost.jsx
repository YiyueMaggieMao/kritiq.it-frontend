import React, { useState } from 'react';
import {Toast} from 'antd-mobile';
import ReactGA from 'react-ga';

import HeaderWithNav from '../../components/HeaderWithNav/HeaderWithNav';
import Navbar from '../../components/Navbar/Navbar';

import postPlaceholder from '../../img/post_placeholder.png';
import plusButton from '../../img/plusButton.png';
import uploadIcon from '../../img/UploadSimple.png';

import './CreatePost.css';
import '../../antd-mobile.min.css';

const CreatePost = (props) => {

    const { userData, setAddedPost } = props;

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Tags */
    const critiqueTags = ["Typography", "Wireframing", "Painting", "Poster Design", "Branding", "Sculpture",
        "Drawing", "Character Concept Art", "Cartoon", "White Space", "Storyboarding",
        "Motion Graphics", "Environment Design", "Photoshop", "Composition", "Illustrator", "White Space"];

    const [fileSelected, setFileSelected] = useState(false);
    const [file, setFile] = useState(postPlaceholder);
    const [tags, setTags] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);

    /*
     * Returns the name if the user already set it up, or a default name otherwise
     */
    const getName = () => {
        return userData.name ? userData.name : "Unnamed User";
    }

    /* Renders a placeholder div if the user hasn't set up a profile, 
     * and the actual profile picture if they did
     */
    const getProfilePic = () => {
        return userData.picture ?
            <img className="profile-pic" src={userData.picture} /> :
            <div className="profile-pic"></div>;
    }

    /* Updates the file and sets fileSelected to true */
    const handleFileChange = (e) => {
        console.log("In handleFileChange");
        e.preventDefault();
        
        let fileReader = new FileReader();
        let file = e.target.files[0];
        fileReader.onloadend = () => {
            console.log(fileReader.result);
            setFile(fileReader.result);
            setFileSelected(true);
        }
        fileReader.readAsDataURL(file);
    }

    /* Clicks the hidden input button to upload the file*/
    const uploadFile = () => {
        ReactGA.event({
            "category": "Upload",
            "action": "User clicked to upload a file"
        })
        document.getElementById("create-post-file-upload-button").click();
    }

    /* Renders the upload thing when nothing uploaded, and a placeholder when a file has been chosen */
    const getFileUploadSection = () => {
        return fileSelected ?
            <img className="create-post-image" src={file} /> :
            <div className="create-post-file-upload" onClick={uploadFile}>
                <input className="create-post-file-upload-button"
                    id="create-post-file-upload-button" type="file" accept="image/*" onChange={handleFileChange} />
                <img src={uploadIcon} />
                <div>
                    Upload File
                </div>
            </div>
    }

    /* Renders a list of selected tags */
    const selectedTags = tags.map((tag) => {
        return <div class="tag-active">{tag}</div>
    })

    /* The layer that filters the background */
    const backdropFilter = (
        <div class="create-backdrop-filter"></div>
    );

    /* Toggles tag selection */
    const toggleSelection = (tag) => {
        const tagInd = tags.indexOf(tag);
        // Adds tag if tag was not selected
        if (tagInd === -1) {
            setTags([...tags, tag]);
        } else {
            // Removes tag if tag selected
            const updatedTags = tags.filter((currTag) => {
                return currTag !== tag;
            })
            setTags(updatedTags);
        }

    };

    /* Returns the className of a tag based on selection status */
    const getTagClassName = (tag) => {
        if (tags.includes(tag)) { return "tag-active"; }
        return "tag";
    };

    /* The group of tags that shows up on add tags */
    const allTagsDOM = critiqueTags.map((tag) => {
        return (<div className={getTagClassName(tag)}
            onClick={() => { toggleSelection(tag) }}>
            {tag}
        </div>)
    });

    /* The popup containing filters */
    const searchPopup = (
        <div id="create-popup">
            <div className="search-popup-header">
                <div className="search-popup-title">Add Tags</div>
                <div className="search-popup-close" onClick={() => setPopupOpen(false)}>x</div>
            </div>
            <div className="tags-container">{allTagsDOM}</div>
        </div>
    );

    /* Shows a Toast message indicating post success */
    const showPostSuccess = () => {
        Toast.success("Successfully created post!", 1);
    }

    /* Shows or hides the popup and backdrop depending on the state */
    const getPopup = () => {
        return popupOpen ?
            (
                <div>
                    {backdropFilter}
                    {searchPopup}
                </div>
            ) :
            <div></div>
    };

    /* Renders a list of critique tags */
    const critiqueTagList = critiqueTags.map((critiqueTag, ind) => {
        return <div className="tag"
            onClick={() => console.log("Yeet")}>
            {critiqueTag}
        </div>
    })

    /* Renders the content */
    return (
        <div>
            <div className="page-content">
                <HeaderWithNav showPostSuccess={showPostSuccess} setAddedPost={setAddedPost}/>
                <div className="page-body create-post">
                    <div className="create-post-select-top">
                        {/* Name, profile pic, type of post */}
                        <div className="create-post-user-info">
                            <div className="create-post-user-info-left">
                                {getProfilePic()}
                            </div>
                            <div className="create-post-user-info-right">
                                <div>{getName()}</div>
                                <select defaultValue="Feedback">
                                    <option>Feedback</option>
                                    <option>Just Sharing</option>
                                </select>
                            </div>
                        </div>
                        {/* Post body and picture */}
                        <textarea className="create-post-body" placeholder="Give your post a descirption!"></textarea>
                        {getFileUploadSection()}
                    </div>
                    <div className="create-post-select-bottom">
                        <div class="create-post-select-title">
                            <div>Select tags</div>
                            <img src={plusButton} onClick={() => { setPopupOpen(true) }} />
                        </div>
                        <div class="create-post-options-wrapper">
                            {selectedTags}
                        </div>
                    </div>
                    {getPopup()}
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default CreatePost;