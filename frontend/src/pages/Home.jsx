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

            console.log(data.items[0]);

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
                    Stack Overflow answers,
                    tutorials and AI summaries in one place.
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