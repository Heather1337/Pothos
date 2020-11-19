"user strict";


const NavbarComp = (props) => {
    console.log('props in NavbarComp', props)
    return (
        <Navbar id="navbar" bg="light" variant="light" sticky="top">
        {/* <Image id="logo" src="/static/images/logo.png"></Image> */}
        <Nav className="mr-auto">
            <Link to="/profile" id="profile" className="navbar-links">My Plants</Link>
            <Link to="/wishlist" id="schedule" className="navbar-links">Wishlist</Link>
            <Link to="/plants" id="plants" className="navbar-links">Plants</Link>
            <Link to="/watering-reminders" id="watering-reminders" className="navbar-links">Account</Link>
        </Nav>
        <Badge variant="light" className="navbar-links">{localStorage['user_email'] ? (`Signed in as ` + localStorage['user_email']) : `Not logged in` }</Badge>
        <Button variant="light" className="navbar-links" onClick={props.logoutUser}>Logout</Button>
        </Navbar>
    )
}

{/* <Button variant="primary">
  Profile <Badge variant="light">9</Badge>
  <span className="sr-only">unread messages</span>
</Button> */}