import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home} />
        </Switch>
      </Router>
  );
}

export default App;
