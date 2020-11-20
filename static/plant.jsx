"use strict";

const PlantIcons = (props) => {

    return (
        <Row>
            <Row>
                <div className="plant-icon"><i className="fas fa-sun"></i></div>
                <p>{props.sun_lvl}</p>
            </Row>
            <Row>
                <div className="plant-icon"><i className="fas fa-tint"></i></div>
                <p>  {props.water_tip}</p>
            </Row>
            <Row>
                <div className="plant-icon"><i className="fas fa-paw"></i></div>
                {props.pet_friendly ? <p>Not pet friendly</p> : <p>Pet friendly</p>}
            </Row>
            <Row>
                <div className="plant-icon"><i className="fas fa-wind"></i></div>
                {props.filters_air ? <p>Filters the air</p> : <p>Does not filter the air</p>}
            </Row>
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
        <Col>
        <NavbarComp/>
        <Row className="plant-page-top-row">
            <Col sm={1}></Col>
            <Col sm={5}>
                <Image src={plant.plant_image} className="plant-profile-image"></Image>
            </Col>
            <Col sm={3}>
                <Row><h3>{plant.plant_name}</h3></Row>
                <PlantIcons sun_lvl={plant.sun_lvl}
                            pet_friendly={plant.is_toxic}
                            filters_air={plant.filters_air}
                            water_tip={plant.water_tip}
                />
            <Row ><p className="plant-tip-profile">{plant.plant_tip}</p></Row>
            </Col>
            <Col sm={3}></Col>
        </Row>
        <Row >
            <Col sm={3}></Col>
            <Col sm={6} className="plant-bio-profile">
            <h5>Plant Bio</h5>
            <p>{plant.plant_details}</p>
            </Col>
            <Col sm={3}></Col>
        </Row>
        </Col>

    );
};