"user strict";


const NavbarComp = (props) => {
    console.log('props in NavbarComp', props)
    return (
        <Navbar id="navbar" bg="light" variant="light" sticky="top">
        {/* <Image id="logo" src="/static/images/logo.png"></Image> */}
        <Nav className="mr-auto">
            <Link to="/profile" id="profile" className="navbar-links">Profile</Link>
            <Link to="/plants" id="plants" className="navbar-links">Plants</Link>
            <Link to="/schedule" id="schedule" className="navbar-links">Watering Schedule</Link>
            <Link to="/watering-reminders" id="watering-reminders" className="navbar-links">Watering reminders</Link>
        </Nav>
        <Badge variant="light" className="navbar-links">{props.user ? (`Signed in as ` + localStorage['user_email']) : `Not logged in` }</Badge>
        </Navbar>
    )
}

{/* <Button variant="primary">
  Profile <Badge variant="light">9</Badge>
  <span className="sr-only">unread messages</span>
</Button> */}