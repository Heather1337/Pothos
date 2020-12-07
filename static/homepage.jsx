"use strict";

const Homepage = (props) => {

    return (
          <Container className="homepage">
            <Row>
              <Col sm={8}>
              <Carousel >
                <Carousel.Item interval={500}>
                  <img
                    className="d-block w-100"
                    src="https://nonagon.style/wp-content/uploads/2018/01/NONAGON-style-n9s-indoor-house-plant-green-garden-white-eco.jpg"
                    alt="First slide"
                  />
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/11/house-plants-social.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Le Sol</h3>
                    <p>Get text reminders for when to water your plants.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              </Col>

                <Col sm={4}>
                  <RegistrationForm setUser={props.setUser}/>
                </Col>

            </Row>
          </Container>
    );
};

