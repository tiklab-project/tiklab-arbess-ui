import React from 'react'
import Login from "./modules/login/login";
import Home from "./modules/home/home";
import {BrowserRouter,Switch,Route} from "react-router-dom";

const App=()=> {
  return (
      <BrowserRouter>
          < Switch >
              <Route path='/login' component={Login}/>
              <Route path='*' component={Home}/>
          </Switch>
      </BrowserRouter>

  );
}

export default App;
