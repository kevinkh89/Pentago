import React, { useState } from 'react';
import './newApp3.css';
// import RotateSvgLeft from './assets/arrow_direction_email_left_reply_icon.svg';
// import RotateSvgRight from './assets/arrow_email_forward_message_right_icon.svg';
// import RotateSvgTop from './assets/svgtop.svg';
// import RotateSvgRight from './assets/down-arrow-8119.svg';
// import RotateSvgLeft from './assets/left-arrow-8118.svg';
import LeftColSvgClock from './assets/left-arrow-left.svg';
import LeftColSvgCounter from './assets/down-arrow-left.svg';

import clockTopLeft from './assets/top/clock-arrow-left.svg';
import counterTopLeft from './assets/top/counter-arrow-left.svg';
import clockTopRight from './assets/top/clock-arrow-right.svg';
import counterTopRight from './assets/top/counter-arrow-right.svg';

import clockBottomLeft from './assets/bottom/clock-arrow-left.svg';
import counterBottomLeft from './assets/bottom/counter-arrow-left.svg';
import clockBottomRight from './assets/bottom/clock-arrow-right.svg';
import counterBottomRight from './assets/bottom/counter-arrow-right.svg';
import { CSSTransition } from 'react-transition-group';

function Circle(props) {
   return <div className={`circle ${props.color}`} onClick={() => props.click()}></div>;
}

const classNames = {
   left: ['left', 'top', 'bottom6', 'bottom0 left'],
   righ: [],
};

function Quad({ quad, onClick }) {
   // const [quad, setQuad] = useState(Array(9).fill(0));
   // console.log(RotateIcon);
   // const handleClick = () => {
   //    let newQuad = quad.slice();
   //    // newQuad[i] = setQuad(newQuad);
   // };
   return (
      <div className={'quad'}>
         {/* {RotateIcon()} */}
         {quad.map((val, i) => {
            // console.log(props.quad);
            let className =
               val === 0 ? 'circle' : val === 1 ? 'circle black' : 'circle red';
            return <div key={i} className={className} onClick={() => onClick(i)}></div>;
         })}
      </div>
   );
}

function Roatate() {}

function LeftRotation(props) {
   return (
      <>
         <div className="rotate-container">
            <img
               className={'left'}
               src={counterTopLeft}
               onClick={() => props.onClick('counter', 0)}
            />
            <img
               className={'top'}
               src={clockTopLeft}
               onClick={() => props.onClick('clock', 0)}
            />
         </div>
         <div className="rotate-container">
            <img
               className={'bottom6'}
               src={counterBottomLeft}
               onClick={() => props.onClick('counter', 1)}
            />
            <img
               className={'bottom0 left'}
               src={clockBottomLeft}
               onClick={() => props.onClick('clock', 1)}
            />
         </div>
      </>
   );
}
function RightRotation(props) {
   return (
      <>
         <div className="rotate-container">
            <img
               className={'right6'}
               src={clockTopRight}
               onClick={() => props.onClick()}
            />
            <img
               className={'top right0'}
               src={counterTopRight}
               onClick={() => props.onClick()}
            />
         </div>

         <div className="rotate-container">
            <img
               className={'right0 bottom6'}
               src={clockBottomRight}
               onClick={() => props.onClick()}
            />
            <img
               className={'right6 bottom0'}
               src={counterBottomRight}
               onClick={() => props.onClick()}
            />
         </div>
      </>
   );
}

function Board(props) {
   let boardDataStructure = {
      col1: [makeQuad(), makeQuad()],

      col2: [makeQuad(), makeQuad()],
   };
   const [col1, setCol1] = useState(boardDataStructure.col1);
   const [col2, setCol2] = useState(boardDataStructure.col2);
   const [player, setPlayer] = useState({ isBlack: true });

   const [rotate, setRotate] = useState({ rotation: '', rowIndex: '' });

   const [rotated, setRotated] = useState([
      [false, false],
      [false, false],
   ]);

   const handleClickCol1 = (circle, rowIndex) => {
      // 1 is black 2 is red
      let newCol = col1.map((rowArr, i) => {
         if (i === rowIndex) {
            return rowArr.map((val, i) =>
               i === circle ? (player.isBlack ? 1 : 2) : val
            );
            // rowArr[circle] = player.isBlack ? 1 : 2;
         }
         return rowArr;
      });
      console.log(col1, newCol);
      setCol1(newCol);
      setPlayer({ isBlack: !player.isBlack });
   };
   const handleClickCol2 = (circle, rowIndex) => {
      let newCol = col2.map((rowArr, i) => {
         if (i === rowIndex) {
            return rowArr.map((val, i) =>
               i === circle ? (player.isBlack ? 1 : 2) : val
            );

            // rowArr[circle] = player.isBlack ? 1 : 2;
         }
         return rowArr;
      });
      setCol2(newCol);
      setPlayer({ isBlack: !player.isBlack });
   };

   // const handleClick = (circleIndex, quadIndex) => {
   //    setBoardArray(arr => {
   //       return arr[quadIndex].map((val, i) => {
   //          if (i === circleIndex) return player.isBlack ? 1 : 2;
   //       });
   //    });
   //    setPlayer(({ isBlack }) => !isBlack);
   // };

   const rotateClick1 = (rotation, rowIndex) => {
      let normalizedQuad = [];
      let index = 0;
      let rotatedQuad = [];
      console.log(col1, rowIndex);
      for (let i = 0; i < 3; i++) {
         normalizedQuad[i] = [];
         for (let j = 0; j < 3; j++) {
            normalizedQuad[i][j] = col1[rowIndex][index];
            index++;
         }
      }

      for (let k = 0; k < normalizedQuad.length; k++) {
         let k2 = normalizedQuad.length - 1 - k;
         rotatedQuad[k] = [];
         for (let n = 0; n < normalizedQuad.length; n++) {
            let n2 = normalizedQuad.length - 1 - n;
            if (rotation === 'clock') {
               rotatedQuad[k][n] = normalizedQuad[n2][k];
            } else {
               rotatedQuad[k][n] = normalizedQuad[n][k2]; //2,0 => 2,2   k=2 , k2=0 n=0,n2=2
            }
         }
      }
      setCol1(col1 =>
         col1.map((quad, i) => (i === rowIndex ? rotatedQuad.flat() : quad))
      );
      // TODO : CHECK OUT WHATH THE HELL IS THIS
      // matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
   };
   const rotateClick2 = (rotation, rowIndex) => {};
   console.log(col1);
   const board = (
      <div className="board">
         <div className="col-container">
            <LeftRotation
               onClick={(rotation, rowIndex) => {
                  // rotateClick1(rotation, rowIndex)
                  setRotate({ rotation, rowIndex });
                  setRotated(rotated => {
                     return rotated.map((arr, i) => {
                        if (i === 0) {
                           return arr.map((val, i) => (i === rowIndex ? !val : val));
                        }
                        return arr;
                     });
                  });
               }}
            />
            <div className="col">
               {
                  // col1.map((rowArr, rowIndex) => {
                  //    return (
                  //       <>
                  //          {/* <RotateIcon /> */}
                  //          <Quad
                  //             quad={rowArr}
                  //             key={rowIndex}
                  //             onClick={circle => handleClickCol1(circle, rowIndex)}
                  //          ></Quad>
                  //       </>
                  //    );
                  // })
               }
               <CSSTransition
                  in={rotated[0][0]}
                  classNames={'rotate'}
                  addEndListener={(node, done) => {
                     node.addEventListener('transitionend', done, false);
                  }}
                  onEntered={() => rotateClick1(rotate.rotation, rotate.rowIndex)}
                  onExited={() => rotateClick1(rotate.rotation, rotate.rowIndex)}
               >
                  <Quad
                     quad={col1[0]}
                     onClick={circleIndex => handleClickCol1(circleIndex, 0)}
                  />
               </CSSTransition>
               <CSSTransition
                  in={rotated[0][1]}
                  classNames={'rotate'}
                  addEndListener={(node, done) => {
                     node.addEventListener('transitionend', done, false);
                  }}
                  onEntered={() => rotateClick1(rotate.rotation, rotate.rowIndex)}
                  onExited={() => rotateClick1(rotate.rotation, rotate.rowIndex)}
               >
                  <Quad
                     quad={col1[1]}
                     onClick={circleIndex => handleClickCol1(circleIndex, 1)}
                  />
               </CSSTransition>
            </div>
         </div>
         {/* //=============right */}
         <div className="col-container">
            <RightRotation
               onClick={(rotation, rowIndex) => rotateClick2(rotation, rowIndex)}
            />
            <div className="col">
               {
                  // col2.map((rowArr, rowIndex) => {
                  //    return (
                  //       <Quad
                  //          quad={rowArr}
                  //          key={rowIndex}
                  //          onClick={circle => handleClickCol2(circle, rowIndex)}
                  //       ></Quad>
                  //    );
                  // })
               }
               <Quad
                  quad={col2[0]}
                  onClick={circleIndex => handleClickCol2(circleIndex, 0)}
               />
               <Quad
                  quad={col2[1]}
                  onClick={circleIndex => handleClickCol2(circleIndex, 1)}
               />
            </div>
         </div>
      </div>
   );

   return board;
}

const newApp3 = () => {
   return <Board />;
};

//==============
function makeBoard() {
   let board = [];
   for (var i = 0; i < 4; i++) {
      board[i] = [];
      for (var j = 0; j < 9; j++) {
         board[i][j] = 0;
      }
   }

   return board;
}
function makeQuad() {
   let quad = [];
   for (var i = 0; i < 9; i++) {
      quad[i] = 0;
   }
   return quad;
}
//=====================
export default newApp3;
