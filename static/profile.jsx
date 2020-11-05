"use strict";

const UserPlant = (props) => {
    return (
      <div className="userPlant">
        <p> {props.plant_name} </p>
        <img src={`/images/${props.plant_img}`} />
        <p> {props.is_toxic} </p>
        <p> {props.filters_air} </p>
        <p> {props.sun_lvl} </p>
        <p> {props.beginner_friendly} </p>
        <p> {props.water_schedule} </p>
        <p> {props.water_tip} </p>
        <p> {props.plant_tip} </p>
        <p> {props.plant_details} </p>
      </div>
    );
}

const UserPlantsContainer = (props) => {
    React.useEffect(() => {
        fetch('/get_user_plants.json')
        .then((response) => response.json())
        .then((data) => updateCards(data))
    }, []);

    const [userPlants, updatePlants] = React.useState('userPlants');
    const userPlantsArr = [];
    for (const currentPlant of userPlants) {
        userPlantsArr.push(
            <UserPlant
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
              plant_id={currentPlant.plant_id}
            />
        )
    }

}