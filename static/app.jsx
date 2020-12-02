"use strict";


const App = () => {

  const [user , setUser] = React.useState({
    loggedIn: false,
  })

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
      const loggedInUser = localStorage.getItem('user_id');
      if (loggedInUser) {
          // const foundUser = loggedInUser;
          setUser(prevState => ({
              ...prevState,
              loggedIn: true,
          }));
      }
    }, []);

    const logoutUser = () => {
      setUser(prevState => ({
        ...prevState,
        loggedIn: false
      }));
      localStorage.clear()
    }

    const notify = (text) => {
      Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        // backgroundColor: "linear-gradient(to right, #959988, #e8e7e3)",
        backgroundColor: "#6e846f",
        stopOnFocus: true
      }).showToast()
    }

    /*===== Callback for when User navigates to :id endpoint for plants. ======*/
    // const renderPlant = (routerProps) => {
    //   const plantID = parseInt(routerProps.match.params.id)
    //   console.log('in render plant: ', plantID)
    //   return(
    //   <React.Fragment>
    //     <NavbarComp user={user.loggedIn} logoutUser={logoutUser}></NavbarComp>
    //     <Plant plantID={plantID} />
    //   </React.Fragment>
    //   )
    // }

  return (
    <Router>
      <div>
        <Switch>

          <Route path="/profile">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <UserPlantsContainer notify={notify}/> : <Redirect to="/" />}
          </Route>

          <Route exact path="/plants">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser} />
            {user.loggedIn ? <PlantContainer notify={notify}/> : <Redirect to="/" />}
          </Route>

          <Route path="/watering-reminders">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <MessageForm /> : <Redirect to="/" />}
          </Route>

          <Route path="/wishlist">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <WishListContainer notify={notify}/> : <Redirect to="/" />}
          </Route>

          <Route path="/plant/:plantId" component={PlantView} />

          <Route exact path="/">
            {user.loggedIn ? <Redirect to="/plants" /> : <Homepage setUser={setUser}/>}
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

ReactDOM.render(<App></App>, document.getElementById("app"));
