import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import "../styles/home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch(query) {
        setSearchQuery(query);

    }

    return (
        <div className="home">
            <Navbar />

            <div className="hero">

                <h2>Search the Web Intelligently</h2>

                <p>
                    Find documentation, Github repositories, 
                    Stack Overflows answers,
                    tutorial and AI summaries in one place.
                </p>

                <SearchBar onSearch={handleSearch} />

                <div className="tech-stack">
                    <span>React</span>
                    <span>Java</span>
                    <span>Python</span>
                    <span>FastAPI</span>
                    <span>GitHub</span>
                    <span>AI</span>
                </div>

                {searchQuery && (
                    <p className="search-message">
                        Searching for: <strong>{searchQuery}</strong>
                    </p>
                )}
            </div>

        </div>
    );


 }

 export default Home;