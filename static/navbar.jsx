"user strict";


const NavbarComp = () => {
    return (
        <Navbar bg="light" variant="light" sticky>
        <Image id="logo" src="/static/images/logo.png"></Image>
        <Nav className="mr-auto">
            <Link to="/profile" id="nav-link-path">Profile</Link>
            <Link to="/plants" id="nav-link-path">Plants</Link>
            <Link to="/" id="nav-link-path">Home</Link>
        </Nav>
        </Navbar>
    )
}
