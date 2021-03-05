import React, {useState, useRef} from 'react';
import Critique from '../Critique/Critique';
import ExpandedImageLayer from '../ExpandedImageLayer/ExpandedImageLayer';

import stanley from '../../img/stanley.png';
import jeff from '../../img/jeff.png';

import './ExpandedPost.css';


const ExpandedPost = (props) => {
    const {userData, postId, author, authorProfile, body, tags, comments, 
           postData, setPostData, setExpandedPostId} = props;
    const [currentComments, setCurrentComments] = useState(comments);
    const [imageExpanded, setImageExpanded] = useState(false);

    const scrollSection = useRef(null);

    /* Returns the profile pic based on authorProfile */
    const getProfilePic = () => {
        return authorProfile === "stanley" ? stanley : jeff;
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

    /* Render a list of comments */
    const commentList = currentComments.map((comment) => {
        const authorPicture = comment.authorPicture ? comment.authorPicture : "";
        return <Critique author={comment.author} authorPicture={authorPicture} body={comment.body}/>
    })

    /* Returns a placeholder name if the user is unnamed, or the username if they have one */
    const getAuthorName = () => {
        return userData.name? userData.name : "Unnamed User";
    }

    /* When enter key pressed, submit a new comment */
    const addComment = (comment, postId) => {
        const addedComment = {"author": getAuthorName(), "authorPicture":userData.picture, "body": comment}
        const updatedPostData = [];
        const numPosts = postData.length;
        // Updates the post data with the new comment
        let currId;
        for(currId = 0; currId < numPosts; currId++) {
            if(currId !== postId) {
                updatedPostData.push(postData[currId]);
            } else { // Update the specific post
                const postToUpdate = postData[currId];
                const updatedComments = [addedComment, ...postToUpdate.comments];
                setCurrentComments(updatedComments);
                const updatedPost = {
                    "postId": postToUpdate.postId,
                    "author": postToUpdate.author,
                    "authorProfile": postToUpdate.authorProfile,
                    "body": postToUpdate.body,
                    "tags": postToUpdate.tags,
                    "comments": updatedComments
                };
                updatedPostData.push(updatedPost);
            }
        }
        setPostData(updatedPostData);
    }
    
    /* Hanles the keyPress event on the comment input */
    const handleCommentKeyPress = (e) => {
        if(e.key === "Enter") {
            addComment(e.target.value, postId);
            e.target.value = "";
            scrollSection.current.scrollTo({top: 0, behavior:'smooth'});
        }
    }

    /* Expands the image when clicked */
    const expandImage = () => {
        setImageExpanded(true);
    }

    /* Collapses the image when closed */
    const collapseImage = () => {
        setImageExpanded(false);
    }

    /* Renders the expanded image, if the image is currently expanded */
    const getExpandedImageLayer = () => {
        return imageExpanded ? <ExpandedImageLayer collapseImage={collapseImage}/> : <div></div>
    }

    /* Return the content... Oh it's gonna be so long */
    return(
        <div className="expanded-post">
            {/* The scrollable section (post + comments)*/}
            <div className="expanded-post-scrollable" ref={scrollSection}>
                {/* Expanded design card */}
                <div className="design-card">
                    <div className="design-card-cover" onClick={expandImage}></div>
                    <div className="design-card-content">

                        {/* Author profile, author name, post body */}
                        <div className="design-card-content-top design-card-content-top-expanded">
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

                {/* Comment section */}
                {commentList}
            </div>

            {/* Add a comment (fixed at bottom) */}
            <input className="add-comment" placeholder="Add a comment" onKeyPress={handleCommentKeyPress}/>
            {getExpandedImageLayer()}
        </div>
    );
}

export default ExpandedPost;