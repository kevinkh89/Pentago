import { CLOCK } from './constants';

//==============

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
function makeQuad() {
   let quad = [];
   for (let k = 0; k < 3; k++) {
      quad[k] = [];
      for (let j = 0; j < 3; j++) {
         quad[k][j] = null;
      }
   }
   return quad;
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
   return loopOverRowsAndReturnWinner([
      ...flatRows(quad1, quad2),
      ...flatRows(quad3, quad4),
   ]);
}
// convert colums to rows and check for the winner
function verticalCalc(quad1, quad2, quad3, quad4) {
   let quad1VerticalRows = rotateQuad(CLOCK, quad1);
   let quad2VerticalRows = rotateQuad(CLOCK, quad2);
   let quad3VerticalRows = rotateQuad(CLOCK, quad3);
   let quad4VerticalRows = rotateQuad(CLOCK, quad4);
   return loopOverRowsAndReturnWinner([
      ...flatRows(quad3VerticalRows, quad1VerticalRows),
      ...flatRows(quad4VerticalRows, quad2VerticalRows),
   ]);
}
function diagonalCalc(quad1, quad2, quad3, quad4) {
   let quad1DiagonalRow = pickCrossRight(quad1);
   let quad4DiagonalRow = pickCrossRight(quad4);
   let quad2DiagonalRow = pickCrossleft(quad2);
   let quad3DiagonalRow = pickCrossleft(quad3);
   // console.log(quad3DiagonalRow);
   // quad3DiagonalRow.reverse();
   console.log(quad2DiagonalRow, quad3DiagonalRow);
   return loopOverRowsAndReturnWinner([
      [...quad1DiagonalRow, ...quad4DiagonalRow],
      [...quad2DiagonalRow, ...quad3DiagonalRow],
   ]);
}

function pickCrossleft(quad) {
   return quad.map((row, rowIndex) => row[2 - rowIndex]);
}
function pickCrossRight(quad) {
   return quad.map((row, rowIndex) => row[rowIndex]);
}
function flatRows(startQuad, endQuad) {
   return startQuad.map((row, index) => row.concat(endQuad[index]));
}

function loopOverRowsAndReturnWinner(rows) {
   let winner = null;
   let counter = 0;
   // console.log(rows);
   for (let i = 0; i < rows.length; i++) {
      if (counter === 4) break; // if we found the winner no need to continue
      let row = rows[i];
      counter = 0; //  setting counter to zero for every new set of row
      for (let j = 0; j < row.length - 1; j++) {
         if (row[j] !== null && row[j] === row[j + 1]) {
            counter += 1;
         } else {
            counter = 0;
            if (j > 0) break; // this is for early break if second and third elements are no match
         }
         if (counter === 4) {
            winner = { player: row[j], index: i, side: j === 3 ? 'start' : 'end' };
            break;
         }
      }
   }
   return winner;
}

export { winnerCalculation, makeBoard, rotateQuad };
