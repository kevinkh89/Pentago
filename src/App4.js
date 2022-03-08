import React, {
   useState,
   useEffect,
   useRef,
   useCallback,
   useMemo,
   memo,
   useContext,
} from 'react';
import './App4.css';
import curved2 from './assets/undraw_handcrafts_curved_arrow.svg';
import {
   SituationContext,
   SituationProvider,
   DispatchProvider,
   DispatchContext,
} from './context';
const BLACK = 'black';
const RED = 'red';
const FILLING = 'FILLING';
const ROTATION = 'ROTATION';
const COUNTER = 'counter';
const CLOCK = 'clock';
//=================

//TODO: USE A COSTUM HOOK TO CHECK FOR PHASE AND CLICK STATE

function WinnerHighlight({ winner }) {
   let positionValues = ['2.3rem', '9.3rem', '16.3rem', '28rem', '35rem', '42rem'];
   let style =
      winner.direction === 'vertical'
         ? {
              left: positionValues[winner.index],
           }
         : winner.direction === 'horizontal'
         ? { top: positionValues[winner.index] }
         : {};
   return (
      <span
         className={`winner-box ${winner.direction} ${winner.side}`}
         style={style}
      ></span>
   );
}

function Status({ player, phase, winner }) {
   let winnerText = () => (
      <h1>{winner && <span style={{ color: 'gold' }}> {winner.player} WON</span>}</h1>
   );

   let statusText = () => (
      <>
         <h1>
            Player : <span className={player}>{player}</span>
         </h1>
         <h3>
            {phase === FILLING ? 'Place a marble in an empty hole' : 'Rotate a quad'}
         </h3>
      </>
   );
   return winner ? winnerText() : statusText();
}

function Quad({ quad, setQuad, player, phase, disabled, setPhase, setPlayer }) {
   const [rotation, setRotation] = useState();
   const [quadClass, setQuadClass] = useState('quad');
   const handleCircle = (rowIndex, circleIndex) => {
      if (disabled || phase === ROTATION) return;
      setQuad(quad => {
         return quad.map((row, i) => {
            if (rowIndex === i) {
               return row.map((color, i) => (circleIndex === i ? player : color));
            }
            return row;
         });
      });
      setPhase(phase => (phase === FILLING ? ROTATION : FILLING));
   };
   const handleRotate = rotation => {
      if (disabled || phase === FILLING) return;
      setQuadClass(`quad ${rotation}-rotate-enter ${rotation}-rotate-enter-active`);
      setRotation(rotation);
   };
   return (
      <div className="quad-container">
         <img
            src={curved2}
            className={`counter ${phase === FILLING ? 'fade-out' : 'fade-in'}`}
            onClick={() => handleRotate(COUNTER)}
         />
         <img
            src={curved2}
            className={`clock ${phase === FILLING ? 'fade-out' : 'fade-in'}`}
            onClick={() => handleRotate(CLOCK)}
         />
         <div
            className={quadClass}
            onTransitionEnd={() => {
               setQuad(quad => rotateQuad(rotation, quad));
               setQuadClass('quad');
               setPlayer(player => (player === BLACK ? RED : BLACK));
               setPhase(phase => (phase === FILLING ? ROTATION : FILLING));
            }}
         >
            {quad.map((rowArray, rowIndex) => {
               return (
                  <div className="row" key={`row${rowIndex}`}>
                     {rowArray.map((color, circleIndex) => (
                        <div
                           className={`circle ${color ?? ''}`}
                           key={`circle${circleIndex}`}
                           onClick={() => {
                              !color && handleCircle(rowIndex, circleIndex);
                           }}
                        ></div>
                     ))}
                  </div>
               );
            })}
         </div>
      </div>
   );
}

//====board
// function isEmpty(obj) {
//    for (var x in obj) {
//       return false;
//    }
//    return true;
// }
function useIsMounted() {
   const isMounted = useRef(true);
   useEffect(() => {
      isMounted.current = false;
   }, []);
   return isMounted.current;
}

const dummy = [
   [BLACK, BLACK, BLACK],
   [null, null, null],
   [null, null, null],
];
const dummy2 = [
   [null, null, null],
   [BLACK, null, null],
   [BLACK, null, null],
];
const dummy3 = [
   [BLACK, null, null],
   [BLACK, null, null],
   [BLACK, null, null],
];
const Board = () => {
   const board = useMemo(() => makeBoard(), [makeBoard]);
   // const memoizedboard = useMemo(()=>makeBoard(), [makeBoard]);

   // const [clickCounter, setClickCounter] = useState({ black: 0, red: 0 });
   const [winner, setWinner] = useState(false);
   // console.log(board);
   const [quad1, setQuad1] = useState(board[0]);
   const [quad2, setQuad2] = useState(board[1]);
   const [quad3, setQuad3] = useState(board[2]);
   const [quad4, setQuad4] = useState(board[3]);
   const mount = useIsMounted();
   useEffect(() => {
      if (mount) return;
      let checkWinner = winnerCalculation(quad1, quad2, quad3, quad4);
      if (checkWinner) {
         setWinner(checkWinner);
      }
      // setPhase(phase => (phase === FILLING ? ROTATION : FILLING));
   }, [quad1, quad2, quad3, quad4, mount]);
   const [player, setPlayer] = useState(BLACK);
   const [phase, setPhase] = useState(FILLING);
   return (
      <>
         <div className="desc">
            <Status phase={phase} player={player} winner={winner} />
            {/* <h2>
               {winner && (
                  <span style={{ color: 'gold' }}>winner is {winner.player}</span>
               )}
            </h2> */}
            <button
               style={{
                  border: 'none',
                  backgroundColor: 'blue',
                  // width: '11rem',
                  // height: '5rem',
                  marginTop: '2rem',
                  borderRadius: '10px',
                  color: '#f2f2f2',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '2rem 4rem',
               }}
               onClick={() => {
                  setPhase(FILLING);
                  setQuad1(board[0]);
                  setQuad2(board[0]);
                  setQuad3(board[0]);
                  setQuad4(board[0]);
                  setPlayer(BLACK);
                  setWinner(false);
               }}
            >
               Reset
            </button>
            {/* <div className="score-board"></div> */}
         </div>

         <div className="board">
            {winner && <WinnerHighlight winner={winner} />}
            <div className="row row--1">
               <Quad
                  phase={phase}
                  quad={quad1}
                  setQuad={setQuad1}
                  setPhase={setPhase}
                  player={player}
                  setPlayer={setPlayer}
                  disabled={winner && true}
               ></Quad>
               <Quad
                  phase={phase}
                  quad={quad2}
                  setQuad={setQuad2}
                  setPhase={setPhase}
                  player={player}
                  setPlayer={setPlayer}
                  disabled={winner && true}
               ></Quad>
            </div>
            <div className="row row--2">
               <Quad
                  phase={phase}
                  quad={quad3}
                  setQuad={setQuad3}
                  setPhase={setPhase}
                  player={player}
                  setPlayer={setPlayer}
                  disabled={winner && true}
               ></Quad>
               <Quad
                  phase={phase}
                  quad={quad4}
                  setQuad={setQuad4}
                  setPhase={setPhase}
                  player={player}
                  setPlayer={setPlayer}
                  disabled={winner && true}
               ></Quad>
            </div>
         </div>
      </>
   );
};

const Game = () => {
   return (
      <div className="game">
         {/* <h1></h1> */}
         <Board />1
      </div>
   );
};

//====================
const rotateQuad = (rotation, quad) => {
   let rotatedQuad = [];
   for (let k = 0; k < quad.length; k++) {
      let k2 = quad.length - 1 - k;
      rotatedQuad[k] = [];
      for (let n = 0; n < quad.length; n++) {
         let n2 = quad.length - 1 - n;
         if (rotation === CLOCK) {
            rotatedQuad[k][n] = quad[n2][k];
         } else {
            rotatedQuad[k][n] = quad[n][k2]; //2,0 => 2,2   k=2 , k2=0 n=0,n2=2
         }
      }
   }
   return rotatedQuad;
};
function makeBoard() {
   console.log('makeBoard');
   let board = [];
   for (let i = 0; i < 4; i++) {
      let quad = [];
      for (let k = 0; k < 3; k++) {
         quad[k] = [];
         for (let j = 0; j < 3; j++) {
            quad[k][j] = null;
         }
      }
      board[i] = quad;
   }
   return board;
}

function winnerCalculation(quad1, quad2, quad3, quad4) {
   let checkWinner = null;
   if ((checkWinner = horizontalCalc(quad1, quad2, quad3, quad4))) {
      return { ...checkWinner, direction: `horizontal` };
   }
   if ((checkWinner = verticalCalc(quad1, quad2, quad3, quad4))) {
      // console.log(checkWinner, 'vert');
      return {
         ...checkWinner,
         direction: `vertical`,
      };
   }
   if ((checkWinner = diagonalCalc(quad1, quad2, quad3, quad4))) {
      return {
         ...checkWinner,
         direction: checkWinner.index === 0 ? 'cross-right' : 'cross-left',
      };
   }
   return checkWinner;
}
// todo;make all four quads flat base on rows
function horizontalCalc(quad1, quad2, quad3, quad4) {
   return loopOverCirclesAndReturnWinner(flatCircles(quad1, quad2, quad3, quad4));
}
// convert colums to rows and check for the winner
function verticalCalc(quad1, quad2, quad3, quad4) {
   let quad1Rotated = rotateQuad(CLOCK, quad1);
   let quad2Rotated = rotateQuad(CLOCK, quad2);
   let quad3Rotated = rotateQuad(CLOCK, quad3);
   let quad4Rotated = rotateQuad(CLOCK, quad4);
   return horizontalCalc(quad3Rotated, quad1Rotated, quad4Rotated, quad2Rotated);
}
function diagonalCalc(quad1, quad2, quad3, quad4) {
   let quad1Diagonal = pickCrossRight(quad1);
   let quad4Diagonal = pickCrossRight(quad4);
   let quad2Diagonal = pickCrossleft(quad2);
   let quad3Diagonal = pickCrossleft(quad3);
   return horizontalCalc(
      [quad1Diagonal],
      [quad4Diagonal],
      [quad3Diagonal],
      [quad2Diagonal]
   );
}

function pickCrossleft(quad) {
   let quadDiagonal = quad
      .slice()
      .reverse()
      .map((row, rowIndex) => row.find((item, itemIndex) => rowIndex === itemIndex));
   // console.log(quadDiagonal);
   return quadDiagonal;
}
function pickCrossRight(quad) {
   // let diag = [[], []];
   // //let quad2Rotated = rotateQuad(COUNTER, quad2);
   // //let quad3Rotated = rotateQuad(COUNTER, quad3);
   // let quad2Rotated = quad2.slice().reverse();
   // let quad3Rotated = quad3.slice().reverse();
   // for (let j = 0; j < 3; j++) {
   //    diag[0][j] = quad1[j][j];
   // }
   // for (let j = 0; j < 3; j++) {
   //    diag[0][j + 3] = quad4[j][j];
   // }
   // for (let j = 0; j < 3; j++) {
   //    diag[1][j] = quad2Rotated[j][j];
   // }
   // for (let j = 0; j < 3; j++) {
   //    diag[1][j + 3] = quad3Rotated[j][j];
   // }
   // return diag;
   let quadDiagonal = quad.map((row, rowIndex) =>
      row.find((item, itemIndex) => itemIndex === rowIndex)
   );
   // console.log(quadDiagonal);

   return quadDiagonal;
}

function flatCircles(quad1, quad2, quad3, quad4) {
   let flat = [];
   // console.log(quad2);
   for (let i = 0; i < quad1.length; i++) {
      // console.log(quad2, i);
      flat[i] = [...quad1[i], ...quad2[i]];
   }
   for (let i = 0; i < quad3.length; i++) {
      flat[flat.length] = [...quad3[i], ...quad4[i]];
   }
   // console.log(flat);
   return flat;
}

function loopOverCirclesAndReturnWinner(flatCircles) {
   console.log(flatCircles);
   let winner = null;
   let counter = 0;
   for (let i = 0; i < flatCircles.length; i++) {
      if (counter === 4) break; // if we found the winner no need to continue
      let row = flatCircles[i];
      counter = 0; //  setting counter to zero for every new set of circles
      for (let j = 0; j < row.length - 1; j++) {
         if (row[j] !== null && row[j] === row[j + 1]) {
            counter += 1;
         } else {
            counter = 0;
            if (j > 0) break; // this for early break if second and third elements are no match
         }
         if (counter === 4) {
            // console.log(j);
            winner = { player: row[j], index: i, side: j === 3 ? 'start' : 'end' };
            break;
         }
      }
   }
   return winner;
}

//========================

export default Game;
