"use strict"

const WishlistPlant = (props) => {

    const removePlantFromWishlist= (e) => {
      const plant_id = e.target.id;
      const user_id = localStorage['user_id'];

      if(plant_id && user_id) {
        fetch(`/delete_plant_from_wishlist/${plant_id}/${user_id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        })
        .then(()=> props.notify('Removed plant from wishlist'))
        .then(() => props.getWishlist())
        .catch((error) => console.log('Error in removing plant from profile.', error))
      } else {
        console.log('Missing plant_id', plant_id);
      }
    }

    //If swapping background to plant images use: style={{
        //   backgroundImage: `url(${props.plant_image})`
        // }}

    return (
        <Row className="wishlistPlant" >
          <Col className="pad-l">
          <Row><p className="pn">{props.plant_name}</p></Row>
          <Row><Button variant="outline-secondary"
                      size="sm"
                      onClick={(e) => removePlantFromWishlist(e)}
                      id={props.plant_id}>Remove
          </Button></Row>
          </Col>
          <Col>
          <Row><Image className="wishlist-plant" src={props.plant_image} rounded fluid /></Row>
          </Col>
        </Row>
      );
}


const WishListContainer = (props) => {

    const getUserWishlist = () => {
        fetch(`/get_user_wishlist.json/${localStorage['user_id']}`)
        .then((response) => response.json())
        .then((wishlist) => updateWishlist(wishlist))
        .catch(() => updateWishlist([]))
    }

    React.useEffect(() => {
        const loggedInUserID = localStorage['user_id'];
        if(loggedInUserID) {
          //Send a request for User's wishlist
          getUserWishlist();
        }
    }, []);

    const [wishlist, updateWishlist] = React.useState('wishList');
    const wishlistArr = [];

      //If there are plants in the User wishlist array, create nodes for them to display on profile.
  if(wishlist.length !== 0) {
    for (let plant of wishlist) {
      wishlistArr.push(
        <WishlistPlant
          plant_name={plant.plant_name}
          plant_tip={plant.plant_tip}
          plant_image={plant.plant_image}
          notify={props.notify}
          plant_id={plant.plant_id}
          getWishlist={getUserWishlist}
        />
      );
    }
  }

  return (
    <Row>
    <Col sm={4}></Col>
    <Col sm={4}>
      <Col>
        <Row className="wishlist-title-container">
          <div className="wishlist-title">
            <div className="wishlist-title-text">Wishlist</div>
          </div>
        </Row>
      </Col>
      <Col className="padding-b">{wishlistArr}</Col>
    </Col>
    <Col sm={4}></Col>
    </Row>
  )
}
