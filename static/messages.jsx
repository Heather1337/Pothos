"use strict";

const TextRegistrationForm = (props) => {
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
                .then(()=> localStorage.setItem('registered_for_texts', 'true'))
                .then(() => props.setUserWantsTexts(true))
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
        <Col sm={4} className="reminders-form">
            <Row><Image id="messages-form-banner" src="/static/images/lesolbanner.jpg" rounded fluid /></Row>
            <Row className="pad-top-15"><p>Never let another plant go thirsty! Sign up for reminders
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

const UnsubscribeForm = (props) => {

    const handleUnsubscribe = () => {
        //Send a fetch PATCH request to update the user record with text-service being set to false but keep number
        const user_id = localStorage.user_id;
        const payload = {'user_id': user_id, 'wants_reminders': false}
        fetch('/unregister_user_for_texts', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(()=> localStorage.setItem('registered_for_texts', 'false'))
        .then(()=> props.setUserWantsTexts(false))
        .catch((error)=> console.log('Error with registering user for texts.'))
    }

    return (
        <Row>
        <Col sm={4}>
        </Col>
        <Col sm={4} className="reminders-form">
            <Row><Image id="messages-form-banner" src="/static/images/lesolbanner.jpg" rounded fluid /></Row>
            <Row><p className="pad-top-15">You are signed up to receive text reminders for when your plants are ready to be watered.
                If you'd like to unsubscribe from receiving messages click the unsubscribe button below. </p></Row>
            <Form>
            <Button variant="outline-secondary" type="submit" id="textRegisterButton" onClick={handleUnsubscribe}>
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

    const[userWantsTexts, setUserWantsTexts] = React.useState(false)

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
        const userWantsReminders = localStorage.registered_for_texts; //registered_for_texts
        if (userWantsReminders === 'true') {
            setUserWantsTexts(true)
        }
        }, []);

    return (
        <div className="reminders-div padding-b">
            <div className="reminders-container">
            {userWantsTexts ? <UnsubscribeForm setUserWantsTexts={setUserWantsTexts}/> : <TextRegistrationForm setUserWantsTexts={setUserWantsTexts}/>}
            </div>
        </div>
    )
}
