"use strict";


const PlantIcons = (props) => {

    return (
      <Row>
        <Col>
            <Row><i className="fas fa-sun"></i>
                <p>{props.sun_lvl}</p>
            </Row>
            <Row><i className="fas fa-tint"></i>
                <p>  {props.water_tip}</p>
            </Row>
            <Row><i className="fas fa-paw"></i>
                {props.pet_friendly ? <p>Not pet friendly</p> : <p>Pet friendly</p>}
            </Row>
            <Row><i className="fas fa-wind"></i>{
                props.filters_air ? <p>Filters the air</p> : <p>Does not filter the air</p>}
            </Row>
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
                <Col className="plant-col-style">
                <Row><p>{props.plant_name}</p></Row>
                <Row>
                <Link to={`/plant/${props.plant_id}`} className="link-to-plant">
                    <Image src={props.plant_image} rounded fluid className="plant-row-image"/>
                </Link>
                </Row>
                <Row>
                <Col>{plantAdded ?
                    <Button variant="secondary" size="sm">Plant added!</Button> :
                    <Button variant="outline-secondary"
                            size="sm"
                            onClick={(e) => addPlantToProfile(e)}
                            id={props.plant_id}>Add plant to profile
                    </Button>}
                </Col>
                <Col>{wishlistPlantAdded ?
                    <Button variant="secondary" size="sm">Added to wishlist!</Button> :
                    <Button variant="outline-secondary"
                            size="sm"
                            onClick={(e) => addPlantToWishlist(e)}
                            id={props.plant_id}>Add to wishlist
                    </Button>}
                </Col>
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

    const makePlantRows = (plants) => {
        let rows = [];
        for(let i = 0; i < plantsArr.length; i=i+4) {
            rows.push(
                <Row>
                    <Col>
                    {plantsArr[i]}
                    </Col>
                    <Col>
                    {plantsArr[i+1]}
                    </Col>
                    <Col>
                    {plantsArr[i+2]}
                    </Col>
                    <Col>
                    {plantsArr[i+3]}
                    </Col>
                </Row>
            )
        }
        return rows
    }

    const plantRows = makePlantRows(plantsArr)

    return (
        // <React.Fragment>
        //     {plantsArr}
        // </React.Fragment>
        <React.Fragment>
            {
                plantRows
            }
        </React.Fragment>
    );
};

