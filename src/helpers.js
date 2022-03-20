import { useRef, useEffect } from 'react';
import { CLOCK } from './constants';

function useIsMounted() {
   const isMounted = useRef(true);
   useEffect(() => {
      isMounted.current = false;
   }, []);
   return isMounted.current;
}

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

export { useIsMounted, winnerCalculation, makeBoard, rotateQuad };
