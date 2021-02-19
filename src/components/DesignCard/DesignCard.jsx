import React from 'react';
import './DesignCard.css';

const DesginCard = (props) => {
    const {id, author, body, tags, expandPost} = props;

    /* When the design card is clicked, call the Home.jsx function to expand it */
    const handleDesignCardClick = () => {
        expandPost(id);
    }

    /* Format the tags into a string */
    const getTagString = () => {
        const numTags = tags.length;
        let tagString = "";
        for(let tagInd = 0; tagInd < numTags; tagInd++) {
            const currTag = tags[tagInd];
            tagString = tagString + "#" + currTag;
            if(tagInd != numTags - 1) {tagString += " ";} 
        }
        return tagString;
    }

    /* Renders the content */
    return (
        <div className="design-card" onClick={handleDesignCardClick}>
            <div className="design-card-cover"></div>
            <div className="design-card-content">
                {/* Author profile, author name, post body */}
                <div className="design-card-content-top">
                    <div className="design-card-profile-wrapper">
                        <div className="design-card-profile"></div>
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