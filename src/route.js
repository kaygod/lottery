import { HashRouter as Router, Route,Switch } from 'react-router-dom'
import React,{Component} from "react";
import App from "./containers/App/App";
import Register from "./containers/Register";

export default class RouterComponent extends Component{

    render(){

        return (
            <Router>
                <Switch>
                    <Route path='/register' component={Register} />  
                    <Route path='/' component={App} />
                </Switch>
            </Router>
        )

    }

}