"use strict";


const App = () => {

  const [user , setUser] = React.useState({
    loggedIn: false,
  })

    /*==== Checks to see if there is a logged in user when loading site =====*/
    React.useEffect(() => {
      console.log('useEffect triggered in App component')
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
          const foundUser = loggedInUser;
          setState(prevState => ({
              ...prevState,
              loggedIn: true,
          }));
          console.log('Found user in useEffect in login file ===>.', foundUser)
      }
    }, []);

  console.log('state in App:', user);
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/profile">
            <NavbarComp user={user.loggedIn}/>
            <UserPlantsContainer />
          </Route>

          <Route path="/plants">
            <NavbarComp user={user.loggedIn}/>
            <PlantContainer />
          </Route>

          <Route exact path="/">
            <NavbarComp user={user.loggedIn}/>
            {user.loggedIn ? <Redirect to="/profile" /> : <Homepage setUser={setUser}/>}
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