import React, {useState} from 'react';
import HeaderWithNav from '../../components/HeaderWithNav/HeaderWithNav';
import Navbar from '../../components/Navbar/Navbar';

import postPlaceholder from '../../img/post_placeholder.png';

import './CreatePost.css';

const CreatePost = (props) => {

    const {userData} = props;

    /* Tags */
    const critiqueTags = ["Typography", "Wireframing", "Painting", "Poster Design", "Branding", "Sculpture",
                     "Drawing", "Character Concept Art", "Cartoon", "White Space", "Storyboarding", 
                     "Motion Graphics", "Environment Design", "Photoshop", "Composition", "Illustrator", "White Space"];
    const [selectedCritiqueTags, setSelectedCritiqueTags] = useState([]);

    /* Critique types */
    const critiqueTypes = ['Feedback', 'Just sharing'];
    const [selectedCritiqueType, setSelectedCritiqueType] = useState(-1);

    /* Determines the critique type style based on current selection */
    const getCritiqueTypeClass = (ind) => {
        console.log("In getCritiquetypeClass");
        return selectedCritiqueType === ind ? "create-post-option-active": "create-post-option";
    }

    /* Renders a list of Critique types */
    const critiqueTypeList = critiqueTypes.map((critiqueType, ind) => {
        return <div className={getCritiqueTypeClass(ind)} 
                    onClick={()=>{setSelectedCritiqueType(ind)}}>
                        {critiqueType}
                </div>
    })

    /* Adds or removes a tags to the current selections */
    const toggleTagSelection = (ind) => {
        // Add
        if(!selectedCritiqueTags.includes(ind)) {
            setSelectedCritiqueTags([...selectedCritiqueTags, ind]);
        }
        // Remove
        else {
            const updatedCritiqueTags = selectedCritiqueTags.filter((index) => {
                return index !== ind;
            });
            setSelectedCritiqueTags(updatedCritiqueTags);
        }
    }

    /* Determines the critique tag style based on current selections */
    const getCritiqueTagClass = (ind) => {
        return selectedCritiqueTags.includes(ind) ? "create-post-option-active": "create-post-option";
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
        <img className="profile-pic" src={userData.picture}/>:
        <div className="profile-pic"></div>;
    }

    /* Renders a list of critique tags */
    const critiqueTagList = critiqueTags.map((critiqueTag, ind) => {
        return <div className={getCritiqueTagClass(ind)}
                onClick={()=> toggleTagSelection(ind)}>
                    {critiqueTag}
                </div>
    })

    /* Renders the content */
    return (
        <div>
            <div className="page-content">
                <HeaderWithNav/>
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
                        <img className="create-post-image" src={postPlaceholder}/>
                    </div>
                    <div className="create-post-select-bottom">
                        <div class="create-post-select-title">Select tags</div>
                        <div class="create-post-options-wrapper">
                            {critiqueTagList}
                        </div>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}

export default CreatePost;