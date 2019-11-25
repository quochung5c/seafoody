import React from "react";
import Header from "./details/Header";
import Main from "./Main";
import Gender from "./mini routes/Gender";
import Company from "./mini routes/Company";
import User from './mini routes/User';
import UserEdit from './details/edit/UserEdit';

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
          <Route path="/users/:userId" component={User}/>
          <Route path="/user/edit/:uid" component={UserEdit}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
