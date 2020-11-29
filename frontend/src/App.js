import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Subreddit from "./pages/Subreddit";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/r/:slug/">
                    <Subreddit />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
