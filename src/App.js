import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import "./style.scss";
import { useEffect } from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Topnav from "./components/Topnav";
import { useSelector, useDispatch } from "react-redux";
import themeAction from "./redux/actions/ThemeAction";

function App() {
  const dispatch = useDispatch();
  const ThemeReducer = useSelector(state => state.ThemeReducer);
  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", 'theme-mode-light');
    const colorClass = localStorage.getItem("colorMode", 'theme-mode-light');
    dispatch(themeAction.setMode(themeClass));
    dispatch(themeAction.setColor(colorClass));
  }, [dispatch]);


  return (
    <div className={`main-body ${ThemeReducer.mode} ${ThemeReducer.color}`}>
     <BrowserRouter>
      <Sidebar />
      <Switch>
       <div className="main-right">
        <Topnav />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/customers" component={Customers} />
      </div>
      </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
