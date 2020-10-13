import React from "react";
import { Route, Switch } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Register from '../Register/Register'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'


function App() {
  return (
    <div>
      <Switch>
      <PublicOnlyRoute component={Login} path="/login">
          </PublicOnlyRoute>
      <PublicOnlyRoute component={Home} exact path="/">
          </PublicOnlyRoute>
      <PublicOnlyRoute component={Register} path="/register">
          </PublicOnlyRoute>
      </Switch>
    </div>
  );
}

export default App;
