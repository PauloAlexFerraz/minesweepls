import React, { Component } from 'react';
import Board from './Components/board/board.js';
import Boardhead from './Components/boardhead/boardhead.js';

class Minesweeper extends Component {

    constructor (){     //inicializa o componente e define o estado inicial
        super();
        this.baseState=this.state;

        this.state ={
        status: "waiting",     //estado do jogo waiting running ended
        rows: 10,              //nº de linhas e colunas no tabuleiro
        columns: 10,
        flags: 10,            // nº de bandeiras disponíveis 
        mines: 10,             // nº de minas no tabuleiro
        time: 0,               // tempo decorrido após o início do jogo
        openCells:0,            // nª de células abertas
    }
    }

  componentDidUpdate(prevProps, prevState){    //compara o estado e as propriedades anteriores com os novos valores
    if(this.state.status=="running"){         // verifica se o jogo está em andamento e se estiver chama a função CheckforWinner
        this.checkforwinner();
    }
  }

  checkforwinner = () => {            
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {    //verifica se todas as células q n são minas foram abertas
      this.setState({            // se a condição se verificar o player ganha
        gameStatus: "winner"
      }, alert("you won!"))
    }
  }

    componentWillMount() {
        this.intervals = [];    //inincializa um array de intervalos para armazenar intervalos de tempo
      }

      reset = () => {                //dá reset ao jogo, limpa os intervalos e restaura o estado inicial
        this.intervals.map(clearInterval);   // map usado para iterar sobre cada item no array
        this.setState(Object.assign({}, this.baseState), () => {    //restaura para o estado inicial de todos os valores do "this.state == thisbaseState"
          this.intervals = [];    //redefinir o array para um array vazio
        });
      };


    endGame = () => {            //muda o estado do jogo para ended
        this.setState({
            status: "ended"
        })
    }

    tick = () => {
        if (this.state.status == "running"){
         let time= this.state.time +1;            // incrementa o tempo de jogo de segundo em segundo se o jogo ainda estiver em curso
            this.setState({time})
       } 
       
    }

    startInterval = (fn, t) => {            // adiciona um novo intervalo ao array
        this.intervals.push(setInterval(fn, t))    //chama a função setInterval e executa a função fn repetidamente a cada t e devolve um intervalo
    }



    changeflagamount = (amount) => {                //atualiza o nº de bandeiras restantes decrementando a amount utilizada

        this.setState({flags: this.state.flags - amount})
        

    }

    clickCell = () => {
        if (this.state.openCells >= 0 && this.state.status !== "running"){     //verifica se o nº de células é positivo e se o jogo n está em curso
            this.setState({
                status:"running",        //atualiza o estado do componente para running
            }, () =>{
                this.startInterval(this.tick, 1000);    //inicia um intervalo que chama função tick a cada 1000ms==1s
            })
        }

        this.setState(prevState =>{            //atualiza o estado e recebe o estado anterior
            return{openCells: prevState.openCells+1}   //incrementa o nº de openCells
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
