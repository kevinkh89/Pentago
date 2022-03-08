import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './App4.css';
import clockTopLeft from './assets/top/clock-arrow-left.svg';
import counterTopLeft from './assets/top/counter-arrow-left.svg';
import clockTopRight from './assets/top/clock-arrow-right.svg';
import counterTopRight from './assets/top/counter-arrow-right.svg';

import clockBottomLeft from './assets/bottom/clock-arrow-left.svg';
import counterBottomLeft from './assets/bottom/counter-arrow-left.svg';
import clockBottomRight from './assets/bottom/clock-arrow-right.svg';
import counterBottomRight from './assets/bottom/counter-arrow-right.svg';

// import { TopLeftIcons } from './components/Icons';

const BLACK = 'black';
const RED = 'red';

function Circle({ onClick, color }) {
   // const className = circle => {
   //    if (circle === 0) return 'circle';
   //    if (circle === 1) return 'circle black';
   //    if (circle === 2) return 'circle red';
   // };
   const [classname, setClassname] = useState('circle');
   const isClicked = useRef(false);
   // const circleColor = useRef('');

   const handleClick = () => {
      console.log('inside', isClicked, classname);
      if (!isClicked.current) {
         setClassname(`circle ${color}`);
         onClick();
         isClicked.current = true;
      }
   };
   console.log(isClicked, classname);
   return <div className={classname} onClick={handleClick}></div>;
}

function Quad({ children }) {
   const [quad, setQuad] = useState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
   ]);
   const [isBlack, setIsBlack] = useState(true);
   const [rotateStaus, setRotateStaus] = useState({
      isRotated: null,
      rotation: null,
   });
   const [quadClass, setQuadClass] = useState('quad');
   const handleCircle = (rowIndex, circleIndex) => {
      setQuad(quad => {
         return quad.map((row, i) => {
            if (rowIndex === i) {
               return row.map((color, i) =>
                  circleIndex === i ? (isBlack ? BLACK : RED) : color
               );
            }
            return row;
         });
      });
      setIsBlack(!isBlack);
   };
   const row = (rowArray, rowIndex) =>
      rowArray.map((color, circleIndex) => (
         <div
            className={`circle ${color}`}
            key={`circle${circleIndex}`}
            onClick={() => {
               if (!color) handleCircle(rowIndex, circleIndex);
            }}
         ></div>
         // <Circle onClick={() => handleCircle(rowIndex, circleIndex)} color={color} />
      ));
   const handleRotate = rotation => {
      setRotateStaus(({ isRotated }) => {
         return {
            isRotated: !isRotated,
            rotation: rotation,
         };
      });
      setQuadClass(`quad ${rotation}-rotate-enter-active`);
   };
   const rotateIcons = React.Children.map(children, child => {
      return React.cloneElement(child, {
         handleRotate,
         isRotated: rotateStaus.isRotated,
      });
   });
   return (
      <div className="quad-container">
         {rotateIcons}
         <div
            className={quadClass}
            onTransitionEnd={() => {
               setQuad(quad => rotateQuad(rotateStaus.rotation, quad));
               setQuadClass('quad');
            }}
         >
            {quad.map((rowArray, rowIndex) => {
               return (
                  <div className="row" key={`row${rowIndex}`}>
                     {row(rowArray, rowIndex)}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
const RotateIconClock = ({ handleRotate, isRotated, ...props }) => {
   return (
      <img
         {...props}
         onClick={() => {
            if (!isRotated) handleRotate('clock');
         }}
      />
   );
};
const RotateIconCounter = ({ handleRotate, isRotated, ...props }) => {
   return (
      <img
         {...props}
         onClick={() => {
            if (!isRotated) handleRotate('counter');
         }}
      />
   );
};

const board = () => {
   return <div className="row"></div>;
};

//====board
const Board = () => {
   // console.log(<TopLeftIcons />);
   //    const [rotateStatus,setRotateStaus]=useState({isRotated:null,rotation:null})

   return (
      <div className="board">
         <div className="row">
            {/* <TopLeftIcons /> */}
            {/* <clockTopLeft /> */}
            <Quad>
               <RotateIconCounter src={counterTopLeft} className={'left'} />
               <RotateIconClock src={clockTopLeft} className={'top'} />
            </Quad>
            {/* </CSSTransition> */}
            <Quad>
               <RotateIconClock src={clockTopRight} className={'right6'} />
               <RotateIconCounter src={counterTopRight} className={'top right0'} />
            </Quad>
         </div>
         <div className="row">
            <Quad>
               <RotateIconCounter src={counterBottomLeft} className={'bottom6'} />
               <RotateIconClock src={clockBottomLeft} className={'bottom0 left'} />
            </Quad>
            <Quad>
               <RotateIconClock src={clockBottomRight} className={'right0 bottom6'} />
               <RotateIconCounter src={counterBottomRight} className={'right6 bottom0'} />
            </Quad>
         </div>
      </div>
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
         if (rotation === 'clock') {
            rotatedQuad[k][n] = quad[n2][k];
         } else {
            rotatedQuad[k][n] = quad[n][k2]; //2,0 => 2,2   k=2 , k2=0 n=0,n2=2
         }
      }
   }
   return rotatedQuad;
};
const makeQuad = () => {
   let quad = [];
   for (let i = 0; i < 3; i++) {
      quad[i] = [];
      for (let j = 0; j < j; j++) {
         quad[i][j] = null;
      }
   }
   return quad;
};

//========================

export default Game;
