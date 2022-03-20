import React from 'react';
import { BLACK, RED } from './constants';
import { useScore } from './helpers';
import './score.css';
function Score({ score, resetScore }) {
   //    const { resetScore, score } = useScore();
   //    console.log(score, 'score');
   return (
      <div className="score">
         <div className="player">
            <h4>BLACK</h4>
            <p>{score[BLACK]}</p>
         </div>
         <div className="player">
            <h4>RED</h4>
            <p>{score[RED]}</p>
         </div>
         <button
            className="cta"
            onClick={() => {
               console.log('reset');
               resetScore({ [BLACK]: 0, [RED]: 0 });
            }}
         >
            reset score
         </button>
      </div>
   );
}

const MemoizedScore = React.memo(Score);

export default MemoizedScore;
