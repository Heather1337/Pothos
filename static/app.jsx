"use strict";

const App = () => {


  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="">Le Sol</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="profile">Profile</Nav.Link>
          <Nav.Link href="plants">Plants</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search plants" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <Container>
        <Row>
          <Col sm={8}>
            <Image src="./images/monstera.png" rounded />
          </Col>
          <Col sm={4}>
            <Form>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="formUserPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

ReactDOM.render(<App></App>, document.getElementById("app"));