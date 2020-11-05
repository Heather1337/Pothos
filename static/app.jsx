"use strict";

const App = () => {
  return (
    <div>
      <p>I am in the app jsx</p>
      <div class="container">

        <div class="row">
          <div class="col-3">
             SMALL COLUMN 
          </div>
          <div class="col-9">
            LARGER COLUMN 
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            SMALL COLUMN 
          </div>
          <div class="col-5">
             LARGER COLUMN 
          </div>
        </div>

      </div>
    </div>
  )
};

ReactDOM.render(<App></App>, document.getElementById("app"));