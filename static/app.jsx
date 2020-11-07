"use strict";

const App = () => {

  return (

    <Router>
      <div>
        <Switch>

          <Route path="/profile" >
            <UserPlantsContainer />
          </Route>

          <Route path="/plants" >
            <PlantContainer />
          </Route>

          <Route path="/">
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