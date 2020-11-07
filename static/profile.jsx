"use strict";

const UserPlant = (props) => {
    return (
      <div className="userPlant">
        <p> {props.plant_details} </p>
        <p> {props.plant_name} </p>
      </div>
    );
}

const UserPlantsContainer = () => {

    React.useEffect(() => {
      fetch('/get_user_plants.json')
      .then((response) => response.json())
      .then((data) => updateUserPlants(data))
    }, []);

    const [userPlants, updateUserPlants] = React.useState('userPlants');
    const userPlantsArr = [];
    print('USER PLANTS ARRAY:', userPlantsArr)
    userPlantsArr.push(
        <UserPlant
          plant_name={userPlants[0].plant_name}
          plant_details={userPlants[0].plant_id}
        />
    );

    return (
      <div>{userPlantsArr}</div>
    );


}