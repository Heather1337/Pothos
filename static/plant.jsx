"use strict";

const PlantIcons = (props) => {

    return (
      <Row>
        <Col>
            <Row><i className="fas fa-sun"></i>
                <p>{props.sun_lvl}</p>
            </Row>
            <Row><i className="fas fa-tint"></i>
                <p>  {props.water_tip}</p>
            </Row>
            <Row><i className="fas fa-paw"></i>
                {props.pet_friendly ? <p>Not pet friendly</p> : <p>Pet friendly</p>}
            </Row>
            <Row><i className="fas fa-wind"></i>{
                props.filters_air ? <p>Filters the air</p> : <p>Does not filter the air</p>}
            </Row>
        </Col>
      </Row>
    )
};

const PlantView = ({match, location}) => {

    // console.log(match.params.plantId)
    const plant_id = match.params.plantId
    const [plant, setPlant] = React.useState({})

    React.useEffect(() => {
        // console.log('fetching plants...') //uncomment for debugging
        fetch(`/get_plant_by_id.json/${plant_id}`)
        .then((response) => response.json())
        .then((plant) => setPlant(plant))
    }, []);

    return (
        <div>
            <p> This will be plant page </p>
            <p>Plant id: {match.params.plantId}</p>
            <p>{"" + plant.is_toxic}</p>
            <p>{"" + plant.beginner_friendly}</p>
            <p>{plant.water_tip}</p>
            <p>{plant.plant_details}</p>
            <p>{"" + plant.filters_air}</p>
            <p>{plant.plant_name}</p>
            <p>{plant.plant_tip}</p>
            <p>{plant.plant_id}</p>
            <p>{plant.sun_lvl}</p>
            <p>{plant.plant_tip}</p>
        </div>
    );
};