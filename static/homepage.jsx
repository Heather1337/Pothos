"use strict";

const Homepage = () => {
    return (
        <div>
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