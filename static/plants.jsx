"use strict";


const PlantIcons = (props) => {

    return (
      <Row>
        <Col>
            <Row><i className="fas fa-sun"></i>
                <p className="pl-attr">{props.sun_lvl}</p>
            </Row>
            <Row><i className="fas fa-tint"></i>
                <p className="pl-attr">  {props.water_tip}</p>
            </Row>
            <Row><i className="fas fa-paw"></i>
                {props.pet_friendly ? <p className="pl-attr">Not pet friendly</p> : <p className="pl-attr">Pet friendly</p>}
            </Row>
            <Row><i className="fas fa-wind"></i>{
                props.filters_air ? <p className="pl-attr">Filters the air</p> : <p className="pl-attr">Does not filter the air</p>}
            </Row>
        </Col>
      </Row>
    )
}

const PlantSearchBar = (props) => {
    const [searchedForPlant, setSearchedForPlant] = React.useState("");

    return (
        <Row >
        <input
          className="plant-search-bar"
          name="plantSearchBar"
          value={""}
          placeholder="Search for plant"
          onChange={(e) => setSearchedForPlant(e.target.value)}
        />
        </Row>
    )
};


const ProfilePlantsSearch = (props) => {

    const handlePlantsFilter = (e) => {
        e.preventDefault();
        const filterBy = e.target.text;

        if(filterBy !== undefined) {
            console.log(filterBy)
            fetch(`/filter_plants_by/${filterBy}`)
            .then((response) => response.json())
            .then((plants) => props.updatePlants(plants))
            .catch((error) => console.log('Error in filtering plants: ', error))
        }
    };

    return (
      <div>
        <DropdownButton
          as={ButtonGroup}
          key={'secondary'}
          id={`dropdown-user-plants`}
          size="sm"
          variant="outline secondary"
          title="Filter plants"
          onClick={(e)=>{handlePlantsFilter(e)}}
        >
          <Dropdown.Item eventKey="1" >Pet friendly</Dropdown.Item>
          <Dropdown.Item eventKey="2">Beginner friendly</Dropdown.Item>
          <Dropdown.Item eventKey="3">Filters air</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Bright light</Dropdown.Item>
          <Dropdown.Item eventKey="5">Medium bright light</Dropdown.Item>
          <Dropdown.Item eventKey="6">Low light</Dropdown.Item>
        </DropdownButton>
     </div>
    )
};

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
            .then(()=>props.notify('Added plant to profile!'))
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
            .then(()=> props.notify('Plant added to wishlist'))
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
                <Row>
                <Link to={`/plant/${props.plant_id}`} className="link-to-plant">
                    <Image src={props.plant_image} rounded fluid className="plant-row-image"/>
                </Link>
                </Row>
                <Row className="plant-name-container"><p>{props.plant_name}</p></Row>
                <Row className="plant-button-container">
                <Col className="btn-cont">{plantAdded ?
                    <Button variant="secondary" size="sm">Plant added!</Button> :
                    <Button variant="outline-secondary"
                            size="sm"
                            onClick={(e) => addPlantToProfile(e)}
                            id={props.plant_id}>Add plant
                    </Button>}
                </Col>
                <Col className="btn-cont">{wishlistPlantAdded ?
                    <Button variant="secondary" size="sm">Added to wishlist!</Button> :
                    <Button variant="outline-secondary"
                            size="sm"
                            onClick={(e) => addPlantToWishlist(e)}
                            id={props.plant_id}>Wishlist
                    </Button>}
                </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    );
};

/*=================== Layout and logic for container of Plant nodes =====================*/

const PlantContainer = (props) => {

    React.useEffect(() => {
        // console.log('fetching plants...') //uncomment for debugging
        fetch('/get_plants.json')
        .then((response) => response.json())
        .then((plants) => updatePlants(plants))
    }, []);

    const [plants, updatePlants] = React.useState([]);
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
              notify={props.notify}
            />
        );
    }

    const makePlantRows = (plantsArr) => {
        let rows = [];
        for(let i = 0; i < plantsArr.length; i=i+3) {
            rows.push(
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                    {plantsArr[i]}
                    </Col>
                    <Col sm={4}>
                    {plantsArr[i+1]}
                    </Col>
                    <Col sm={3}>
                    {plantsArr[i+2]}
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            );
        }
        return rows
    }

    const plantRows = makePlantRows(plantsArr)

    return (
        <React.Fragment>
            <Row className="plant-filter-search">
                {/* <PlantSearchBar /> */}
                <Col></Col>
                <ProfilePlantsSearch updatePlants={updatePlants} />
            </Row>
            {plantRows}
        </React.Fragment>
    );
};

