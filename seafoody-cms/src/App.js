import React from "react";
import Header from "./details/Header";
import Main from "./Main";
import Gender from "./mini routes/Gender";
import ProductType from "./mini routes/ProductType";
import Company from "./mini routes/Company";
import User from "./mini routes/User";
import UserEdit from "./details/edit/user";
import CompanyEdit from "./details/edit/company";
import ProductEdit from "./details/edit/product";
import HoadonEdit from "./details/edit/hoadon";
import QLHoadon from "./details/QLHoadon";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div style={{ margin: 20 }}>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/gender/:genderId" component={Gender} />
            <Route path="/ptype/:ptypeId" component={ProductType} />
            <Route path="/companies/:companyId" component={Company} />
            <Route path="/users/:userId" component={User} />
            <Route path="/user/edit/:uid" component={UserEdit} />
            <Route path="/company/edit/:companyId" component={CompanyEdit} />
            <Route path="/product/edit/:productId" component={ProductEdit} />
            <Route path="/hoadon/edit/:hoadonId" component={HoadonEdit} />
            <Route path="/bills/:hoadon" component={QLHoadon}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
