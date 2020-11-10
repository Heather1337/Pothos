"use strict";

const UserPlant = (props) => {
    return (
      <div className="userPlant">
        <p> {props.water_tip} </p>
        <p> {props.plant_name} </p>
        <Image src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-zz-plant_variant_large_hyde_black.jpg?v=1600813826" rounded fluid />
      </div>
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
      fetch('/get_user_plants.json')
      .then((response) => response.json())
      .then((data) => updateUserPlants(data))
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

    // userPlantsArr.push(
    //     <UserPlant
    //       plant_name={userPlants[0].plant_name}
    //       plant_details={userPlants[0].plant_id}
    //     />
    // );

    return (
      <Container>
        <Row>
          <Col>USER PROFILE DETAILS</Col>
          <Col xs={6}> PLACEHOLDER </Col>
          <Col> <ProfilePlantsSearch /> </Col>
        </Row>
        <Row>
          <Col>PLACEHOLDER</Col>
          <Col> USER PLANT WISHLIST</Col>
          <Col xs={6}>
          {userPlantsArr}
          </Col>
        </Row>
      </Container>
    );


}