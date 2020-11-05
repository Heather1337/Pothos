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
            <Image src="https://cb2.scene7.com/is/image/CB2/PottedFiddleLeafFigSHF17/?$web_product_hero$&190905022527&wid=625&hei=625" rounded />
          </Col>
          <Col sm={4}>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Last Name" />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="formUserPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" />
              </Form.Group>
              <ButtonGroup vertical>
                <Button variant="primary" type="submit" id="registerButton">
                  Register
                </Button>
                <br />
                <Button href="" variant="outline-secondary" size="sm" >
                  Already have an account? Login
                </Button>
              </ButtonGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

ReactDOM.render(<App></App>, document.getElementById("app"));