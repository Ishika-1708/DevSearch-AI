import { useState } from "react";
import "../styles/searchbar.css";

function SearchBar({ onSearch }){

    const [query, setQuery] = useState("");

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    function handleSearch() {
        if (query.trim() === "") {
            return;
        }
        
        onSearch(query);
    }

    return (
        <div className="search-container">

        <input
          className="search-input"
          type="text"
          placeholder="Search programming topics.."
          value={query}
          onChange={handleInputChange}
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