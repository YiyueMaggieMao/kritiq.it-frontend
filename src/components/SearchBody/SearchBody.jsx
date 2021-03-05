import React, {useState} from 'react';
import plusButton from '../../img/plusButton.png';
import './SearchBody.css';

const SearchBody = (props) => {
    const {tags, setTags, searchHistory} = props;
    const [popupOpen, setPopupOpen] = useState(false);

    // List of all possible tags
    const allTags = ["Typography", "Wireframing", "Painting", "Poster Design", "Branding", "Sculpture",
                     "Drawing", "Character Concept Art", "Cartoon", "White Space", "Storyboarding", 
                     "Motion Graphics", "Environment Design", "Photoshop", "Composition", "Illustrator", "White Space"];

    /* The list of recent searches */
    const getRecentSearchesContent = () => {
        let recentSearches = searchHistory;
        // Keep 5 recent searches so that it doesn't overflow
        if(searchHistory.length > 5) {
            recentSearches = searchHistory.slice(0,5);
        }
        return recentSearches.map((recentSearch) => {
            return <div>{recentSearch}</div>
        })
    }

    /* Renders a list of selected tags */
    const selectedTags = tags.map((tag) => {
        return <div class="tag-active">{tag}</div>
    })

    /* The layer that filters the background */
    const backdropFilter = (
        <div class="backdrop-filter"></div>
    );

    /* Toggles tag selection */
    const toggleSelection = (tag) => {
        const tagInd = tags.indexOf(tag);
        // Adds tag if tag was not selected
        if(tagInd === -1) {
            setTags([...tags, tag]);
        } else {
            // Removes tag if tag selected
            const updatedTags = tags.filter((currTag) => {
                return currTag !== tag;
            })
            setTags(updatedTags);
        }

    };

    /* Returns the className of a tag based on selection status */
    const getTagClassName = (tag) => {
        if(tags.includes(tag)) {return "tag-active";}
        return "tag";
    };

    /* The group of tags that shows up on add tags */
    const allTagsDOM = allTags.map((tag) => {
        return (<div className={getTagClassName(tag)} 
                    onClick={() => {toggleSelection(tag)}}>
                    {tag}
                </div>)
    });

    /* The popup containing filters */
    const searchPopup = (
            <div id="search-popup">
                <div className="search-popup-header">
                    <div className="search-popup-title">Add Tags</div>
                    <div className="search-popup-close" onClick={()=>setPopupOpen(false)}>x</div>
                </div>
                <div className="tags-container">{allTagsDOM}</div>
            </div>
    );

    /* Shows or hides the popup and backdrop depending on the state */
    const getPopup = () => {
        return popupOpen ? 
            (
                <div>
                    {backdropFilter}
                    {searchPopup}
                </div>
            ):
            <div></div>
    };

    /* Returns the popup */
    return (
        <div className="search-body">
            <div className="search-body-title">Recent Searches</div>
            <div id="recent-searches-content">{getRecentSearchesContent()}</div>
            <div className="search-body-title filter-header">
                <div>Filters</div>
                <img src={plusButton} onClick={()=> {setPopupOpen(true)}}/>
            </div>
            <div class="selected-tags-container">
                {selectedTags}
            </div>
            {getPopup()}
        </div>
    );
}

export default SearchBody;