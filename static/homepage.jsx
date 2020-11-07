"use strict";

const Homepage = () => {
    return (
        <div>
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
            <Container>
            <Row>
                <Col sm={8}>
                <Image src="https://cb2.scene7.com/is/image/CB2/PottedFiddleLeafFigSHF17/?$web_product_hero$&190905022527&wid=625&hei=625" rounded />
                </Col>
                <Col sm={4}>
                <RegistrationForm />
                </Col>
            </Row>
            </Container>
        </div>
    );
}