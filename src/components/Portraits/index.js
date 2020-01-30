import React,{Component} from "react";
import "./style.css";

export default class Portraits extends Component {


    render(){

        return (
            <div className="portraits">
                <img className="portraits-img" src={this.props.url?this.props.url:null}/>
            </div>
        )

    }


}