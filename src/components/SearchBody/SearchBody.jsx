import React from 'react';

import './SearchBody.css';

const SearchBody = (props) => {
    const {setFilters, searchHistory} = props;

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

    return (
        <div className="search-body">
            <div id="recent-searches-title">Recent Searches</div>
            <div id="recent-searches-content">{getRecentSearchesContent()}</div>
        </div>
    );
}

export default SearchBody;