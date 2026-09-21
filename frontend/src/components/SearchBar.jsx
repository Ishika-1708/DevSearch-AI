import { useState } from "react";
import "../styles/searchbar.css";

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("");

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function handleSearch() {
        const cleanQuery = query.trim();

        if (cleanQuery === "") {
            return;
        }

        onSearch(cleanQuery);
    }

    return (
        <div className="search-container">

            <input
                className="search-input"
                type="text"
                placeholder="Search programming topics.."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            <button
                className="search-button"
                onClick={handleSearch}
            >
                Search
            </button>

        </div>
    );
}

export default SearchBar;