import React,{Component} from "react";
import Portraits from "../../../../components/Portraits";


export default class Score extends Component{

    state={
        score:0
    }

    constructor(props){
        super(props);
        let data = JSON.parse(localStorage.getItem("score"));
        this.state = {
            score:data.score
        }
    }

    render(){

        return (
            <div className="App-header">
              <Portraits url={this.props.user.head}/>  
              恭喜{this.props.user.name},您的得分为{this.state.score*10}分
            </div>
        )

    }

}