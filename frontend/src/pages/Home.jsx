import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import "../styles/home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sortOption, setSortOption] = useState("best");
    const [language, setLanguage] = useState("");

    async function handleSearch(query) {
        console.log("QUERY RECEIVED BY HOME:", query);
        console.log("QUERY TYPE:", typeof query);

        setSearchQuery(query);
        setLoading(true);
        setError("");

        try {
            let sortParameter = "";

            if (sortOption === "stars") {
                sortParameter = "&sort=stars&order=desc";
            } else if (sortOption === "updated") {
                sortParameter = "&sort=updated&order=desc";
            }

            let languageParameter = "";

            if (language) {
                languageParameter = ` language:${language}`;
            }

            const searchQueryWithLanguage = `${query}${languageParameter}`;

            const response = await fetch(
                `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQueryWithLanguage)}${sortParameter}`
            );

            if (!response.ok) {
                throw new Error("Github API request failed");
            }

            const data = await response.json();

            

            setResults(data.items || []);

        } catch (error) {

            console.error("Search failed", error);

            setError("Something went wrong while searching Github");

            setResults([]);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [sortOption, language]);

    return (
        <div className="home">

            <Navbar />

            <div className="hero">

                <h2>Search the Web Intelligently</h2>

                <p>
                    Find documentation, Github repositories,
                    Stack Overflow answers,
                    tutorials and AI summaries in one place.
                </p>

                <SearchBar onSearch={handleSearch} />

                <div className="sort-container">

                    <label htmlFor="sort">Sort by:</label>

                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                    >
                        <option value="best">Best Match</option>
                        <option value="stars">Most Stars</option>
                        <option value="updated">Recently Updated</option>
                    </select>
                    
                </div>

                <div className="filter-container">
                    
                    <label htmlFor="language">Language:</label>

                    <select
                        id="language"
                        value={language}
                        onChange={(event)=> setLanguage(event.target.value)}
                    >
                        <option value="Any">Any</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="TypeScript">TypeScript</option>
                    </select>
                </div>

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

                {loading && (
                    <p className="loading-message">
                        Searching Github...
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {searchQuery && !loading && !error && results.length === 0 && (
                    <p className="empty-message">
                        No repositories found for "{searchQuery}"
                    </p>   
                )}

                <div className="results">

                    {results.map((repo) => {

                        console.log(
                            "UPDATED DATE:",
                            repo.updated_at
                        );

                        return (
                            <div
                                className="result-card"
                                key={repo.id}
                            >

                                <h3>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {repo.name}
                                    </a>
                                </h3>

                                <p>
                                    👤 {repo.owner.login}
                                </p>

                                <p>
                                    🕐 Updated:{" "}
                                    {new Date(
                                        repo.updated_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>

                                <p>
                                    {repo.description}
                                </p>

                                <div className="repo-meta">

                                    <span>
                                        ⭐ {repo.stargazers_count} stars
                                    </span>

                                    <span>
                                        💻 {repo.language || "Not specified"}
                                    </span>

                                    <span>
                                        🍴 {repo.forks_count} forks
                                    </span>

                                </div>

                                {Array.isArray(repo.topics)&& repo.topics.length > 0 &&(
                                    <div className="topics">

                                        {repo.topics.slice(0,5).map((topic) => (

                                            <span key={topic}>
                                                #{topic}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Repository
                                </a>

                            </div>
                        );
                    })}

                </div>

            </div>

        </div>
    );
}

export default Home;