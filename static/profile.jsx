"use strict";


/* ============ Setup for User plant & Logic for deleting a plant from User's profile ============== */

const WateringDaysOfPlant = ({
  plantId, ...props
}) => {
  const [visible, setVisible] = React.useState(false);
  const [daysSinceLastWatered, setDaysSinceLastWatered] = React.useState(props.daysSinceLastWatered);

  const updateBtn = (
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => setVisible(!visible)}
        id={plantId}
      >
        Edit
      </Button>
  );
  const wateringDaysInput = (
      <Row>
      <label>Days since last watering:</label>
      <input
        type="number"
        id="daysSinceWater"
        name="daysSinceLastWater"
        min="0"
        max="21"
        value={daysSinceLastWatered}
        onChange={(e) => setDaysSinceLastWatered(e.target.value)}
      />
      <Button
        variant="outline-secondary"
        onClick={() => {
          setVisible(false);
          props.updateDaysLastWatered(
            plantId,
            daysSinceLastWatered,
            props.setVisible
          );
          }
        }
        size="sm"
        id={props.plantId}
      >
        Update
      </Button>
    </Row>
  );

  return (
    <React.Fragment>
      {visible ? wateringDaysInput : updateBtn}
    </React.Fragment>
  );
}

const UserPlant = (props) => {

  const removePlantFromProfile = (e) => {

    const plant_id = e.target.id;
    console.log(e.target, 'event target in remove plant')

    if(plant_id) {
      fetch(`/delete_plant_from_profile/${plant_id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      })
      .then(()=> props.fetchPlants())
      .catch((error) => console.log('Error in removing plant from profile.', error))
    } else {
      console.log('Missing plant_id', plant_id);
    }
  }

  //Handing button click for when User submits new last watered count
  const handleWateringClick = (plantId, daysSinceLastWatered) => {

    console.log('clicked!!! watering days', plantId, daysSinceLastWatered);


    // Send a PATCH request to update the days since last watered for a User
      fetch('/update_days_since_last_water', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'plant_id': plantId, 'days_count': daysSinceLastWatered})
      })
      .then((response)=> response.json())
      .then(()=> props.fetchPlants())
      .catch((error)=> console.log('Error in updating watering days.', error));

  }

    return (
      <Row className="userPlant">
        <Col className="user-plant-col">
            <Row><h5> {props.plant_name} </h5></Row>
            <Row>
              <div className="water-days-count"><p> Water in {props.days_to_water} days </p></div>
              <Col sm={6}><WateringDaysOfPlant  plantId={props.user_plant_id}
                                    daysSinceLastWatered={props.last_watered}
                                    updateDaysLastWatered={handleWateringClick}
              /></Col>
            </Row>
            </Col>

        <Col sm={3}>
          <Row><Image className="wishlist-plant" src={props.plant_image} rounded fluid /></Row>
        </Col>
        <Col sm={1}>
          <div className="user-plant-delete-button">
          <Button variant="outline-secondary"
                  size="sm"
                  onClick={(e) => removePlantFromProfile(e)}
                  id={props.user_plant_id}
                  >x
          </Button>
          </div>
        </Col>

      </Row>
    );
}


/*================= DROP DOWN filter for searching for plants on a User's profile ====================*/

const ProfilePlantsSearch = () => {

  return (
    <div>
      <DropdownButton
        as={ButtonGroup}
        key={'secondary'}
        id={`dropdown-user-plants`}
        size="sm"
        variant="outline secondary"
        title="Filter plants"
      >
        <Dropdown.Item eventKey="1">Pet friendly</Dropdown.Item>
        <Dropdown.Item eventKey="2">Beginner friendly</Dropdown.Item>
        <Dropdown.Item eventKey="3">Filters air</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Bright light</Dropdown.Item>
        <Dropdown.Item eventKey="5">Medium bright light</Dropdown.Item>
        <Dropdown.Item eventKey="6">Low light</Dropdown.Item>
      </DropdownButton>
   </div>

  );
}

/*============= Container for Profile Page & Logic for fetching User plants and Wishlist ================*/

const UserPlantsContainer = () => {
  const getUserPlants = () => {
    fetch(`/get_user_plants.json/${localStorage['user_id']}`)
      .then((response) => response.json())
      .then((data) => updateUserPlants(data))
      .catch(() => updateUserPlants([]))
  }

  const getUserWishlist = () => {
    fetch(`/get_user_wishlist.json/${localStorage['user_id']}`)
    .then((response) => response.json())
    .then((wishlist) => updateWishlist(wishlist))
    .catch(() => updateWishlist([]))
  }

  React.useEffect(() => {

    const loggedInUserID = localStorage['user_id'];

    if(loggedInUserID) {
      //Send a request for User's plants
      getUserPlants();

      //Send a request for User's wishlist
      // getUserWishlist();
    }
  }, []);


  //State for User's plants
  const [userPlants, updateUserPlants] = React.useState('userPlants');
  const userPlantsArr = [];

  //If there are plants in the User plants array, create nodes for them to display on profile.
  if(userPlants.length !== 0) {
    const sortedPlants = [].concat(userPlants)
                         .sort((a, b) => (a.days_to_water > b.days_to_water) ? 1 : -1)

    for (let plant of sortedPlants) {
      userPlantsArr.push(
        <UserPlant
          plant_name={plant.plant_name}
          plant_image={plant.plant_image}
          water_tip={plant.water_tip}
          sun_lvl={plant.sun_lvl}
          filters_air={plant.filters_air}
          pet_friendly={plant.pet_friendly}
          user_plant_id={plant.user_plant_id}
          days_to_water={plant.days_to_water}
          nickname={plant.nickname}
          key={plant.user_plant_id}
          last_watered={plant.last_watered}
          fetchPlants={getUserPlants}
        />
      );
    }
  }



  //Contains plant count and nursery name
  const UserProfileInfo = () => {
    return (
      <React.Fragment>
        <h3>{userPlants.length} Plants</h3>
      </React.Fragment>
    )
  }

  return (
    <Container>

      <Row>
        <Col sm={3}></Col>
        <Col sm={6}><UserProfileInfo /></Col>
        <Col sm={3}></Col>
      </Row>

      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>{userPlantsArr}</Col>
        <Col sm={3}></Col>
      </Row>

    </Container>
  );


};