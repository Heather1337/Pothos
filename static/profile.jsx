"use strict";

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
  const user_id = localStorage['user_id']

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


const removePlantFromProfile = (e) => {
  const plant_id = e.target.id;
  console.log('plant id trying to delete:', plant_id)
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

//'/delete_plant_from_wishlist/<plant_id>/<user_id>'

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

const UserPlantsContainer = () => {

      React.useEffect(() => {
        const loggedInUserID = localStorage['user_id']
        if(loggedInUserID) {

        console.log('user logged in...fetching user plants with: ', loggedInUserID)
        fetch(`/get_user_plants.json/${loggedInUserID}`)
        .then((response) => response.json())
        .then((data) => {
          updateUserPlants(data)
        })
        .catch((error) => updateUserPlants([]))


        console.log('fetching users wishlist...')
        fetch(`/get_user_wishlist.json/${loggedInUserID}`)
        .then((response) => response.json())
        .then((wishlist) => updateWishlist(wishlist))
        .catch((error) => updateWishlist([]))

        }
      }, []);


    const [userPlants, updateUserPlants] = React.useState('userPlants');
    const userPlantsArr = [];
    const [wishlist, updateWishlist] = React.useState('wishList');
    const wishlistArr = [];

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

    if(wishlist.length !== 0) {
      for (var i = 0; i < wishlist.length; i++) {
        wishlistArr.push(
            <WishlistPlant
              plant_name={wishlist[i].plant_name}
              plant_tip={wishlist[i].plant_tip}
              plant_image={wishlist[i].plant_image}
              plant_id={String(wishlist[i].plant_id)}
            />
        )
      }
    }
 



const UserProfileInfo = () => {
  // React.useEffect(() => {
    //fetch for user info
    //then parse info
    //then update state with info
  // })

  // const [userInfo, updateUserInfo] = React.useState('userInfo');

  return (
    <Container>
      <Row><h3>Plant Profile</h3></Row>
      <Row>33 Plants</Row>
    </Container>
  )

}

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