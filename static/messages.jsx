"use strict";

const MessageForm = () => {
    /* Renders a message form to allow users to signup for sms alerts or to unsubscribe from alerts. */

    return (
        <Row>
            <Col sm={4}>
            </Col>
            <Col sm={4}>
                <Row><Image id="messages-form-banner" src="/static/images/lesolbanner.jpg" rounded fluid /></Row>
                <Row><p>Never let another plant go thirsty! Sign up for reminders
                    of when to water your precious plants. Reminders will be sent out on the
                    recommended days a plant should be watered. </p></Row>
                <Row><p>Don't worry you can always update your watering schedule at any time if you miss a day.</p></Row>
                <Form>
                <Form.Group controlId="text-service">
                <Form.Check
                        type={'checkbox'}
                        id={'message-checkbox'}
                        label={'Send me reminders'}
                    />
                </Form.Group>
                <Form.Group controlId="phone-number">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="tel" />
                </Form.Group>
                </Form>
            </Col>
            <Col sm={4}>
            </Col>
        </Row>
    )
}
