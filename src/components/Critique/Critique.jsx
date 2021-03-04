import React from 'react';
import './Critique.css';

/* Had to name it Critique cuz Comment was taken by React lol */
const Critique = (props) => {
    const {author, authorPicture, body} = props;

    /* Returns a placeholder if the author has no profile picture,
     * and an icon containing their profile pic if they do have one
     */
    const getProfilePic = () => {
        return authorPicture?
            <img className="critique-profile" src={authorPicture}/>:
            <div className="critique-profile"></div>
    }

    return (
        <div className="critique-container">
            {getProfilePic()}
            <div className="critique-content">
                <div className="critique-author">{author}</div>
                <div className="critique-body">{body}</div>
            </div>
        </div>
    )
}

export default Critique;