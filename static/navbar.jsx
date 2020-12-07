"user strict";


const NavbarComp = (props) => {
    return (
        <Navbar id="navbar" bg="light" variant="light" sticky="top">
        <Nav className="mr-auto">
            {localStorage['user_email']? <img className="sprig" src="https://cdn.shopify.com/s/files/1/0218/6894/t/39/assets/sb-holiday-shoppe-leaf.png?v=4729645559030563596"></img>: ""}
            <Link to="/plants" id="home" className="navbar-plant-collection navbar-links brand">Le Sol</Link>
            <Link to="/plants" id="plants" className="navbar-links">{localStorage['user_email'] ? 'Discover Plants' : ""}</Link>
            <Link to="/profile" id="profile" className="navbar-links">{localStorage['user_email'] ? 'My Plants' : ""}</Link>
            <Link to="/wishlist" id="schedule" className="navbar-links">{localStorage['user_email'] ? 'Wishlist' : ""}</Link>
            <Link to="/watering-reminders" id="watering-reminders" className="navbar-links">{localStorage['user_email'] ? 'Care Reminders' : ""}</Link>
        </Nav>
        <Link variant="light" className="navbar-links">{localStorage['user_email'] ? (`Hi ` + localStorage['fname']) : `Signed out` }</Link>
    <Link variant="light" className="navbar-links" onClick={props.logoutUser}>{localStorage['user_email'] ? 'Logout' : ""}</Link>
        </Navbar>
    );
};