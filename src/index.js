import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Square is a function component, which don't have their own state.
// The function takes props as input and returns what should be rendered.
function Square(props) {
  return (
    // the Square updates the Board's state, i.e. the
    // Square components are controlled components.
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const lines = [
    [0, 1, 2], // horicontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
  ];
  for (var i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// The Board is a component that contains a array of 9 elements
// representing the 3x3 Squares.
class Board extends React.Component {
  constructor(props) {
    super(props);
    // store the Game’s state in the parent Board component
    // instead of in each Square.
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i) {
    // create a copy of the squares Array
    const squares = this.state.squares.slice();
    // ignore click if someone has won the game or if a Square is already
    // filled.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      // flip to determine which player goes next
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      // pass a function from Board to the Square, that the Square
      // is called when it is clicked, i.e. handleClick
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status"> {status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    // store the Game’s state in the Game component
    // instead of in each Square.
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      xIsNext: true
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div> {/* status */} </div>
          <ol> {/* TODO */} </ol>
        </div>
      </div>
    );
  }
}

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1> Shopping List for {this.props.name} </h1>
        <ul>
          <li> Instagram </li> <li> WhatsApp </li> <li> Oculus </li>
        </ul>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
