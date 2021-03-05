import React, {useState} from 'react';
import plusButton from '../../img/plusButton.png';
import './SearchBody.css';

const SearchBody = (props) => {
    const {setFilters, searchHistory} = props;
    const [popupOpen, setPopupOpen] = useState(false);

    /* The list of recent searches */
    const getRecentSearchesContent = () => {
        let recentSearches = searchHistory;
        // Keep 5 recent searches so that it doesn't overflow
        if(searchHistory.length > 5) {
            recentSearches = searchHistory.slice(0,5);
        }
        else if(searchHistory.length == 0) {recentSearches = ["test1", "test2"]}
        return recentSearches.map((recentSearch) => {
            return <div>{recentSearch}</div>
        })
    }

    /* The layer that filters the background */
    const backdropFilter = (
        <div class="backdrop-filter"></div>
    );

    /* The popup containing filters */
    const searchPopup = (
            <div id="search-popup">
                Yeet
            </div>
    );

    /* Shows or hides the popup and backdrop depending on the state */
    const getPopup = () => {
        return popupOpen ? (
            <div>
                {backdropFilter}
                {searchPopup}
            </div>):
            <div></div>
    };

    return (
        <div className="search-body">
            <div className="search-body-title">Recent Searches</div>
            <div id="recent-searches-content">{getRecentSearchesContent()}</div>
            <div className="search-body-title filter-header">
                <div>Filters</div>
                <img src={plusButton} onClick={()=> {setPopupOpen(true)}}/>
            </div>
            {getPopup()}
        </div>
    );
}

export default SearchBody;