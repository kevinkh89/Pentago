import React from 'react';

import clockTopLeft from './assets/top/clock-arrow-left.svg';
import counterTopLeft from './assets/top/counter-arrow-left.svg';
import clockTopRight from './assets/top/clock-arrow-right.svg';
import counterTopRight from './assets/top/counter-arrow-right.svg';

import clockBottomLeft from './assets/bottom/clock-arrow-left.svg';
import counterBottomLeft from './assets/bottom/counter-arrow-left.svg';
import clockBottomRight from './assets/bottom/clock-arrow-right.svg';
import counterBottomRight from './assets/bottom/counter-arrow-right.svg';

const TopLeftIcons = () => {
   return (
      <>
         <img
            className={'left'}
            src={counterTopLeft}
            onClick={() => handleRotate('clock')}
         />
         <img
            className={'top'}
            src={clockTopLeft}
            onClick={() => handleRotate('clock')}
         />
      </>
   );
};

const TopRightIcons = () => {
   return (
      <>
         <img
            src={clockTopRight}
            className={'right6'}
            onClick={() => handleRotate('clock')}
         />
         <img
            src={counterTopRight}
            className={'top right0'}
            onClick={() => handleRotate('clock')}
         />
      </>
   );
};
const BottomLeftIcons = () => {
   return (
      <>
         <img
            src={clockTopRight}
            className={'right6'}
            onClick={() => handleRotate('clock')}
         />
         <img
            src={counterTopRight}
            className={'top right0'}
            onClick={() => handleRotate('clock')}
         />
      </>
   );
};
const BottomRightIcons = () => {
   return (
      <>
         <img
            src={clockTopRight}
            className={'right6'}
            onClick={() => handleRotate('clock')}
         />
         <img
            src={counterTopRight}
            className={'top right0'}
            onClick={() => handleRotate('clock')}
         />
      </>
   );
};

export default IconsComponent = () => {
   return [
      [counterTopLeft, clockTopLeft],
      [clockTopRight, counterTopRight],
      [counterBottomLeft, clockBottomLeft],
      [clockBottomRight, counterBottomRight],
   ];
};
