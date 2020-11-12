"user strict";


const NavbarComp = (props) => {
    console.log('props in NavbarComp', props)
    return (
        <Navbar id="navbar" bg="light" variant="light" sticky="top">
        {/* <Image id="logo" src="/static/images/logo.png"></Image> */}
        <Nav className="mr-auto">
            <Link to="/profile" id="nav-link-path">Profile</Link>
            <Link to="/plants" id="nav-link-path">Plants</Link>
            <Link to="/schedule" id="nav-link-path">Watering Schedule</Link>
            {/* <Link to="/" id="nav-link-path">Home</Link> */}
        {/* <Badge variant="light">{props.user.loggedIn ? (`Welcome, ` + props.user.fname) : `sign-in` }</Badge> */}
        </Nav>
        </Navbar>
    )
}

{/* <Button variant="primary">
  Profile <Badge variant="light">9</Badge>
  <span className="sr-only">unread messages</span>
</Button> */}