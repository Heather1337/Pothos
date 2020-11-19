"use strict";


const PlantIcons = (props) => {

    return (
      <Row>
      <Col>
      <Row><i className="fas fa-sun"></i><p>  {props.sun_lvl}</p></Row>
      <Row><i className="fas fa-tint"></i><p>  {props.water_tip}</p></Row>
      <Row><i className="fas fa-paw"></i>{props.pet_friendly ? <p>Not pet friendly</p> : <p>Pet friendly</p>}</Row>
      <Row><i className="fas fa-wind"></i>{props.filters_air ? <p>Filters the air</p> : <p>Does not filter the air</p>}</Row>
      </Col>
      </Row>
    )
}

/*=================== Layout and logic for individual Plant node =====================*/
const Plant = (props) => {

    const [plantAdded, alertPlantAdded] = React.useState(false)
    const [wishlistPlantAdded, alertWishlistPlantAdded] = React.useState(false)

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
            .then(()=> {
                alertWishlistPlantAdded(true)
                setTimeout(()=> alertWishlistPlantAdded(false), 3000)
            })
            .catch((error) => console.log('Error in adding plant to wishlist.', error))
        } else {
            console.log('Missing plant_id | user_id: ', plant_id, user_id);
        }
    }

    //Return layout for individual Plant
    return (
        <Container className="plant-style">
            <Row className="plant-row-style">
                <Col>
                <Link to={`/plant/2`}>Test</Link>
                <Row><h3>{props.plant_name}</h3></Row>
                <Row><p>{props.plant_tip}</p></Row>
                <PlantIcons water_tip={props.water_tip}
                            sun_lvl={props.sun_lvl}
                            pet_friendly={props.is_toxic}
                            filters_air={props.filters_air}
                />
                </Col>
                <Col className="plant-col-style">
                <Row className="plant-row-image"><Image src={props.plant_image} rounded fluid/></Row>
                <Row>
                <Col></Col>
                <Col>{plantAdded ? <Button variant="secondary" size="sm">Plant added!</Button> : <Button variant="outline-secondary" size="sm" onClick={(e) => addPlantToProfile(e)} id={props.plant_id}>Add plant to profile</Button>}</Col>
                <Col>{wishlistPlantAdded ? <Button variant="secondary" size="sm">Added to wishlist!</Button> : <Button variant="outline-secondary" size="sm" onClick={(e) => addPlantToWishlist(e)} id={props.plant_id}>Add to wishlist</Button>}</Col>
                <Col></Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
};

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

        plantsArr.push(
            <Plant
              plant_name={plant.plant_name}
              plant_tip={plant.plant_tip}
              plant_image={plant.plant_image}
              plant_id={String(plant.plant_id)}
              is_toxic={plant.is_toxic}
              beginner_friendly={plant.beginner_friendly}
              plant_image={plant.plant_image}
              water_tip={plant.water_tip}
              plant_image={plant.plant_image}
              sun_lvl={plant.sun_lvl}
              filters_air={plant.filters_air}
              plant_details={plant.plant_details}
            />
        );
    }

    return (
        <div>{plantsArr}</div>
    );
};

