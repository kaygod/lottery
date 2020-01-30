import React,{Component} from 'react';
import './App.css';
import Game from "./components/Game";
import Prepare from "./components/Prepare";
import Score from "./components/Score";

export default class App extends Component{


  constructor(props){

    super(props);

    let user = localStorage.getItem("user");

    if(user){

        let data = JSON.parse(user);
        
        this.state = {
            user:data,
            status:1
        }

    }else{

      this.state = {
        status:1
      }
       
      this.props.history.push("/register");

    }

  }

  /**
   * 开始游戏
   */
  prepare = ()=>{
    
    this.setState({
      status:2
    })

  }

  /**
   * 玩完游戏
   */
  completeGame = ()=>{

    this.setState({
      status:3
    })

  }


  render(){

    const { status,user={} } = this.state;

    return (
      <div className="App">

          {
            status == 1?<Prepare prepare={this.prepare} user={user}/>:(status == 2?<Game completeGame={this.completeGame}/>:<Score user={user}/>)
          }

      </div>
    );

  }

}

