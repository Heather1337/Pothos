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

const PlantCommentForm = (props) => {

    return (
        <Form>
            <Form.Group controlId="plantCommentForm" id="plantForm">
            <Form.Label>Share your experience with this plant</Form.Label>
            <Form.Control as="textarea" id="plantComment" rows={3} />
            </Form.Group>
            <Button className="comment-submit" variant="outline-secondary" size="sm" onClick={(e)=>props.handlePlantCommentSubmit(e)} id={props.plant_id}>Submit</Button>
        </Form>
    )
};


const PlantComment = (props) => {
    return (
        <Col className="plant-comment-container">
         <Row className="pcc">
         <i className="fas fa-star"></i>
         <i className="fas fa-star "></i>
         <i className="fas fa-star "></i>
         <i className="fas fa-star"></i>
         <i className="fas fa-star"></i>

        </Row>
         <Row className="pcc">
            <p>{props.userComment}</p>
        </Row>
        </Col>
    )
};

const PlantView = ({match, location}) => {

    const plant_id = match.params.plantId;
    const [plant, setPlant] = React.useState({});
    const [comments, setComments] = React.useState([]);

    const getComments = (plant_id) => {
        fetch(`/get_plant_comments/${plant_id}`)
        .then((response)=> response.json())
        .then((data)=>setComments(data))
        .catch((error)=>console.log(error))
    };

    React.useEffect(() => {
        fetch(`/get_plant_by_id.json/${plant_id}`)
        .then((response) => response.json())
        .then((plant) => setPlant(plant))

        getComments(plant_id);
    }, []);

    const plantComments = []
    if(comments.length !== 0) {
        for (const userComment of comments) {
            plantComments.push(<PlantComment userComment={userComment}/>);
        }
    }

    const handlePlantCommentSubmit = (e) => {
        e.preventDefault();
        const comment = document.getElementById('plantComment').value;
        const plantId = e.target.id;
        const payload = {
            'user_id': localStorage['user_id'],
            'plant_id': e.target.id,
            'comment': comment
        }
        fetch('/add_plant_comment',  {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then((response) => response.json())
        .then(getComments(plantId))
        .catch((error)=> console.log(error))

    }

    return (
        <Col>
        <NavbarComp/>
        <Row className="plant-page-top-row">
            <Col sm={3}></Col>
            <Col sm={3}>
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
            <h5 className="pb-title">Plant Bio</h5>
            <p>{plant.plant_details}</p>
            </Col>
            <Col sm={3}></Col>
        </Row>
        <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
            <PlantCommentForm plant_id={plant.plant_id} handlePlantCommentSubmit={handlePlantCommentSubmit}/>
            </Col>
            <Col sm={3}></Col>
        </Row>
        <Row>
            <Col sm={3}></Col>
            <Col sm={6} className="comments-container">
            {plantComments}
            </Col>
            <Col sm={3}></Col>
        </Row>
        </Col>

    );
};