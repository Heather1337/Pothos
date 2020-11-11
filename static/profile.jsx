"use strict";

const UserPlant = (props) => {
    return (
      <Row className="userPlant">
        <p> {props.water_tip} </p>
        <p> {props.plant_name} </p>
        <Image id="user-plant-photo" src={props.plant_image} rounded fluid />
      </Row>
    );
}

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
        .catch((error) => console.log('Error getting user plants...', error))
        }
      }, []);


    const [userPlants, updateUserPlants] = React.useState('userPlants');
    const userPlantsArr = [];

    for (let plant of userPlants) {
      userPlantsArr.push(
        <UserPlant
        plant_name={plant.plant_name}
        plant_image={plant.plant_image}
        water_tip={plant.water_tip}
        />
      );
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
      <Row><h3>Heather's Nursery</h3></Row>
      <Row>33 Plants</Row>
    </Container>
  )

}

const UserPlantWishlist = () => {

  return (
    <Container>
      <Row>Plant 1 on wishlist</Row>
      <Row>Plant 2 on wishlist</Row>
      <Row>Plant 3 on wishlist</Row>
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