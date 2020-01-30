import React,{Component} from "react";
import "./style.css";
import Picture from "./picture";

export default class Register extends Component{


    componentDidMount(){

        Picture(3,(e)=>{
            //点击确定后的回调函数
            this.head = e;
          }, function(e) {
            //点击取消后的回调函数
            console.log(e);
          })

    }

    state = {
        name:""
    }

    /**
     * 注册
     */
    register = ()=>{
       const { name } = this.state;
       if(name.trim() === ""){
          alert("请输入姓名");
       }

       localStorage.setItem("user",JSON.stringify({name,head:this.head}));

       this.props.history.push("/");

    }


    render(){

        return (
            <div>

                <div className="head-img">             
                    <img className="my-img" />                      
                    <input type="file" className="selImg" accept="image/*" multiple="" />
                    <i></i>
                </div>

                <div className="name box">
                  <span className="name-text lt">姓名:</span>
                  <p className="name-input gt"><input type="text" onChange={(e)=>{this.setState({name:e.currentTarget.value})}} value={this.state.name}/></p>
                </div>

                <div className="register" onClick={this.register}>注册</div>

            </div>
        )

    }

}