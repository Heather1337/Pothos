"use strict";

const Plant = (props) => {
    return (
        <Container className="userPlant">
            <Row>
                <Col><p>{props.plant_name}</p></Col>
                <Col><p>{props.plant_tip}</p></Col>
                <Col><Image src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-zz-plant_variant_large_hyde_black.jpg?v=1600813826" rounded fluid/></Col>
            </Row>
        </Container>
    );
}

const PlantContainer = () => {

    React.useEffect(() => {
        fetch('/get_plants.json')
        .then((response) => response.json())
        .then((data) => updatePlants(data))
    }, []);

    const [plants, updatePlants] = React.useState('plants');
    const plantsArr = [];
    for (var i = 0; i < 5; i++) {
        plantsArr.push(
            <Plant
              plant_name={plants[i].plant_name}
              plant_tip={plants[i].plant_tip}
              plant_image={plants[i].plant_image}
            />
        );
    }

    return (
        <div>{plantsArr}</div>
    );
}

