"use strict";

const Footer = () => {
    return (
        <Container fluid className="footer pad-top">
        <Row className="footer-container">
            <Col className="pad-top text-center" md={3}>
                {/* <h5>Help</h5>
                <p>FAQS</p>
                <p>Request</p>
                <p>Contact</p>
                <p>Upcoming Features</p> */}
            </Col>
            <Col md={6} className="text-center">
                <Image className="logo" src="/static/images/logo.png"></Image>
                {/* <hr className="light"></hr> */}
                <p>lesolsf@gmail.com</p>
                <p>San Francisco, CA</p>
            </Col>
            <Col md={3} className="text-center pad-top">
                {/* <h5>About</h5>
                <p>Our Story</p>
                <p>Blog</p>
                <p>Charity</p>
                <p>Press</p>
                <p>Privacy</p> */}
            </Col>
        </Row>
        <Col className="center-cont text-center">
            <Row className="center-cont">
            <a href="https://www.instagram.com/lesolsf" aria-label="Follow us on Instagram">
            <Image className="footer-icon" src="//cdn.shopify.com/s/files/1/0218/6894/t/39/assets/sb-icon-footer-in.png?v=2431092877713705518"></Image>
            </a>
            <a href="https://www.pinterest.com/lesolsf" aria-label="Follow us on Pinterest">
            <Image className="footer-icon" src="//cdn.shopify.com/s/files/1/0218/6894/t/39/assets/sb-icon-footer-pn.png?v=5898932830455642054"></Image>
            </a>
            <a href="https://www.facebook.com/lesolsf" aria-label="Followo us on Facebook">
            <Image className="footer-icon" src="//cdn.shopify.com/s/files/1/0218/6894/t/39/assets/sb-icon-footer-fb.png?v=5662157641149554277"></Image>
            </a>
            </Row>
            <hr></hr>
            <p className="copyright">COPYRIGHT © 2020 Le Sol SF</p>
        </Col>
        </Container >
    )
};