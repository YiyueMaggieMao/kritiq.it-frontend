import React, {useState, useEffect} from 'react';
import ReactGA from 'react-ga';

import HeaderWithProfile from '../../components/HeaderWithProfile/HeaderWithProfile';
import DesignCard from '../../components/DesignCard/DesignCard';
import SearchBody from '../../components/SearchBody/SearchBody';
import ExpandedPost from '../../components/ExpandedPost/ExpandedPost';
import Navbar from '../../components/Navbar/Navbar';

import posts from '../../data/posts.json';

import searchIcon from '../../img/MagnifyingGlass.png';

import './Home.css';

const Home = (props) => {
    const {userData, showSearchBar, addedPost} = props; // Contains name and url to profile picture

    const [postData, setPostData] = useState(posts);
    const [filteredpostData, setFilteredPostData] = useState(postData);
    const [searching, setSearching] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [tags, setTags] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(-1);

    /* Google Analytics stuff */
    const trackingId = "UA-191938493-1";
    ReactGA.initialize(trackingId);

    /* Adds a dummy post to the post data for later expansion */
    useEffect(() => {
        const dummyPostJSON = {
            postId: 2,
            author: "Jeffrey Ha",
            authorProfile: "jeff",
            body: "Just created a kritiq.it account and thought I'd share something. Here's to Wizard of Oz!",
            tags: ["Branding", "Storyboarding"],
            comments:[]
        }
        const postDataWithDummy = [...postData, dummyPostJSON];
        setPostData(postDataWithDummy);
        setFilteredPostData(postDataWithDummy);
    }, [])

    /* Expands a post based on id */
    const expandPost = (id) => {
        const actionString = "User expanded post " + id;
        ReactGA.event({
            category: "View",
            action: actionString
        })
        setExpandedPostId(id);
    }

    /* Closes the expanded post and goes back to the post list */
    const collapsePost = () => {
        ReactGA.event({
            category: "Collapse",
            action: "User collapsed the post"
        })
        setExpandedPostId(-1);
    }

    /* Searches for posts that match the text and tags */
    const searchForPost = (text, selectedTags) => {
        const actionString = "User searched for content: " + text + " with " + selectedTags.length + " tags";
        ReactGA.event({
            category: "Search",
            action: actionString
        })
        const matchingPosts = postData.filter((data) => {
            const textMatches = data.body.toUpperCase().includes(text.toUpperCase());
            let filterMatches = selectedTags.length == 0; // Defaults to true if no tags selected
            for ( let tagInd in selectedTags) {
                let currSelectedTag = selectedTags[tagInd];
                if(data.tags.includes(currSelectedTag)) {
                    filterMatches = true;
                    break;
                }
            }
            return textMatches && filterMatches;
        })
        setFilteredPostData(matchingPosts);
        setSearching(false);
    }

    /* Handles key press event on search bar, specifically looking out for [Enter] */
    const handleSearchBarKeyPress = (e) => {
        if(e.key === "Enter"){
            // Search
            setSearchHistory([e.target.value, ...searchHistory]);
            searchForPost(e.target.value, tags);
            e.target.value="";
            setTags([])
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
            // Only show dummy post when post button clicked
            if(post.postId == 2) {
                return addedPost && data.postId === post.postId;
            }
            // The posts also need to match the filters to show
            return data.postId === post.postId;
        })
        if(!showing) {return <div></div>;}
        return <DesignCard id={post.postId} author={post.author} authorProfile={post.authorProfile} 
                body={post.body} tags={post.tags} expandPost={expandPost}/>;
    })

    /* The content of the search details */
    const getSearchBody = () => {
        return searching ? 
        <SearchBody
            tags={tags}
            setTags={setTags}
            searchHistory={searchHistory}
            searchForPost={searchForPost}
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
                        {/* {dummyPost} */}
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