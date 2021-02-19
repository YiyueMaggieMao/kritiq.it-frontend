import React from 'react';
import Critique from '../Critique/Critique';
import './ExpandedPost.css';


const ExpandedPost = (props) => {
    const {author, body, tags, comments} = props;

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

    /* Render a list of comments */
    const commentList = comments.map((comment) => {
        return <Critique author={comment.author} body={comment.body}/>
    })

    /* Return the content... Oh it's gonna be so long */
    return(
        <div className="expanded-post">
            {/* The scrollable section (post + comments)*/}
            <div className="expanded-post-scrollable">
                {/* Expanded design card */}
                <div className="design-card">
                    <div className="design-card-cover"></div>
                    <div className="design-card-content">

                        {/* Author profile, author name, post body */}
                        <div className="design-card-content-top design-card-content-top-expanded">
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

                {/* Comment section */}
                {commentList}
            </div>

            {/* Add a comment (fixed at bottom) */}
            <input className="add-comment" placeholder="Add a comment"/>
        </div>
    );
}

export default ExpandedPost;