"use strict";

const App = () => {

  return (

    <Router>
      <div>
        <Switch>

          <Route path="/profile" >
            <NavbarComp />
            <UserPlantsContainer />
          </Route>

          <Route path="/plants" >
            <NavbarComp />
            <PlantContainer />
          </Route>

          <Route path="/">
            <NavbarComp />
            <Homepage />
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