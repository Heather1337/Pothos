"use strict";


/* ============ Setup for User plant & Logic for deleting a plant from User's profile ============== */

const UserPlant = (props) => {

    return (
      <Row className="userPlant">
        <p> {props.water_tip} </p>
        <p> {props.plant_name} </p>
        <Image id="user-plant-photo" src={props.plant_image} rounded fluid />
        <Row><Button variant="outline-secondary" onClick={(e) => removePlantFromProfile(e)} id={props.user_plant_id}>Remove Plant</Button></Row>
      </Row>
    );
}

const removePlantFromProfile = (e) => {

  const plant_id = e.target.id;

  if(plant_id) {
    fetch(`/delete_plant_from_profile/${plant_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(() => document.location.reload())
    .catch((error) => console.log('Error in removing plant from profile.', error))
  } else {
    console.log('Missing plant_id', plant_id);
  }
}

/* ============ Setup for plants in User Wishlist & Logic for deleting a plant from User's Wishlist ============== */

const WishlistPlant = (props) => {

  return (
    <Row className="wishlistPlant">
      <p> {props.water_tip} </p>
      <p> {props.plant_name} </p>
      <Image id="user-plant-photo" src={props.plant_image} rounded fluid />
      <Row><Button variant="outline-secondary" onClick={(e) => removePlantFromWishlist(e)} id={props.plant_id}>Remove from wishlist</Button></Row>
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

/*================= Search bar for searching for plants on a User's profile ====================*/

const ProfilePlantsSearch = () => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search for plant"
        aria-label="Searched for plant"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Search</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

/*============= Container for Profile Page & Logic for fetching User plants and Wishlist ================*/

const UserPlantsContainer = () => {

  React.useEffect(() => {

    const loggedInUserID = localStorage['user_id'];

    if(loggedInUserID) {
      //Send a request for User's plants
      fetch(`/get_user_plants.json/${loggedInUserID}`)
      .then((response) => response.json())
      .then((data) => {
        updateUserPlants(data)
      })
      .catch(() => updateUserPlants([]))

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
        />
      );
    }
  }

  //If there are plants in the User wishlist array, create nodes for them to display on profile.
  if(wishlist.length !== 0) {
    for (let plant of wishlistArr) {
      wishlistArr.push(
        <WishlistPlant
          plant_name={plant[i].plant_name}
          plant_tip={plant[i].plant_tip}
          plant_image={plant[i].plant_image}
          plant_id={String(plant[i].plant_id)}
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

  //Contains a user's plant wishlist
  const UserPlantWishlist = () => {
    return (
      <Container>
        <Col>{wishlistArr}</Col>
      </Container>
    )
  }


  return (
    <Container>

      <Row>
        <Col sm={4}><UserProfileInfo /></Col>
        <Col sm={8}><ProfilePlantsSearch /></Col>
      </Row>

      <Row>
        <Col sm={4}><UserPlantWishlist /></Col>
        <Col sm={8}>{userPlantsArr}</Col>
      </Row>

    </Container>
  );


}