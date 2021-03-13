import React from 'react';
import './DesignCard.css';
import postPlaceholder from '../../img/post_placeholder.png';
import stanley from '../../img/stanley.png';
import jeff from '../../img/jeff.png';

const DesginCard = (props) => {
    const {id, author, authorProfile, body, tags, expandPost} = props;

    /* Returns the profile pic based on authorProfile */
    const getProfilePic = () => {
        return authorProfile === "stanley" ? stanley : jeff;
    }

    /* When the design card is clicked, call the Home.jsx function to expand it */
    const handleDesignCardClick = () => {
        expandPost(id);
    }

    /* Format the tags into a string */
    const getTagString = () => {
        const numTags = tags.length;
        let tagString = "";
        for(let tagInd = 0; tagInd < numTags; tagInd++) {
            let currTag = tags[tagInd].toLowerCase();
            currTag = currTag.replace(/\s/g, '');
            tagString = tagString + "#" + currTag;
            if(tagInd != numTags - 1) {tagString += " ";} 
        }
        return tagString;
    }

    /* Renders the content */
    return (
        <div className="design-card" onClick={handleDesignCardClick}>
            <img className="design-card-cover" src={postPlaceholder}/>
            <div className="design-card-content">
                {/* Author profile, author name, post body */}
                <div className="design-card-content-top">
                    <div className="design-card-profile-wrapper">
                        <div className="design-card-profile">
                            <img src={getProfilePic()}/>
                        </div>
                    </div>
                    <div>
                        <div className="design-card-author">{author}</div>
                        <div className="design-card-body">{body}</div>
                    </div>
                </div>

                {/* Tags */}
                <div className="design-card-tags">{getTagString()}</div>
            </div>
        </div>
    )
}

export default DesginCard;