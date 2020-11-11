"use strict";

const Plant = (props) => {

    const addPlantToProfile = (e) => {
        //get name of plant clicked on
        const plant_id = e.target.id;
        const user_id = localStorage.user_id;
        if (user_id && plant_id) {
            const payload = {"user_id": user_id, "plant_id": plant_id};
            fetch('/add_plant_to_profile', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            })
            .catch((error) => console.log('Error in adding plant to profile.', error))
        } else {
            console.log('Missing plant_id | user_id: ', plant_id, user_id);
        }
    }

    return (
        <Container className="userPlant">
            <Row >
                <Col>
                <Row><h3>{props.plant_name}</h3></Row>
                <Row><p>{props.plant_tip}</p></Row>
                </Col>
                <Col>
                <Row><Image src={props.plant_image} rounded fluid/></Row>
                <Row><Button variant="outline-secondary" onClick={(e) => addPlantToProfile(e)} id={props.plant_id}>Add Plant</Button></Row>
                </Col>
            </Row>
        </Container>
    );
}

const PlantContainer = () => {

    React.useEffect(() => {
        console.log('fetching plants...')
        fetch('/get_plants.json')
        .then((response) => response.json())
        .then((data) => updatePlants(data))
    }, []);

    const [plants, updatePlants] = React.useState('plants');
    const plantsArr = [];
    for (var i = 0; i < 6; i++) {
        console.log(plants[i], plants[i].plant_image, plants[i].plant_name, plants[i].plant_id)
        plantsArr.push(
            <Plant
              plant_name={plants[i].plant_name}
              plant_tip={plants[i].plant_tip}
              plant_image={plants[i].plant_image}
              plant_id={String(plants[i].plant_id)}
            />
        );
    }

    return (
        <div>{plantsArr}</div>
    );
}

