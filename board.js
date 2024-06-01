import React, { Component } from 'react';
import Row from '../row/row';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: Board.createBoard(props),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.status === 'reset') {
      return {
        rows: Board.createBoard(nextProps)
      };
    }
    return null; 
  }

  static createBoard(props) {
    let board = [];

    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false,
        });
      }
    }

    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);
      let cell = board[randomRow][randomColumn];
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  }

  open = (cell) => {
    let synccountmines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    synccountmines.then(numbermines => {
      let rows = this.state.rows.map(row => row.slice());
      let current = rows[cell.y][cell.x];

      if (current.hasMine && this.props.openCells === 0) {
        let newRows = Board.createBoard(this.props);
        this.setState({ rows: newRows }, () => {
          this.open(cell);
        });
      } else {
        if (!current.hasFlag && !current.isOpen) {
          this.props.cellClick();
          current.isOpen = true;
          current.count = numbermines;

          this.setState({ rows });

          if (!current.hasMine && numbermines === 0) {
            this.findaroundcells(cell);
          }

          if (current.hasMine) {
            this.props.endGame();
          }
        }
      }
    });
  }

  flag = cell => {
    if (this.props.status === "ended") {
      return;
    }

    let rows = this.state.rows;

    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });
    this.props.changeflagamount(cell.hasFlag ? 1 : -1);
  }

  findMines = (cell) => {
    let mineProximity = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (
          cell.y + row >= 0 &&
          cell.x + col >= 0 &&
          cell.y + row < this.state.rows.length &&
          cell.x + col < this.state.rows[0].length
        ) {
          if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)) {
            mineProximity++;
          }
        }
      }
    }
    return mineProximity;
  };

  findaroundcells = cell => {
    let rows = this.state.rows;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (
          cell.y + row >= 0 &&
          cell.x + col >= 0 &&
          cell.y + row < rows.length &&
          cell.x + col < rows[0].length
        ) {
          if (!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen) {
            this.open(rows[cell.y + row][cell.x + col]);
          }
        }
      }
    }
  }

  render() {
    const rows = this.state.rows.map((row, index) => (
      <Row
        cells={row}
        key={index}
        open={this.open}
        flag={this.flag}
      />
    ));
    return <div className="board">{rows}</div>;
  }
}

export default Board;
