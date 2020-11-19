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
        Update plant
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

const PlantIcons = (props) => {
  // let petFriendly = false;
  // console.log('pet friendly from server:', props.pet_friendly, 'in icons:', petFriendly)
  // if(props.pet_friendly === 'True') petFriendly = true;
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

const UserPlant = (props) => {

  const removePlantFromProfile = (e) => {

    const plant_id = e.target.id;

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
          <Row><p> Water in {props.days_to_water} days </p></Row>
          <Row><Image className="user-plant-photo" src={props.plant_image} rounded fluid /></Row>
          <Row>
          <Col sm={3}>
            <Button variant="outline-secondary"
                    size="sm"
                    onClick={(e) => removePlantFromProfile(e)}
                    id={props.user_plant_id}>
                      Remove
            </Button>
          </Col>
          <Col sm={9}>
            <WateringDaysOfPlant  plantId={props.user_plant_id}
                                  daysSinceLastWatered={props.last_watered}
                                  updateDaysLastWatered={handleWateringClick}
            />
          </Col>
          </Row>
        <PlantIcons water_tip={props.water_tip}
                    sun_lvl={props.sun_lvl}
                    pet_friendly={props.pet_friendly}
                    filters_air={props.filters_air}
        />
        </Col>
      </Row>
    );
}



// const addPlantNickname = (e) => {
//   e.preventDefault();
//   console.log('event target', e)
//   const plant_id = e.target.id;
//   const nickname = 'Qwerty';
//   const payload = {'plant_id': plant_id, 'nickname': nickname}

//   if(plant_id) {
//     fetch(`/add_nickname_to_plant`, {
//         method: 'PATCH',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     })
//     .then(() => document.location.reload())
//     .catch((error) => console.log('Error in removing plant from profile.', error))
//   } else {
//     console.log('Missing plant_id', plant_id);
//   }
// }

// const NicknameInput = (props) => {
//   return (
//     <Form onSubmit={(e)=>addPlantNickname(e)}>
//     <Form.Group controlId={props.plant_id}>
//       <Form.Control placeholder="Plant Nickname" />
//     </Form.Group>
//     <Button variant="outline-secondary" type="submit" id={props.plant_id}></Button>
//     </Form>
//   );
// }

/* ============ Setup for plants in User Wishlist & Logic for deleting a plant from User's Wishlist ============== */

const WishlistPlant = (props) => {

  const removePlantFromWishlist= (e) => {
    const plant_id = e.target.id;
    console.log('Wishlist plant ID: ', plant_id)
    const user_id = localStorage['user_id'];

    if(plant_id && user_id) {
      fetch(`/delete_plant_from_wishlist/${plant_id}/${user_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
      .then(() => props.getWishlist())
      .catch((error) => console.log('Error in removing plant from profile.', error))
    } else {
      console.log('Missing plant_id', plant_id);
    }
  }

  return (
    <Row className="wishlistPlant">
      <Col>
      <Row><p>{props.plant_name}</p></Row>
      <Row><Button variant="outline-secondary"
                  size="sm"
                  onClick={(e) => removePlantFromWishlist(e)}
                  id={props.plant_id}>Remove
      </Button></Row>
      </Col>
      <Col>
      <Row><Image className="wishlist-plant" src={props.plant_image} rounded fluid /></Row>
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

  )
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
      getUserWishlist();
    }
  }, []);


  //State for User's plants
  const [userPlants, updateUserPlants] = React.useState('userPlants');
  const userPlantsArr = [];
  //State for User's wishlist
  const [wishlist, updateWishlist] = React.useState('wishList');
  const wishlistArr = [];

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

  //If there are plants in the User wishlist array, create nodes for them to display on profile.
  if(wishlist.length !== 0) {
    for (let plant of wishlist) {
      wishlistArr.push(
        <WishlistPlant
          plant_name={plant.plant_name}
          plant_tip={plant.plant_tip}
          plant_image={plant.plant_image}
          // plant_id={String(plant.plant_id)}
          plant_id={plant.plant_id}
          getWishlist={getUserWishlist}
        />
      );
    }
  }

  //Contains plant count and nursery name
  const UserProfileInfo = () => {
    return (
      <Container>
        <Row><h3>Plant Profile</h3></Row>
        <Row>{userPlants.length} Plants</Row>
      </Container>
    )
  }

  return (
    <Container>

      <Row>
        <Col sm={4}><UserProfileInfo /></Col>
        <Col sm={5}></Col>
        <Col sm={3}><ProfilePlantsSearch /></Col>
      </Row>

      <Row>
        <Col sm={5}><Row><h3>Wishlist</h3></Row>
        <Col>{wishlistArr}</Col></Col>
        <Col sm={2}><p></p></Col>
        <Col sm={5}>{userPlantsArr}</Col>
      </Row>

    </Container>
  );


}