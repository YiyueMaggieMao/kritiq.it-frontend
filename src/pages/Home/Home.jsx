import React, {useState} from 'react';

import HeaderWithProfile from '../../components/HeaderWithProfile/HeaderWithProfile';
import DesignCard from '../../components/DesignCard/DesignCard';
import ExpandedPost from '../../components/ExpandedPost/ExpandedPost';
import postData from '../../data/posts.json';

import './Home.css';

const Home = () => {
    const [expandedPostId, setExpandedPostId] = useState(-1);

    /* Expands a post based on id */
    const expandPost = (id) => {
        setExpandedPostId(id);
    }

    /* Closes the expanded post and goes back to the post list */
    const collapsePost = () => {
        setExpandedPostId(-1);
    }

    /* Renders "Recent Posts" if currPage is 0, back button otherwise */
    const titleContent = () => {
        return expandedPostId === -1 ?
            (<span class="page-title-text">Recent Posts</span>) : 
            (<span onClick={collapsePost}>Back</span>)
    }

    /* The list of design cards rendered from post data */
    const designCardList = postData.map((post, id) => {
        return <DesignCard id={id} author={post.author} body={post.body} tags={post.tags} expandPost={expandPost}/>;
    })

    /* The content of expanded post */
    const getExpandedPostViewer = () => {
        return expandedPostId === -1 ?
        (<div></div>): 
        (<div className="expanded-post-container">
            <ExpandedPost 
                author={postData[expandedPostId].author}
                body={postData[expandedPostId].body}
                tags={postData[expandedPostId].tags}
                comments={postData[expandedPostId].comments}
            />
        </div>)
    }

    return (
        <div className="page-content">
            <HeaderWithProfile/>
            <div className="page-title">{titleContent()}</div>
            <div className="page-body">
                <div className="design-card-list">
                    {designCardList}
                    {getExpandedPostViewer()}
                </div>
            </div>
        </div>
    )
}

export default Home;