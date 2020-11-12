"use strict";

const RegistrationForm = (props) => {

    const [state , setState] = React.useState({
        login: false,
        user: {},
        email : "",
        password : "",
        fname : "",
        lname : ""
    })

    /*==== Checks to see if there is a logged in user when loading site =====*/
    // React.useEffect(() => {
    //     const loggedInUser = localStorage.getItem('user');
    //     if (loggedInUser) {
    //         const foundUser = loggedInUser;
    //         setState(prevState => ({
    //             ...prevState,
    //             user: foundUser
    //         }));
    //         console.log('Found user in useEffect in login file ===>.', foundUser)
    //     }
    // }, []);

    /*== Handles updating state as User fills out registration form === */
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
        console.log(id, value) //uncomment to debug
    }

    /*== Changes state when user clicks 'Already a user: login' === */
    const renderLogin = () => {
        setState(prevState => ({
            ...prevState,
            login : true
        }));
    }


    /*== Handles clicking of LOGIN button === */
    const handleLogin = (e) => {
        e.preventDefault()

        if(state.email.length && state.password.length) {
            console.log('state email and pw', state.email, state.password)
            const payload = {"email": state.email, "password": state.password};
            fetch('/login_user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if(data !== 'Invalid') {
                    localStorage.setItem('user_id', data.user_ID);
                    localStorage.setItem('user_email', data.user_email);
                    console.log(localStorage);
                    setState(prevState => ({
                        ...prevState,
                        user: data,
                    }));
                    console.log('updated state', state);
                    props.setUser({loggedIn: true});
                } else {
                    alert('Invalid login!')
                }
            })
            .catch((error) => {
                console.error('Error in logging in a user:', error);
            });
        }
    }

    /*== Handles clicking of LOGOUT button === */
    // const handleLogout = (e) => {
    //     setState(prevState => ({
    //         ...prevState,
    //         "login": false,
    //         "email" : "",
    //         "user": [],
    //         "password" : "",
    //         "fname" : "",
    //         "lname" : ""
    //     }));
    // }



    /*======== Calls function for registering a user on button click. ======== */
    const handleRegistrationSubmit = (e) => {
        // e.preventDefault();
        /* Send a POST request to server endpoint to register a
        user with the provided email, pw, fname, lname  WHEN register button is clicked*/
        e.preventDefault();
        console.log('Sending POST fetch to register_user on server')
        registerUserOnServer();
    }

    /*====== Function for sending POST to server with user registration details ========= */
    const registerUserOnServer = () => {
        console.log('Registering a user....?');
        console.log('State when registering: ', state);
        if(state.email.length && state.password.length && state.fname.length && state.lname.length) {
            console.log('Inside of register if statement.')
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
                setState(prevState => ({
                    ...prevState,
                    login : true
                }));
            })
            .catch((error) => {
                console.error('Error in registering a user:', error);
            });
        }
    }

    /*====== Checks state for Login and determines which component to render: Registration form/Login form ========= */
    if (state.login === false) {
        return (
            <Form onSubmit={handleRegistrationSubmit}>
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
                    <Button variant="dark" type="submit" id="registerButton">
                        Register
                    </Button>
                    <br />
                    <Button variant="outline-secondary" size="sm" onClick={()=> renderLogin()}>
                        Already have an account? Login
                    </Button>
                </ButtonGroup>
            </Form>
        )

    } else {
        return (
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} value={state.email}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" onChange={handleChange} value={state.password}/>
                </Form.Group>
                    <Button variant="outline-secondary" type="submit" id="loginButton">
                        Login
                    </Button>
            </Form>
        )
    }
}