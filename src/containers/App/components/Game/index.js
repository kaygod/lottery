import React,{Component} from 'react';
import './style.css';
import Hammer from "hammerjs";

class Tip extends Component{

  componentDidMount(){
    if(this.refs.tip){
      this.refs.tip.addEventListener("animationend",()=>{
        const {index} = this.props;
        this.props.animationEnd(index);
     })
    }
  }


  render(){

    const { score } = this.props;

    if(score>1){

      return (
      <div className="tip" ref="tip"><div className="item">暴击 ×{score}</div></div>
      )  

    }else{
      return null;
    }

  }

 
}


export default class Game extends Component{

 state = {
   score:0,
   hasClass:false,
   hasRipple:false,
   time:0,
   num:[]
 }

 componentDidMount(){

  this.count = 0;//计算动画次数

  this.tapEventInit();

  this.rippleEventInit();

  this.startGame();

 }

 completeGame = ()=>{

   const { score } = this.state;

   let params = {
    score,
    status:3
   }

   localStorage.setItem("score",JSON.stringify(params));

   this.props.completeGame();

 }

 /**
  * 开始游戏
  */
 startGame = ()=>{

    let time = 30;


    this.setState({
        time
    },()=>{

           let timer = setInterval(()=>{

             time--;
             
             this.setState({
                time
             })

             if(time<=0){
                clearInterval(timer);
                this.completeGame();
             }
                
           },1000) 

    })

 }

 /**
  * 波纹事件初始化
  */
 rippleEventInit = ()=>{

    this.refs.ripple.addEventListener("animationend",()=>{
    
        this.count++;
    
        if(this.count>=2){
          this.setState({
            hasRipple:false
          })
          this.count = 0;
        }
    
      })

 }

 /**
  * 暴击逻辑编写
  */
 critical = (score)=>{

   if(score == 1){
      return false;
   }

   let num = [...this.state.num];

   num.push(score);

   this.setState({
     num
   })

 }

 /**
  * 每个文案的暴击动画结束
  */
 animationEnd = (index)=>{

    let num = [...this.state.num];

    num[index] = null;

    this.setState({
      num
    })

 }

 /**
  * 获取暴击分数
  */
 getCriticalScore = ()=>{

    let score = 1;

    const random = parseInt(Math.random()*20)+1;

    switch (random) {
      case 7:      
        score = 3; 
        break;
      case 17:      
        score = 3; 
        break;
      case 18:      
        score = 5; 
        break;
      case 19:      
        score = 8; 
        break;
      case 20:      
        score = 10; 
        break;      
    }

    return score;

 }

  /**
   * 点击事件初始化
   */
  tapEventInit = ()=>{

    const manager = new Hammer(this.refs.btn);

    // Create a recognizer
    const Tap = new Hammer.Tap({
      interval: 1
    });
  
    // Add the recognizer to the manager
    manager.add(Tap);
  
    // Subscribe to the desired event
    manager.on('tap', (e)=>{

      const critical_score = this.getCriticalScore();

      this.critical(critical_score);//暴击逻辑编写 
  
      if(this.isAnimating){
        this.updateScore(critical_score);
        return false;
      }
  
      this.isAnimating = true;//正在进行动画
     
      this.setState({
        hasClass:true,
        hasRipple:true,
        score:this.state.score+critical_score
      },()=>{
  
        let timer = setTimeout(()=>{
  
           clearTimeout(timer);
  
           this.setState({
            hasClass:false
           },()=>{
            this.isAnimating = false;
           })
  
  
        },40)
  
     
      })
  
    });

  }

 updateScore = ()=>{

  this.setState({
    score:this.state.score+1
  })

 }

  render(){

    return (
      <div className="App">
        <div className="App-header">
            <p className={`score ${this.state.hasClass?"bigger":""}`}>{this.state.score*10}</p>
            <div className={`btn ${this.state.hasClass?"active":""}`} ref="btn">点 击
            
              <div ref="ripple" className={`${this.state.hasRipple?"wave":""} ripple danger`}>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>

              {
                this.state.num.map((v,idx)=>{
                  return v?<Tip key={idx} index={idx} animationEnd={this.animationEnd} score={v}/>:null;
                })
              }

            </div>

        </div>
        {
          this.state.time>0?
          <div className="count-zero">{this.state.time} 秒</div>
          :null  
        }
      </div>
    );

  }

}

