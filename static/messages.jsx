"use strict";

const MessageForm = () => {
    /* Renders a message form to allow users to signup for sms alerts or to unsubscribe from alerts. */

    return (
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
    )
}
