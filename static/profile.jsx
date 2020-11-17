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

const UserPlant = (props) => {

  const [updatePlant, updatePlantButton] = React.useState({
    updateButton: false
  });
  const [wateringDays, setWateringDays] = React.useState(null);

  const removePlantFromProfile = (e) => {

    const plant_id = e.target.id;

    if(plant_id) {
      fetch(`/delete_plant_from_profile/${plant_id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      })
      // .then(() => document.location.reload())
      .then(()=> props.fetchPlants())
      .catch((error) => console.log('Error in removing plant from profile.', error))
    } else {
      console.log('Missing plant_id', plant_id);
    }
  }

  //Handing button click for when User submits new last watered count
  const handleWateringClick = (plantId, daysSinceLastWatered, setVisible) => {

    console.log('clicked!!! watering days', plantId, daysSinceLastWatered);


    // Send a PATCH request to update the days since last watered for a User
      fetch('/update_days_since_last_water', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'plant_id': plantId, 'days_count': daysSinceLastWatered})
      })
      .then((response)=> response.json())
      .then((data)=> console.log('data returned from fetch', data))
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
            <Button variant="outline-secondary" size="sm" onClick={(e) => removePlantFromProfile(e)} id={props.user_plant_id}>Remove</Button>
          </Col>
          <Col sm={9}>
            <WateringDaysOfPlant plantId={props.user_plant_id} daysSinceLastWatered={3} updateDaysLastWatered={handleWateringClick} />
          </Col>
        </Row>
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

  return (
    <Row className="wishlistPlant">
      <Col>
      <Row><p>{props.plant_name}</p></Row>
      <Row><Button variant="outline-secondary" size="sm" onClick={(e) => removePlantFromWishlist(e)} id={props.plant_id}>Remove</Button></Row>
      </Col>
      <Col>
      <Row><Image className="wishlist-plant" src={props.plant_image} rounded fluid /></Row>
      </Col>
    </Row>
  );
}

const removePlantFromWishlist= (e) => {

  const plant_id = e.target.id;
  const user_id = localStorage['user_id'];

  if(plant_id && user_id) {
    fetch(`/delete_plant_from_wishlist/${plant_id}/${user_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => document.location.reload())
    .catch((error) => console.log('Error in removing plant from profile.', error))
  } else {
    console.log('Missing plant_id', plant_id);
  }
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
    fetch(`/get_user_plants.json/${loggedInUserID}`)
      .then((response) => response.json())
      .then((data) => {
        updateUserPlants(data)
      })
      .catch(() => updateUserPlants([]))
  }
  React.useEffect(() => {

    const loggedInUserID = localStorage['user_id'];

    if(loggedInUserID) {
      //Send a request for User's plants
      getUserPlants();

      //Send a request for User's wishlist
      fetch(`/get_user_wishlist.json/${loggedInUserID}`)
      .then((response) => response.json())
      .then((wishlist) => updateWishlist(wishlist))
      .catch(() => updateWishlist([]))
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
    for (let plant of userPlants) {
      userPlantsArr.push(
        <UserPlant
          plant_name={plant.plant_name}
          plant_image={plant.plant_image}
          water_tip={plant.water_tip}
          user_plant_id={plant.user_plant_id}
          days_to_water={plant.days_to_water}
          nickname={plant.nickname}
          key={plant.user_plant_id}
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
          plant_id={String(plant.plant_id)}
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