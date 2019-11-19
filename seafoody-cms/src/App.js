import React from "react";
import Header from "./details/Header";
import Main from "./Main";
import Gender from "./mini routes/Gender";
import Company from "./mini routes/Company";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/gender/:genderId" component={Gender} />
          <Route path="/company/:companyId" component={Company}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
