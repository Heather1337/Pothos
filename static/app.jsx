"use strict";


const App = () => {

  const [user , setUser] = React.useState({
    loggedIn: false,
  });

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
      const loggedInUser = localStorage.getItem('user_id');
      if (loggedInUser) {
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
    };

    const notify = (text) => {
      Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "rgb(38, 61, 41, .7)",
        stopOnFocus: true
      }).showToast()
    };


  return (
    <Router>
      <div>
      <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
        <Switch>

          <Route path="/profile">
            {user.loggedIn ? <UserPlantsContainer notify={notify}/> : <Redirect to="/" />}
            {/* <Footer /> */}
          </Route>

          <Route exact path="/plants">
            {user.loggedIn ? <PlantContainer notify={notify}/> : <Redirect to="/" />}
            {/* <Footer /> */}
          </Route>

          <Route path="/watering-reminders">
            {user.loggedIn ? <MessageForm /> : <Redirect to="/" />}
            {/* <Footer /> */}
          </Route>

          <Route path="/wishlist">
            {user.loggedIn ? <WishListContainer notify={notify}/> : <Redirect to="/" />}
            {/* <Footer /> */}
          </Route>

          <Route path="/plant/:plantId" component={PlantView} />

          <Route exact path="/">
            {user.loggedIn ? <Redirect to="/plants" /> : <Homepage setUser={setUser}/>}
            {/* <Footer /> */}
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<App></App>, document.getElementById("app"));
