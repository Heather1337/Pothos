"use strict";

const Homepage = (props) => {
    return (
        <div>
          <Container>
          <Navbar id="navbar" bg="light" variant="light" sticky="top">
          <Navbar.Brand href="/">Le Sol</Navbar.Brand>
          <Nav className="mr-auto">

          </Nav>
          <Badge variant="light" className="navbar-links">Signed out</Badge>
          </Navbar>
            <Row>
              <Col sm={8}>
              <Carousel>
                <Carousel.Item interval={100}>
                  <img
                    className="d-block w-100"
                    src="https://nonagon.style/wp-content/uploads/2018/01/NONAGON-style-n9s-indoor-house-plant-green-garden-white-eco.jpg"
                    alt="First slide"
                  />
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/11/house-plants-social.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Le Sol</h3>
                    <p>Easy plants to care for.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              </Col>

                <Col sm={4}>
                <RegistrationForm setUser={props.setUser}/>
                </Col>

            </Row>
          </Container>
        </div>
    );
}

