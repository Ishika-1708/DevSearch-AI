import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import "../styles/home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);

    async function handleSearch(query) {
        setSearchQuery(query);

        try {

            const response = await fetch(
                `https://api.github.com/search/repositories?q=${query}`    
            );

            const data = await response.json();

            

            setResults(data.items);

        } catch (error) {

            console.error("Search failed", error);
        }

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

                <div className="results">

                    {results.map((repo) => (

                        <div className="result-card" key={repo.id}>
                            
                            <h3>{repo.name}</h3>

                            <p>{repo.description}</p>

                            <p>{repo.stargazers_count} stars</p>

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Repository
                            </a>
                        </div>

                    ))}
                 
                </div>

            </div>
        
        </div>
        
    );


 }

 export default Home;