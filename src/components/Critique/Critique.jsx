import React from 'react';
import './Critique.css';

/* Had to name it Critique cuz Comment was taken by React lol */
const Critique = (props) => {
    const {author, body} = props;
    return (
        <div className="critique-container">
            <div className="critique-profile"></div>
            <div className="critique-content">
                <div className="critique-author">{author}</div>
                <div className="critique-body">{body}</div>
            </div>
        </div>
    )
}

export default Critique;