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
  renderSquare(i) {
    return (
      // pass a function from Board to the Square, that the Square
      // is called when it is clicked, i.e. handleClick
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // create a copy of the squares Array
    const squares = current.squares.slice();
    // ignore click if someone has won the game or if a Square is already
    // filled.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      // concatenate new history entries onto history
      // unlike push method the concat method doesn't mutate the original array
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      // flip to determine which player goes next
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div> {status} </div>
          <ol> {moves} </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
