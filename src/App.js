import React from 'react';
import './App.css';

function Rotate(props) {
   let clockWise = props.reverse ? 'counter' : 'clock';
   let counterClockWise = props.reverse ? 'clock' : 'counter';

   return (
      <div className="rotate__el">
         <button onClick={() => props.onClick(clockWise)}>&uArr;</button>
         <button onClick={() => props.onClick(counterClockWise)}>&dArr;</button>
      </div>
   );
}

function Circle(props) {
   // let className = 'circle ';
   let className = props.color ? `circle circle--${props.color}` : 'circle';
   // console.log(props.winner);
   //    className += props.empty ? 'empty' : 'occupied';
   return <button className={className} onClick={props.onClick}></button>;
}

const Moves = ({ history, jumpTo, ...props }) => {
   // let desc=props.stepNumber
   // let history = props.history;
   return history.map((step, i) => {
      let desc = step.key ? 'Goto move #' + step.key : 'Goto game start';
      // console.log(desc);
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
   // let color = props.black ? 'black' : 'red';
   // const
   return (
      <div>
         {deckRow.map((_, i) => (
            <Circle key={i} color={props.color[i]} />
         ))}
      </div>
   );
};

class Board extends React.Component {
   renderCircle(num) {
      // console.log(this.props.color);
      // console.log(num);
      let winner =
         this.props.winners.indexOf(num) > -1 ? this.props.winners : [];
      return (
         <Circle
            key={num}
            //    occupied={}
            onClick={() => this.props.onClick(num)}
            color={this.props.color[num]}
            winner={winner}
         />
      );
   }
   render() {
      let boardArr = makeBoard();

      const board = boardArr.map((circles, row) => {
         return (
            <div key={row} className="board-row">
               {circles.map((num, i) => this.renderCircle(num))}
            </div>
         );
      });
      // console.log(board);
      let className = 'board';
      if (this.props.rotate) {
         className += ` board__rotate--${this.props.rotate}`;
      }
      return (
         <div className={className}>
            {this.props.children}
            {board}
         </div>
      );
   }
}

// const PentagoBoard = props => {
//    return (
//       <div className="pentago-board">
//          <Board />
//       </div>
//    );
// };

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
               // deck: {
               //    black:[Array(9).fill('black'), Array(9).fill('black')],
               //   red: [Array(9).fill('red'), Array(9).fill('red')],
               // },
            },
         ],
         stepNumber: 0,
         blackIsNext: true,
         rotated: false,
         rotatedBoard: null,
         rotationSide: null,
         // rotationClicked: null,
      };
   }

   rotate(r, board) {
      // this.rotatedBoard = board;
      // this.r = r;
      if (this.state.rotated) {
         this.setState({
            rotatedBoard: board,
            rotationSide: r,
            // rotated: true,
            rotationClicked: true,
         });
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.state.rotatedBoard) {
         this.timer = setTimeout(() => {
            this.updatePentagoAfterRotate(
               this.state.rotationSide,
               this.state.rotatedBoard
            );
         }, 1000);
      }
   }
   // componentWillMount() {
   //    clearTimeout(this.timer);
   // }

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
      // let matrix=[];
      // for(let i=0;i<3;i++){
      //    matrix[i]=[];
      //    matrix[i]=pentago.splice(3*i,3)
      // }
      // let newPentago = [];
      // if (r === 'clock') {
      //    newPentago = pentago[0].map((val, index) =>
      //       pentago.map(row => row[index]).reverse()
      //    );
      // } else {
      //    newPentago = pentago[0].map((val, index) =>
      //       pentago.map(row => row[row.length - 1 - index])
      //    );
      // }
      let historyAdding = this.state.history.slice(
         0,
         this.state.history.length - 1
      );

      console.log('hola');
      // setTimeout(
      //    this.setState({
      //       history: historyAdding.concat([
      //          {
      //             pentago: newPentago,
      //             deck: current.deck,
      //             key: current.key,
      //          },
      //       ]),
      //       rotated: !this.state.rotated,
      //       rotatedBoard: board,
      //    }),
      //    1000
      // );
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
         // rotated: !this.state.rotated,
         rotatedBoard: null,
      });
   }

   jumpTo(move) {
      // let stepNumber = this.state.stepNumber;
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
      // let color = this.state.blackIsNext ? 'black' : 'red';
      // let deck = current.deck[color];
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
         let deckNum = this.state.blackIsNext ? 0 : 1;
         let color = this.state.blackIsNext ? 'black' : 'red';
         let row1 = obj.row1.slice();
         let row2 = obj.row2.slice();
         if (i === deckNum) {
            if (obj.row1.indexOf(color) > -1) {
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

      // let newDeck = deck.map((arr, row) => {
      //    // let deckNum = this.state.blackIsNext ? 0 : 1;
      //    // let color = this.state.blackIsNext ? 'black' : 'red';
      //    return arr.map((circles, i) => {
      //       // if (i === deckNum) {
      //          row[row.indexOf(color)] =
      //             row.indexOf(color) > -1 ? null : row[row.indexOf(color)];

      //       console.log(rowNum, row);
      //       // console.log(deckNum, i);
      //       // console.log(color);
      //       return row;
      //    });
      // });

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
         // rotated: !this.state.rotated,
         rotated: true,
      });
   }

   render() {
      let history = this.state.history;
      // console.log(history);
      let current = history[this.state.stepNumber];
      // console.log(current);
      let pentago = current.pentago;
      const winners = calculateWinner(pentago);
      //console.log(winner);
      let desc = winners
         ? 'Winner is ' + current.pentago
         : this.state.blackIsNext
         ? 'Next player is Black'
         : 'Next player is Red';
      console.log(this.state.rotated);

      // console.log('history', history);
      // console.log('current', current);
      return (
         <div className="pentago">
            {/* <div className="row"> */}
            <h2 className="desc">{desc}</h2>

            <div className="pentago-board ">
               {/* <div className="rotate--1">
                  <Rotate />
               </div> */}
               <div>
                  <div className="pentago-board-row">
                     <Board
                        onClick={num => this.handleClick(num, 0)}
                        color={pentago[0]}
                        winners={winners ? winners : []}
                        rotate={
                           this.state.rotatedBoard === 0
                              ? this.state.rotationSide
                              : null
                        }
                     >
                        <div className="rotate--1">
                           <Rotate onClick={r => this.rotate(r, 0)} />
                        </div>
                     </Board>
                     <Board
                        onClick={num => this.handleClick(num, 1)}
                        color={pentago[1]}
                        winners={winners ? winners : []}
                        rotate={
                           this.state.rotatedBoard === 1
                              ? this.state.rotationSide
                              : null
                        }
                     >
                        <div className="rotate--2">
                           <Rotate reverse onClick={r => this.rotate(r, 1)} />
                        </div>
                     </Board>
                  </div>

                  <div className="pentago-board-row">
                     <Board
                        onClick={num => this.handleClick(num, 2)}
                        color={pentago[2]}
                        winners={winners ? winners : []}
                        rotate={
                           this.state.rotatedBoard === 2
                              ? this.state.rotationSide
                              : null
                        }
                     >
                        <div className="rotate--3">
                           <Rotate onClick={r => this.rotate(r, 2)} />
                        </div>
                     </Board>
                     <Board
                        onClick={num => this.handleClick(num, 3)}
                        color={pentago[3]}
                        winners={winners ? winners : []}
                        rotate={
                           this.state.rotatedBoard === 3
                              ? this.state.rotationSide
                              : null
                        }
                     >
                        <div className="rotate--4">
                           <Rotate reverse onClick={r => this.rotate(r, 3)} />
                        </div>
                     </Board>
                  </div>
               </div>
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
         return { winnerNumbers: rows[i], player: a, winnerBoards: [1, 2] };
      }
      if (
         board3[b] &&
         board3[b] === board3[c] &&
         board3[b] === board4[a] &&
         board3[b] === board4[b] &&
         (board3[b] === board3[a] || board3[b] === board4[c])
      ) {
         return { winnerNumbers: rows[i], player: a, winnerBoards: [3, 4] };
      }
      if (
         board1[e] &&
         board1[e] === board1[f] &&
         board1[e] === board3[d] &&
         board1[e] === board3[e] &&
         (board1[e] === board1[d] || board1[e] === board3[f])
      ) {
         return { winnerNumbers: cols[i], player: d };
      }
      if (
         board2[e] &&
         board2[e] === board2[f] &&
         board2[e] === board4[d] &&
         board2[e] === board4[e] &&
         (board2[e] === board2[d] || board2[e] === board4[f])
      ) {
         return { winnerNumbers: cols[i], player: d };
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
      return { winnerNumbers: cross[0], player: g };
   }
   const [j, k, l] = cross[1];
   if (
      board2[k] &&
      board2[k] === board2[l] &&
      board2[k] === board3[j] &&
      board2[k] === board3[k] &&
      (board2[k] === board2[j] || board2[k] === board3[l])
   ) {
      return { winnerNumbers: cross[1], player: j };
   }

   return null;
   // for(let i=0;i<4;i++){
   //    let board=pentago[i];
   //    for(let j=i+1;j< 4;j++){
   //       let versus=pentago[j];
   //       if(i===0 && j===1 || i===2 && j===3){
   //          for(let k=0;k<rows.length; k++){

   //          }
   //       }

   //    }
   // }
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
