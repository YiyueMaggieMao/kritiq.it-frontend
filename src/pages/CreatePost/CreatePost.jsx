import React, {useState} from 'react';
import HeaderWithNav from '../../components/HeaderWithNav/HeaderWithNav';

import './CreatePost.css';

const CreatePost = () => {

    /* Critique types */
    const critiqueTypes = ['Feedback', 'Just sharing'];
    const [selectedCritiqueType, setSelectedCritiqueType] = useState(-1);

    /* Tags */
    const critiqueTags = ['Typography', 'UXDesign', 'Pencil', 'Wireframing', 'Paper', 'PhotoShop'];
    const [selectedCritiqueTags, setSelectedCritiqueTags] = useState([]);

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

    /* Renders a list of critique tags */
    const critiqueTagList = critiqueTags.map((critiqueTag, ind) => {
        return <div className={getCritiqueTagClass(ind)}
                onClick={()=> toggleTagSelection(ind)}>
                    {critiqueTag}
                </div>
    })

    /* Renders the content */
    return (
        <div className="page-content">
            <HeaderWithNav/>
            <div className="page-body">
                <div className="create-post-select-top">
                    <div class="create-post-select-title">What type of critique are you looking for?</div>
                    <div class="create-post-options-wrapper">
                        {critiqueTypeList}
                    </div>
                </div>
                <div className="create-post-select-bottom">
                    <div class="create-post-select-title">Select tags</div>
                    <div class="create-post-options-wrapper">
                        {critiqueTagList}
                    </div>
                </div>
                <button className="upload-button">Upload File</button>
            </div>
        </div>
    )
}

export default CreatePost;