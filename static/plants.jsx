"use strict";

/*=================== Layout and logic for individual Plant node =====================*/
const Plant = (props) => {

    const [plantAdded, alertPlantAdded] = React.useState(false)

  //Function for adding a plant to a User's profile
    const addPlantToProfile = (e) => {

        const plant_id = e.target.id;
        const user_id = localStorage.user_id;

        if (user_id && plant_id) {
            const payload = {"user_id": user_id, "plant_id": plant_id};
            fetch('/add_plant_to_profile', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            .then(()=> {
                alertPlantAdded(true)
                setTimeout(()=> alertPlantAdded(false), 3000)
            })
            .catch((error) => console.log('Error in adding plant to profile.', error))
        } else {
            console.log('Missing plant_id | user_id: ', plant_id, user_id);
        }
    }

    //Function for adding a plant to a User's wishlist
    const addPlantToWishlist = (e) => {

        const plant_id = e.target.id;
        const user_id = localStorage.user_id;

        if (user_id && plant_id) {
            const payload = {"user_id": user_id, "plant_id": plant_id};
            fetch('/add_plant_to_wishlist', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            .then(()=> alert('Plant added to wishlist!'))
            .catch((error) => console.log('Error in adding plant to wishlist.', error))
        } else {
            console.log('Missing plant_id | user_id: ', plant_id, user_id);
        }
    }

    //Return layout for individual Plant node
    return (
        <Container className="plant-style">
            <Row className="plant-row-style">
                <Col>
                <Row><h3>{props.plant_name}</h3></Row>
                <Row><p>{props.plant_tip}</p></Row>
                </Col>
                <Col className="plant-col-style">
                <Row className="plant-row-image"><Image src={props.plant_image} rounded fluid/></Row>
                <Row>
                <Col></Col>
                <Col>{plantAdded ? <Button variant="secondary" size="sm">Plant added!</Button> : <Button variant="outline-secondary" size="sm" onClick={(e) => addPlantToProfile(e)} id={props.plant_id}>Add plant to profile</Button>}</Col>
                <Col><Button variant="outline-secondary" size="sm" onClick={(e) => addPlantToWishlist(e)} id={props.plant_id}>Add to wishlist</Button></Col>
                <Col></Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}

/*=================== Layout and logic for container of Plant nodes =====================*/

const PlantContainer = () => {

    React.useEffect(() => {
        // console.log('fetching plants...') //uncomment for debugging
        fetch('/get_plants.json')
        .then((response) => response.json())
        .then((plants) => updatePlants(plants))
    }, []);

    const [plants, updatePlants] = React.useState('plants');
    const plantsArr = [];

    for (const plant of plants) {
        // console.log(plants[i], plants[i].plant_image, plants[i].plant_name, plants[i].plant_id); //uncomment for debugging
        plantsArr.push(
            <Plant
              plant_name={plant.plant_name}
              plant_tip={plant.plant_tip}
              plant_image={plant.plant_image}
              plant_id={String(plant.plant_id)}
            />
        );
    }

    //Return list of all User's plant nodes
    return (
        <div>{plantsArr}</div>
    );
}

