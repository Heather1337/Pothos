"use strict";

const RegistrationForm = (props) => {
    const [state , setState] = React.useState({
        email : "",
        password : "",
        fname : "",
        lname : ""
    })

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(id, value)
    }

    const handleRegistrationSubmit = (e) => {
        // e.preventDefault();
        /* Send a POST request to server endpoint to register a
        user with the provided email, pw, fname, lname  WHEN register button is clicked*/
        console.log('Sending POST fetch to register_user on server')
        registerUserOnServer();
    }

    const registerUserOnServer = () => {
        if(state.email.length && state.password.length && state.fname.length & state.lname.length) {
            const payload={
                "email":state.email,
                "password":state.password,
                "fname":state.fname,
                "lname":state.lname
            }

            fetch('/register_user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success in registering a user:', data);
            })
            .catch((error) => {
                console.error('Error in registering a user:', error);
            });
        }
    }



    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First Name" onChange={handleChange} value={state.fname}/>
                </Form.Group>
                <Form.Group as={Col} controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last Name" onChange={handleChange} value={state.lname}/>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} value={state.email}/>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" onChange={handleChange} value={state.password}/>
            </Form.Group>
            <ButtonGroup vertical>
                <Button variant="primary" type="submit" id="registerButton" onClick={() => handleRegistrationSubmit()}>
                    Register
                </Button>
                <br />
                <Button href="" variant="outline-secondary" size="sm" >
                    Already have an account? Login
                </Button>
            </ButtonGroup>
        </Form>
    )
}