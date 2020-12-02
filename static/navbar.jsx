"user strict";


const NavbarComp = (props) => {
    return (
        <Navbar id="navbar" bg="light" variant="light" sticky="top">
        {/* <Image id="logo" src="/static/images/logo.png"></Image> */}
        <Nav className="mr-auto">
            <img className="sprig" src="https://cdn.shopify.com/s/files/1/0218/6894/t/39/assets/sb-holiday-shoppe-leaf.png?v=4729645559030563596"></img>
            <Link to="/plants" id="home" className="navbar-plant-collection navbar-links">Le Sol</Link>
            <Link to="/plants" id="plants" className="navbar-links">Discover Plants</Link>
            <Link to="/profile" id="profile" className="navbar-links">Plant Collection</Link>
            <Link to="/wishlist" id="schedule" className="navbar-links">Wishlist</Link>
            <Link to="/watering-reminders" id="watering-reminders" className="navbar-links">Reminders</Link>
        </Nav>
        <Badge variant="light" className="navbar-links">{localStorage['user_email'] ? (`Signed in as ` + localStorage['user_email']) : `Not logged in` }</Badge>
        <Button variant="light" className="navbar-links" onClick={props.logoutUser}>Logout</Button>
        </Navbar>
    );
};