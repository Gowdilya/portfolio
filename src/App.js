import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import SidePanel from "./components/SidePanel";
// @ts-ignore
import {
  BrowserRouter as Router,
  Switch,
  HashRouter,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import CSVViewer from "./components/CSVViewer";
import Resume from "./components/Resume";
import CSVGrapher from "./components/CSVGrapher";
import Tnt from "./Projects/tnt";
import Histogram from "./components/Histogram";

import { render } from "@testing-library/react";

function App() {
  return (
    <HashRouter basename="/">
      <div className="app">
        <SidePanel>
          <div className="App-intro">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/resume" component={Resume} />
              <Route path="/csv-viewer" component={CSVViewer} />
              <Route path="/csv-grapher" component={CSVGrapher} />
              <Route path="/tracking&traceability" component={Tnt} />
              <Route path="/histogram" component={Histogram} />
              <Redirect to="/" />
            </Switch>
          </div>
        </SidePanel>
      </div>
    </HashRouter>
  );
}

export default App;
