import React, { Component } from 'react';
import Board from './Components/board/board.js';
import Boardhead from './Components/boardhead/boardhead.js';

class Minesweeper extends Component {

    constructor (){
        super();
        this.baseState=this.state;

        this.state ={
        status: "waiting",
        rows: 10,
        columns: 10,
        flags: 10,
        mines: 10,  
        time: 0,
        openCells:0,
    }
    }

  componentDidUpdate(prevProps, prevState){
    if(this.state.status=="running"){
        this.checkforwinner();
    }
  }

  checkforwinner = () => {
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("you won!"))
    }
  }

    componentWillMount() {
        this.intervals = [];
      }

      reset = () => {
        this.intervals.map(clearInterval);
        this.setState(Object.assign({}, this.baseState), () => {
          this.intervals = [];
        });
      };


    endGame = () => {
        this.setState({
            status: "ended"
        })
    }

    tick = () => {
        if (this.state.status == "running"){
         let time= this.state.time +1;
            this.setState({time})
       } 
       
    }

    setInterval = (fn, t) => {
        this.intervals.push(setInterval(fn, t))
    }



    changeflagamount = (amount) => {

        this.setState({flags: this.state.flags - amount})
        

    }

    clickCell = () => {
        if (this.state.openCells >= 0 && this.state.status !== "running"){
            this.setState({
                status:"running",
            }, () =>{
                this.setInterval(this.tick, 1000);
            })
        }

        this.setState(prevState =>{
            return{openCells: prevState.openCells+1}
        })
    }



    render(){
        return (
            <div className='minesweeper'>

            <h1>Minesweeper</h1>

            <Boardhead time={this.state.time} flagcount={this.state.flags}/>

            <Board
            status={this.state.status}
            changeflagamount={this.changeflagamount}
            endGame={this.endGame}
             rows={this.state.rows} columns={this.state.columns}
             mines={this.state.mines}
             openCells={this.state.openCells}
             cellClick={this.clickCell}
             
             
             />

            </div>



        );
    }
}

export default Minesweeper;