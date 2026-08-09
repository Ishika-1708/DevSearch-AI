import "../styles/navbar.css"


function Navbar(){
    return(
        <nav className="navbar">

            <div className="logo">
                DevSearch AI
            </div>

            <ul className="nav-links">
                <li>Home</li>

                <li>Explore</li>

                <li>About</li>

            </ul>

        </nav>
    );
}

export default Navbar;
