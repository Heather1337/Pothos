"use strict";


const App = () => {

  const [user , setUser] = React.useState({
    loggedIn: false,
  })

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
      console.log('useEffect triggered in App component')
      const loggedInUser = localStorage.getItem('user_id');
      if (loggedInUser) {
          const foundUser = loggedInUser;
          setUser(prevState => ({
              ...prevState,
              loggedIn: true,
          }));
          console.log('Found user in useEffect in login file ===>.', foundUser)
      }
    }, []);

    const logoutUser = () => {
      setUser(prevState => ({
        ...prevState,
        loggedIn: false
      }));
      localStorage.clear()
    }

  console.log('state in App:', user);
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/profile">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <UserPlantsContainer /> : <Redirect to="/" />}
          </Route>

          <Route path="/plants">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <PlantContainer /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/">
            {user.loggedIn ? <Redirect to="/profile" /> : <Homepage setUser={setUser}/>}
          </Route>

          <Route path="/watering-reminders">
            <NavbarComp user={user.loggedIn} logoutUser={logoutUser}/>
            {user.loggedIn ? <MessageForm /> : <Redirect to="/" />}
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

ReactDOM.render(<App></App>, document.getElementById("app"));





/*

<div>
      <Homepage />
      <PlantContainer />
    </div>


  <Router>
      <div>
        <Switch>
          <Route path="/plants">
            <PlantContainer />
          </Route>
           <Route path="/profile">
            <PlantContainer />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
  </Router>

*/