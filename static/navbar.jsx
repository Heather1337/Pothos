"user strict";

const NavbarComp = () => {
    return (
        <Navbar bg="light" variant="light" sticky>
        <Navbar.Brand href="">Le Sol</Navbar.Brand>
        <Nav className="mr-auto">
            <Link to="/profile">Profile</Link>
            <Link to="/plants">Plants</Link>
            <Link to="/">Home</Link>
            <Nav.Link href="/example">Example Style</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search plants" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
        </Form>
        </Navbar>
    )
}

// <Navbar bg="light" variant="light" sticky>
// <Navbar.Brand href="">Le Sol</Navbar.Brand>
// <Nav className="mr-auto">
//     <Link to="/profile">Profile</Link>
//     <Link to="/plants">Plants</Link>
//     <Link to="/">Home</Link>
//     <Nav.Link href="/example">Example Style</Nav.Link>
// </Nav>
// <Form inline>
//     <FormControl type="text" placeholder="Search plants" className="mr-sm-2" />
//     <Button variant="outline-primary">Search</Button>
// </Form>
// </Navbar>