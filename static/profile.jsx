"use strict";


function ControlledCarousel(props) {
  const [index, setIndex] = React.useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const carouselPlantImages = [];
  props.plant_images.forEach((image)=> {
    carouselPlantImages.push(
      <Carousel.Item>
      <img
        className="d-block w-100 h-100"
        src={image}
        alt="First slide"
      />
    </Carousel.Item>
    )
  })

  // const carouselPlantImages = props.plant_images.map((plantImage)=>{
  //   <Carousel.Item>
  //   <img
  //     className="d-block w-100 h-100"
  //     src='http://res.cloudinary.com/leetpotato/image/upload/v1606346114/_original_Logo_draft_02_se0nhi.jpg'
  //     alt="First slide"
  //   />
  // </Carousel.Item>
  // });

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselPlantImages}
    </Carousel>
  )
};


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
  const [showRoomForm, setShowRoomForm] = React.useState(false);


  const myWidget = cloudinary.createUploadWidget(
    {cloudName: 'leetpotato', upload_preset: 'ml_default'},
    (error, result) => { if (result.event == "success") {
      const url = result.info.url;
      const payload = {'user_plant_id': props.user_plant_id, 'image_url': url}
      fetch('add_plant_image', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      //send a POST fetch request with userplantid and image url
      .then((response)=> response.json())
      //on success make a new request to get user plants
      .then(()=> console.log('Success in adding a new photo'))
      //on fail console log server error
      .catch((error)=> console.log(error))
    } else {
      console.log('Error in Cloudinary: ', error);
    }
  });

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

  const dropDownRooms = props.rooms.map((room)=> {
    return (
    <Dropdown.Item id={room.user_room_id}>{room.room_name}</Dropdown.Item>
  )});

  const handlePlantRoomClick = (e, user_plant_id) => {
    if(e.target.text !== '+ Add Room' && e.target.text !== undefined && e.target.text !== 'All rooms') {
      setShowRoomForm(false)
      const plantRoomName = e.target.text;
      const payload = {'user_plant_id': user_plant_id, 'user_room_id': e.target.id}
      console.log(payload)
      fetch(`/add_room_to_user_plant`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then((response)=> response.json())
      .then(()=> props.fetchPlants())
      .catch((error)=> console.log('Error in adding room to plant.'))
    }
  };

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
            <Row>
              {showRoomForm ?
              <Row>
                <DropdownButton
                  as={ButtonGroup}
                  key={'secondary'}
                  className={`dropdown-user-rooms`}
                  size="sm"
                  variant="outline secondary"
                  title="Select room"
                  onClick={(e)=>handlePlantRoomClick(e, props.user_plant_id)}
                >
                  { dropDownRooms }
                </DropdownButton>
              </Row> :
              <p onClick={()=> setShowRoomForm(true)}>Location: {props.room_name}</p>
              }
            </Row>
            <Row>
            <Button variant="outline-secondary"
                    size="sm"
                    id={props.user_plant_id}
                    onClick={()=> {myWidget.open()}}
                    >Add photo
            </Button>
            </Row>
            </Col>

        <Col sm={3}>
          {(props.plant_images).length > 0 ?
            <Row><ControlledCarousel plant_images={props.plant_images}/></Row> :
            <Row><Image className="wishlist-plant" src={props.plant_image} rounded fluid /></Row>
          }
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

const UserRoomsDropdown = (props) => {

  const [showRooms, setShowRooms] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState("");

  /* Swaps component between being an input form or drop down select of user rooms. */
  const roomsClick= (e) => {
    e.preventDefault();
    const clickedRoom = e.target.text;

    if (clickedRoom === '+ Add Room') setShowRooms(true);
    else if (clickedRoom === 'All rooms') props.fetchPlants();
    else if (clickedRoom !== undefined){
      // send fetch to get plants with selected room
      fetch(`/get_filtered_plants/${e.target.id}`)
      .then((response)=> response.json())
      .then((data)=> {
        if(data.length === 0) alert('No plants in room!')
        else props.updateUserPlants(data)
      })
      .catch((error)=> console.log('error in getting plants', error));
    }

  };
  /* Handles a click when a user adds a new room name to their profile. */
  const addRoomClick = (e) => {
    e.preventDefault();
    const addRoom = newRoom;
    const payload = {
      'user_id': localStorage['user_id'],
      'room_name': addRoom
    }
    fetch('/create_user_room', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
    .then((response)=> response.json())
    .then(()=> {
      props.getUserRooms();
      setShowRooms(false);
    })
    .catch(()=> console.log('Error in adding a new user room.'))
  }
  /* An array of user rooms passed down from UserPlantsContainer. */
  const userRooms = props.userRooms;
  const dropDownRooms = userRooms.map((room)=> {
    return (
    <Dropdown.Item eventKey="replace" id={room.user_room_id}>{room.room_name}</Dropdown.Item>
  )});


  return (
    <div>
    { showRooms ?
      <Row>
        <label>New room name:</label>
        <input name="room-name-input" onChange={(e)=>setNewRoom(e.target.value)}/>
        <Button variant="outline-secondary"
                size="sm"
                id="room-name-submit"
                onClick={(e)=> {
                  setShowRooms(false);
                  addRoomClick(e);
                }}
                >Add</Button>
      </Row>
      :
      <DropdownButton
        as={ButtonGroup}
        key={'secondary'}
        className={`dropdown-user-rooms`}
        size="sm"
        variant="outline secondary"
        title="My rooms"
        onClick={(e)=>{roomsClick(e)}}
      >
        <Dropdown.Item eventKey="0">All rooms</Dropdown.Item>
        <Dropdown.Divider />
        { dropDownRooms }
        <Dropdown.Divider />
        <Dropdown.Item eventKey="1">+ Add Room</Dropdown.Item>
      </DropdownButton>
    }
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

  const getUserRooms = () => {
    fetch(`/get_user_rooms.json/${localStorage['user_id']}`)
      .then((response)=> response.json())
      .then((data)=> updateUserRooms(data))
      .catch(()=> updateUserRooms([]))
  }

  React.useEffect(() => {
    const loggedInUserID = localStorage['user_id'];
    if(loggedInUserID) {
      getUserPlants();
      getUserRooms();
    }
  }, []);

  const [userRooms, updateUserRooms] = React.useState([]);

  //State for User's plants
  const [userPlants, updateUserPlants] = React.useState([]);
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
          room_name={plant.room_name}
          rooms={userRooms}
          plant_images={plant.plant_images}
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
  };

  return (
    <Container>

      <Row>
        <Col sm={3}></Col>
        <Col sm={6}><UserProfileInfo /></Col>
        <Col sm={3}></Col>
      </Row>

      <Row>
        <Col sm={3}>
          <UserRoomsDropdown
            getUserRooms={getUserRooms}
            userRooms={userRooms}
            updateUserPlants={updateUserPlants}
            fetchPlants={getUserPlants}
          />
        </Col>
        <Col sm={6}>{userPlantsArr}</Col>
        <Col sm={3}></Col>
      </Row>

    </Container>
  );


};