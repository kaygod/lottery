import React,{Component} from "react";
import "./style.css";
import Portraits from "../../../../components/Portraits";

export default class Prepare extends Component {


    render(){

        return (
            <div className="App-header">
                 <Portraits url={this.props.user.head}/>
                <div className="prepare" onClick={this.props.prepare}>开始游戏</div>
            </div>
        )
    }

}