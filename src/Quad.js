import React, { useState } from 'react';
import curved2 from './assets/undraw_handcrafts_curved_arrow.svg';
import { BLACK, FILLING, RED, ROTATION, CLOCK, COUNTER } from './constants';
import { rotateQuad } from './helpers';

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
<ControlledInput ref={input1} handleUpdate={val => (input1.current = val)} />;

export default Quad;
