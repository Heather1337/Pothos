"use strict";

const TextRegistrationForm = () => {
    const [textRegisterData , updateTextRegisterData] = React.useState({
        textService: false,
        phoneNumber: ''
    })

    const handleNumberChange = (e) => {
        const {id , value} = e.target
        updateTextRegisterData(prevState => ({
            ...prevState,
            [id] : value,
        }));
        console.log(id, value) //uncomment to debug
    }

    const handleTextServiceChange = (e) => {
        const {id} = e.target;
        updateTextRegisterData(prevState => ({
            ...prevState,
            [id] : !textRegisterData[id],
        }));
        console.log(id) //uncomment to debug
    }

    const handleTextRegister = (e) => {
        e.preventDefault();

        const user_id = localStorage.user_id;
        const payload = {'user_id': user_id, 'phone_number': textRegisterData.phoneNumber, 'wants_reminders': textRegisterData.textService}

        if(validatePhoneNumber()) {
            if(textRegisterData.textService == true) {
                //Send data to server to patch user's account with the info
                fetch('/register_user_for_texts', {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                })
                .then(()=> console.log('User registered for texts.'))
                .catch((error)=> console.log('Error with registering user for texts.'))
            }
        }
        else {
            alert('Incorrect number format!')
        }
    }

    const validatePhoneNumber = () => {
        const valid_phone = /\(\d{3}\) \d{3}\-\d{4}/;
        console.log(textRegisterData.phoneNumber, 'calling validatenumberwith')
        if(valid_phone.test(textRegisterData.phoneNumber)) {
            return true;
        } else {
            return false;
        }
    }



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
            <Form onSubmit={handleTextRegister}>
            <Form.Group controlId="text-service">
            <Form.Check
                    type={'checkbox'}
                    id={'textService'}
                    label={'Send me reminders'}
                    onChange={handleTextServiceChange}
                />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" onChange={handleNumberChange} placeholder="(888) 888-8888"/>
            </Form.Group>
            <Button variant="outline-secondary" type="submit" id="textRegisterButton">
                    Register
            </Button>
            </Form>
        </Col>
        <Col sm={4}>
        </Col>
        </Row>
    )
}

const UnsubscribeForm = () => {
    return (
        <Row>
        <Col sm={4}>
        </Col>
        <Col sm={4}>
            <Row><Image id="messages-form-banner" src="/static/images/lesolbanner.jpg" rounded fluid /></Row>
            <Row><p>You are signed up to receive text reminders for when your plants are ready to be watered.
                If you'd like to unsubscribe from receiving messages click the unsubscribe button below. </p></Row>
            <Form>
            <Button variant="outline-secondary" type="submit" id="textRegisterButton">
                    Unsubscribe
            </Button>
            </Form>
        </Col>
        <Col sm={4}>
        </Col>
        </Row>
    )

}


const MessageForm = () => {
    /* Renders a message form to allow users to signup for sms alerts or to unsubscribe from alerts. */
    // const [textRegisterData , updateTextRegisterData] = React.useState({
    //     textService: false,
    //     phoneNumber: ''
    // })

    const[userWantsTexts, setUserWantsTexts] = React.useState(false)
    // const userWantsReminders = localStorage.getItem('registered_for_texts');
    // if (userWantsReminders) {
    //     setUserWantsTexts(true)
    // }

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
        console.log('useEffect triggered in MessageForm component')
        const userWantsReminders = localStorage.getItem('registered_for_texts');
        if (userWantsReminders) {
            setUserWantsTexts(true)
        }
        }, []);

    // const handleNumberChange = (e) => {
    //     const {id , value} = e.target
    //     updateTextRegisterData(prevState => ({
    //         ...prevState,
    //         [id] : value,
    //     }));
    //     console.log(id, value) //uncomment to debug
    // }

    // const handleTextServiceChange = (e) => {
    //     const {id} = e.target;
    //     updateTextRegisterData(prevState => ({
    //         ...prevState,
    //         [id] : !textRegisterData[id],
    //     }));
    //     console.log(id) //uncomment to debug
    // }

    // const handleTextRegister = (e) => {
    //     e.preventDefault();

    //     const user_id = localStorage.user_id;
    //     const payload = {'user_id': user_id, 'phone_number': textRegisterData.phoneNumber, 'wants_reminders': textRegisterData.textService}

    //     if(validatePhoneNumber()) {
    //         if(textRegisterData.textService == true) {
    //             //Send data to server to patch user's account with the info
    //             fetch('/register_user_for_texts', {
    //                 method: 'PATCH',
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify(payload)
    //             })
    //             .then(()=> console.log('User registered for texts.'))
    //             .catch((error)=> console.log('Error with registering user for texts.'))
    //         }
    //     }
    //     else {
    //         alert('Incorrect number format!')
    //     }
    // }

    // const validatePhoneNumber = () => {
    //     const valid_phone = /\(\d{3}\) \d{3}\-\d{4}/;
    //     console.log(textRegisterData.phoneNumber, 'calling validatenumberwith')
    //     if(valid_phone.test(textRegisterData.phoneNumber)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    return (
        // <Row>
        //     <Col sm={4}>
        //     </Col>
        //     <Col sm={4}>
        //         <Row><Image id="messages-form-banner" src="/static/images/lesolbanner.jpg" rounded fluid /></Row>
        //         <Row><p>Never let another plant go thirsty! Sign up for reminders
        //             of when to water your precious plants. Reminders will be sent out on the
        //             recommended days a plant should be watered. </p></Row>
        //         <Row><p>Don't worry you can always update your watering schedule at any time if you miss a day.</p></Row>
        //         <Form onSubmit={handleTextRegister}>
        //         <Form.Group controlId="text-service">
        //         <Form.Check
        //                 type={'checkbox'}
        //                 id={'textService'}
        //                 label={'Send me reminders'}
        //                 onChange={handleTextServiceChange}
        //             />
        //         </Form.Group>
        //         <Form.Group controlId="phoneNumber">
        //             <Form.Label>Phone number</Form.Label>
        //             <Form.Control type="tel" onChange={handleNumberChange} placeholder="(888) 888-8888"/>
        //         </Form.Group>
        //         <Button variant="outline-secondary" type="submit" id="textRegisterButton">
        //                 Register
        //         </Button>
        //         </Form>
        //     </Col>
        //     <Col sm={4}>
        //     </Col>
        // </Row>
    <div>{userWantsTexts ? <UnsubscribeForm /> : <TextRegistrationForm />}</div>
    )
}
