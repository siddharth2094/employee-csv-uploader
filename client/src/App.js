import { BrowserRouter, Switch, Route } from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
import Header from "./Components/Header";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={EmployeeList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
