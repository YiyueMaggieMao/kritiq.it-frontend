import React, {useState} from 'react';

import HeaderWithProfile from '../../components/HeaderWithProfile/HeaderWithProfile';
import DesignCard from '../../components/DesignCard/DesignCard';
import SearchBody from '../../components/SearchBody/SearchBody';
import ExpandedPost from '../../components/ExpandedPost/ExpandedPost';
import Navbar from '../../components/Navbar/Navbar';

import posts from '../../data/posts.json';

import searchIcon from '../../img/MagnifyingGlass.png';

import './Home.css';

const Home = (props) => {
    const {userData, showSearchBar} = props; // Contains name and url to profile picture

    const [postData, setPostData] = useState(posts);
    const [filteredpostData, setFilteredPostData] = useState(postData);
    const [searching, setSearching] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [tags, setTags] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(-1);

    /* Expands a post based on id */
    const expandPost = (id) => {
        setExpandedPostId(id);
    }

    /* Closes the expanded post and goes back to the post list */
    const collapsePost = () => {
        setExpandedPostId(-1);
    }

    /* Searches for posts that match the text and tags */
    const searchForPost = (text, selectedTags) => {
        const matchingPosts = postData.filter((data) => {
            const textMatches = data.body.toUpperCase().includes(text.toUpperCase());
            const filterMatches = false;
            for ( let tagInd in selectedTags) {
                let currSelectedTag = selectedTags[tagInd];
                if(data.tags.includes(currSelectedTag)) {
                    filterMatches = true;
                    break;
                }
            }
            return textMatches;
        })
        setFilteredPostData(matchingPosts);
    }

    /* Handles key press event on search bar, specifically looking out for [Enter] */
    const handleSearchBarKeyPress = (e) => {
        if(e.key === "Enter"){
            // Search
            setSearchHistory([e.target.value, ...searchHistory]);
            searchForPost(e.target.value, tags);
            e.target.value="";
            setTags([])
            setSearching(false);
        }
    }

    /* The search bar to be rendered */
    const searchBar = (
        <div className="search-bar-container" 
            onClick={()=> {setSearching(true)}}
            onKeyPress={handleSearchBarKeyPress}
        >
            <img src={searchIcon}/>
            <input placeholder="Search Posts"/>
        </div>
    )

    /* If searching: Show search bar
     * If not searching: renders "Recent Posts" if currPage is 0, back button otherwise 
     */
    const titleContent = () => {
        // Back button
        if(expandedPostId !== -1) {
            return <span onClick={collapsePost}>Back</span>;
        }

        // Search bar
        else if(showSearchBar) {
            return searchBar;
        }

        // Recent posts
        return <span class="page-title-text">Recent Posts</span>; 
    }

    /* The list of design cards rendered from post data */
    const designCardList = postData.map((post) => {
        const showing = filteredpostData.some((data) => {
            return data.id === post.id;
        })
        if(!showing) {return <div></div>;}
        return <DesignCard id={post.id} author={post.author} authorProfile={post.authorProfile} 
                body={post.body} tags={post.tags} expandPost={expandPost}/>;
    })

    /* The content of the search details */
    const getSearchBody = () => {
        return searching ? 
        <SearchBody
            tags={tags}
            setTags={setTags}
            searchHistory={searchHistory}
        />: 
        <div></div>
    }

    /* The content of expanded post */
    const getExpandedPostViewer = () => {
        return expandedPostId === -1 ?
        (<div></div>): 
        (<div className="expanded-post-container">
            <ExpandedPost 
                userData={userData}
                postId={expandedPostId}
                author={postData[expandedPostId].author}
                authorProfile={postData[expandedPostId].authorProfile}
                body={postData[expandedPostId].body}
                tags={postData[expandedPostId].tags}
                comments={postData[expandedPostId].comments}
                postData={postData}
                setPostData={setPostData}
                setExpandedPostId={setExpandedPostId}
            />
        </div>)
    }

    /* Returns home page content */
    return (
        <div>
            <div className="page-content">
                <HeaderWithProfile
                    profilePictureURL={userData? userData.picture: ""}
                />
                <div className="page-title">{titleContent()}</div>
                <div className="page-body">
                    <div className="design-card-list">
                        {designCardList}
                        {getSearchBody()}
                        {getExpandedPostViewer()}
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}

export default Home;