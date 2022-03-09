import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App4.css';
import curved2 from './assets/undraw_handcrafts_curved_arrow.svg';
const BLACK = 'black';
const RED = 'red';
const FILLING = 'FILLING';
const ROTATION = 'ROTATION';
const COUNTER = 'counter';
const CLOCK = 'clock';
//=================
function WinnerHighlight({ winner }) {
   let media = window.matchMedia('(max-width:600px)');
   let values = {
      normal: ['2.3rem', '9.3rem', '16.3rem', '28rem', '35rem', '42rem'],
      mobile: ['1.3rem', '5.3rem', '9.3rem', '16rem', '20rem', '24rem'],
   };
   let style =
      winner.direction === 'vertical'
         ? {
              left: media.matches
                 ? values.mobile[winner.index]
                 : values.normal[winner.index],
           }
         : winner.direction === 'horizontal'
         ? {
              top: media.matches
                 ? values.mobile[winner.index]
                 : values.normal[winner.index],
           }
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
      setQuadClass(`quad ${rotation}-rotate-enter-active`);
      setRotation(rotation);
   };
   return (
      <div className="quad-container">
         <img
            alt="counter rotation"
            src={curved2}
            className={`counter ${phase === FILLING ? 'fade-out' : 'fade-in'}`}
            onClick={() => handleRotate(COUNTER)}
         />
         <img
            alt="clock rotation"
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

function useIsMounted() {
   const isMounted = useRef(true);
   useEffect(() => {
      isMounted.current = false;
   }, []);
   return isMounted.current;
}

const Board = () => {
   const board = useMemo(() => makeBoard(), [makeBoard]);
   const [winner, setWinner] = useState(false);
   const [quad1, setQuad1] = useState(board[0]);
   const [quad2, setQuad2] = useState(board[0]);
   const [quad3, setQuad3] = useState(board[0]);
   const [quad4, setQuad4] = useState(board[0]);
   const mount = useIsMounted();
   useEffect(() => {
      if (mount) return;
      let checkWinner = winnerCalculation(quad1, quad2, quad3, quad4);
      if (checkWinner) {
         setWinner(checkWinner);
      }
   }, [quad1, quad2, quad3, quad4, mount]);
   const [player, setPlayer] = useState(BLACK);
   const [phase, setPhase] = useState(FILLING);
   return (
      <>
         <div className="desc">
            <Status phase={phase} player={player} winner={winner} />
            <button
               className="cta"
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
         <Board />
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
   return loopOverCirclesAndReturnWinner([
      ...flatCircles(quad1, quad2),
      ...flatCircles(quad3, quad4),
   ]);
}
// convert colums to rows and check for the winner
function verticalCalc(quad1, quad2, quad3, quad4) {
   let quad1VerticalRows = rotateQuad(CLOCK, quad1);
   let quad2VerticalRows = rotateQuad(CLOCK, quad2);
   let quad3VerticalRows = rotateQuad(CLOCK, quad3);
   let quad4VerticalRows = rotateQuad(CLOCK, quad4);
   return loopOverCirclesAndReturnWinner([
      ...flatCircles(quad3VerticalRows, quad1VerticalRows),
      ...flatCircles(quad4VerticalRows, quad2VerticalRows),
   ]);
}
function diagonalCalc(quad1, quad2, quad3, quad4) {
   let quad1DiagonalRow = pickCrossRight(quad1);
   let quad4DiagonalRow = pickCrossRight(quad4);
   let quad2DiagonalRow = pickCrossleft(quad2);
   let quad3DiagonalRow = pickCrossleft(quad3);
   return loopOverCirclesAndReturnWinner([
      [...quad1DiagonalRow, ...quad4DiagonalRow],
      [...quad3DiagonalRow, ...quad2DiagonalRow],
   ]);
}

function pickCrossleft(quad) {
   let quadDiagonal = quad
      .slice()
      .reverse()
      .map((row, rowIndex) => row.find((item, itemIndex) => rowIndex === itemIndex));
   return quadDiagonal;
}
function pickCrossRight(quad) {
   let quadDiagonal = quad.map((row, rowIndex) =>
      row.find((item, itemIndex) => itemIndex === rowIndex)
   );
   let quadReduced = quad.reduce((acc, cur, index, arr) => {
      let res = [acc[0]];
      return res.concat(cur[index]);
   });

   return quadDiagonal;
}

function flatCircles(startQuad, endQuad) {
   let flat = startQuad.map((row, index) => row.concat(endQuad[index]));
   return flat;
}

function loopOverCirclesAndReturnWinner(flatCircles) {
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
            winner = { player: row[j], index: i, side: j === 3 ? 'start' : 'end' };
            break;
         }
      }
   }
   return winner;
}

//========================

export default Game;
