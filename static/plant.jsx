"use strict";

const Plant = ({match, location}) => {

    console.log(match.params.plantId)
    // const [plant, setPlant] = React.useState({})

    // React.useEffect(() => {
    //     // console.log('fetching plants...') //uncomment for debugging
    //     fetch(`/get_plant_by_id.json/${plant_id}`)
    //     .then((response) => response.json())
    //     .then((plant) => setPlant(plant))
    // }, []);

    return (
        <div>
            <p> This will be plant page </p>
            <p>Plant id: {match.params.plantId}</p>
        </div>
    );
};