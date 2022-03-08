import React from 'react';
import './newApp.css';

function Rotate(props) {
   let clockWise = props.reverse ? 'counter' : 'clock';
   let counterClockWise = props.reverse ? 'clock' : 'counter';
   let className = 'rotate__el';
   if (!(props.transfer == null)) {
      className += ` rotate__el--${props.transfer}`;
   }
   return (
      <div className={className}>
         <button onClick={() => props.onClick(clockWise)}>&uArr;</button>
         <button onClick={() => props.onClick(counterClockWise)}>&dArr;</button>
      </div>
   );
}

function Circle(props) {
   let className = props.color ? `circle circle--${props.color}` : 'circle';
   let winner = props.winner ? 'winn' : null;
   return (
      <button
         className={className}
         style={winner ? { border: '1px solid yellow' } : null}
         onClick={props.onClick}
      >
         {winner}
      </button>
   );
}

const Moves = ({ history, jumpTo, ...props }) => {
   return history.map((step, i) => {
      let desc = step.key ? 'Goto move #' + step.key : 'Goto game start';
      return (
         <li key={step.key} className="history">
            <button className="move" onClick={() => jumpTo(step.key)}>
               {desc}
            </button>
         </li>
      );
   });
};
const BallsDeck = props => {
   let deckRow = [];
   for (let i = 0; i < 9; i++) {
      deckRow[i] = i;
   }
   return (
      <div>
         {deckRow.map((_, i) => (
            <Circle key={i} color={props.color[i]} />
         ))}
      </div>
   );
};

const Board = props => {
   const boardArr = makeBoard();
   let className = 'board';
   if (props.rotate) {
      className += ` board__rotate--${props.rotate}-${
         props.board % 2 === 0 ? 'left' : 'right'
      }`;
   }
   const board = boardArr.map((circles, row) => {
      return (
         <div key={row} className="board-row">
            {circles.map((num, i) => {
               const winners = props.winners;
               const color = props.color[num];
               let winner =
                  winners &&
                  color === winners.winnerPlayer &&
                  winners.winnerNumbers.indexOf(num) > -1;
               return (
                  <Circle
                     key={num}
                     onClick={() => props.onClick(num)}
                     color={props.color[num]}
                     winner={winner}
                  />
               );
            })}
         </div>
      );
   });

   return <div className={className}>{board}</div>;
};

const PentagoBoard = props => {
   const makePentagoBoard = makeBoard({ rows: 2, cols: 2 });
   const rotatedBoard = props.rotateInfo.board;
   const rotation = props.rotateInfo.rotation;
   let winnerBoards = [];
   if (props.winners) {
      winnerBoards = props.winners.winnerBoards;
   }
   const pentagoBoard = makePentagoBoard.map((row, i) => {
      return (
         <div key={i} className="pentago-board-row">
            {row.map((v, i) => {
               return (
                  <div className="row__container" key={v}>
                     <div
                        className={`rotate--${v % 2 === 0 ? 'left' : 'right'}`}
                     >
                        <Rotate
                           reverse={v % 2 !== 0}
                           onClick={r => props.rotate(r, v)}
                           transfer={
                              rotatedBoard === v
                                 ? v % 2 === 0
                                    ? 'left'
                                    : 'right'
                                 : null
                           }
                        />
                     </div>
                     <Board
                        board={v}
                        onClick={num => props.onClick(num, v)}
                        color={props.pentago[v]}
                        winners={
                           winnerBoards.includes(v)
                              ? {
                                   winnerNumbers: props.winners.winnerNumbers,
                                   winnerPlayer: props.winners.player,
                                }
                              : null
                        }
                        rotate={rotatedBoard === v ? rotation : null}
                     />
                  </div>
               );
            })}
         </div>
      );
   });

   return pentagoBoard;
};

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         history: [
            {
               pentago: [
                  Array(9).fill(null),
                  Array(9).fill(null),
                  Array(9).fill(null),
                  Array(9).fill(null),
               ],
               RotatedPentago: [
                  Array(9).fill(null),
                  Array(9).fill(null),
                  Array(9).fill(null),
                  Array(9).fill(null),
               ],
               deck: [
                  {
                     row1: Array(9).fill('black'),
                     row2: Array(9).fill('black'),
                  },
                  {
                     row1: Array(9).fill('red'),
                     row2: Array(9).fill('red'),
                  },
               ],
               key: 0,
            },
         ],
         stepNumber: 0,
         blackIsNext: true,
         rotated: false,
         rotatedBoard: null,
         rotationSide: null,
      };
   }

   rotate(r, board) {
      console.log(r, board);
      if (this.state.rotated) {
         this.setState({
            rotatedBoard: board,
            rotationSide: r,
            rotationClicked: true,
         });
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (!(this.state.rotatedBoard == null)) {
         this.timer = setTimeout(() => {
            this.updatePentagoAfterRotate(
               this.state.rotationSide,
               this.state.rotatedBoard
            );
         }, 900);
      }
   }

   updatePentagoAfterRotate(r, board) {
      // console.log(r, board);
      let history = this.state.history.slice();
      let current = history[this.state.stepNumber];
      let pentago = current.pentago;
      if (!this.state.rotated || calculateWinner(pentago)) {
         return;
      }
      let rotated = [];
      if (r === 'clock') {
         rotated = [6, 3, 0, 7, 4, 1, 8, 5, 2];
      } else {
         rotated = [2, 5, 8, 1, 4, 7, 0, 3, 6];
      }

      let newPentago = pentago.map((arr, b) => {
         return arr.map((circle, i, array) => {
            if (b === board) {
               circle = array[rotated[i]];
               return circle;
            } else {
               return circle;
            }
         });
      });
      let historyAdding = this.state.history.slice(
         0,
         this.state.history.length - 1
      );
      this.setState({
         history: historyAdding.concat([
            {
               pentago: newPentago,
               deck: current.deck,
               key: current.key,
            },
         ]),
         rotationClicked: false,
         rotated: false,
         rotatedBoard: null,
      });
   }

   jumpTo(move) {
      this.setState({
         stepNumber: move,
         blackIsNext: move % 2 === 0,
      });
   }

   handleClick(num, board) {
      let history = this.state.history.slice(0, this.state.stepNumber + 1);
      let current = history[this.state.stepNumber];
      let pentago = current.pentago;
      let deck = current.deck.slice();
      if (
         pentago[board][num] ||
         this.state.rotated ||
         calculateWinner(pentago)
      ) {
         return;
      }
      let newPentago = pentago.map((arr, boardNum) => {
         return arr.map((val, i) => {
            return (val =
               boardNum === board && i === num
                  ? this.state.blackIsNext
                     ? 'black'
                     : 'red'
                  : val);
         });
      });
      let newDeck = deck.map((obj, i) => {
         let color = this.state.blackIsNext ? 'black' : 'red';
         let row1 = obj.row1.slice();
         let row2 = obj.row2.slice();
         if (+!this.state.blackIsNext === i) {
            if (
               row1.indexOf(color) === row2.indexOf(color) ||
               row1.indexOf(color) < row2.indexOf(color)
            ) {
               row1[row1.indexOf(color)] = null;
            } else {
               row2[row2.indexOf(color)] = null;
            }
         }
         return {
            row1: row1,
            row2: row2,
         };
      });
      this.setState({
         history: history.concat([
            {
               pentago: newPentago,
               key: history.length,
               deck: newDeck,
            },
         ]),
         stepNumber: history.length,
         blackIsNext: !this.state.blackIsNext,
         rotated: true,
      });
   }

   render() {
      let history = this.state.history;
      let current = history[this.state.stepNumber];
      let pentago = current.pentago;
      const winners = calculateWinner(pentago);
      let desc = winners
         ? 'Winner is ' + winners.player
         : this.state.rotated
         ? !this.state.blackIsNext
            ? 'Black player should rotate a board'
            : 'Red player should rotate a board'
         : this.state.blackIsNext
         ? 'Next player is Black'
         : 'Next player is Red';
      // console.log(this.state.rotated);
      return (
         <div className="pentago">
            {/* <div className="row"> */}
            <h2 className="desc">{desc}</h2>

            <div className="pentago-board ">
               <PentagoBoard
                  onClick={(num, v) => this.handleClick(num, v)}
                  pentago={pentago}
                  winners={winners}
                  rotate={(r, b) => this.rotate(r, b)}
                  rotateInfo={{
                     rotation: this.state.rotationSide,
                     board: this.state.rotatedBoard,
                  }}
               />
            </div>
            <ul className="moves">
               <Moves history={history} jumpTo={move => this.jumpTo(move)} />
            </ul>
            {/* </div> */}
            <div className="decks mt-l">
               <div className="deck deck--red mb-m">
                  <div className="deck__row mb-s">
                     <BallsDeck color={current.deck[0].row1} />
                  </div>
                  <div className="deck__row">
                     <BallsDeck color={current.deck[0].row2} />
                  </div>
               </div>
               <div className="deck deck--black">
                  <div className="deck__row mb-s">
                     <BallsDeck color={current.deck[1].row1} />
                  </div>
                  <div className="deck__row">
                     <BallsDeck color={current.deck[1].row2} />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

// ======================================

function calculateWinner(pentago) {
   const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   ];
   const cols = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
   ];
   const cross = [
      [0, 4, 8],
      [2, 4, 6],
   ];

   let board1 = pentago[0];
   let board2 = pentago[1];
   let board3 = pentago[2];
   let board4 = pentago[3];
   for (let i = 0; i < 3; i++) {
      const [a, b, c] = rows[i];
      const [d, e, f] = cols[i];
      if (
         board1[b] &&
         board1[b] === board1[c] &&
         board1[b] === board2[a] &&
         board1[b] === board2[b] &&
         (board1[b] === board1[a] || board1[b] === board2[c])
      ) {
         return {
            winnerNumbers: rows[i],
            player: board1[b],
            winnerBoards: [0, 1],
         };
      }
      if (
         board3[b] &&
         board3[b] === board3[c] &&
         board3[b] === board4[a] &&
         board3[b] === board4[b] &&
         (board3[b] === board3[a] || board3[b] === board4[c])
      ) {
         return {
            winnerNumbers: rows[i],
            player: board3[b],
            winnerBoards: [2, 3],
         };
      }
      if (
         board1[e] &&
         board1[e] === board1[f] &&
         board1[e] === board3[d] &&
         board1[e] === board3[e] &&
         (board1[e] === board1[d] || board1[e] === board3[f])
      ) {
         return {
            winnerNumbers: cols[i],
            player: board1[e],
            winnerBoards: [0, 2],
         };
      }
      if (
         board2[e] &&
         board2[e] === board2[f] &&
         board2[e] === board4[d] &&
         board2[e] === board4[e] &&
         (board2[e] === board2[d] || board2[e] === board4[f])
      ) {
         return {
            winnerNumbers: cols[i],
            player: board2[e],
            winnerBoards: [1, 3],
         };
      }
   }
   const [g, h, i] = cross[0];
   if (
      board1[h] &&
      board1[h] === board1[i] &&
      board1[h] === board4[g] &&
      board1[h] === board4[h] &&
      (board1[h] === board1[g] || board1[h] === board4[i])
   ) {
      return {
         winnerNumbers: cross[0],
         player: board1[h],
         winnerBoards: [0, 3],
      };
   }
   const [j, k, l] = cross[1];
   if (
      board2[k] &&
      board2[k] === board2[l] &&
      board2[k] === board3[j] &&
      board2[k] === board3[k] &&
      (board2[k] === board2[j] || board2[k] === board3[l])
   ) {
      return {
         winnerNumbers: cross[1],
         player: board2[k],
         winnerBoards: [1, 2],
      };
   }

   return null;
}

function makeBoard({ rows = 3, cols = 3 } = {}) {
   let board = [];
   let num = 0;
   for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
         board[i][j] = num;
         num++;
      }
   }
   return board;
}

export default App;
