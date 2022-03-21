import { memo } from 'react';
import { BLACK, RED } from '../utils/constants';
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
               resetScore({ [BLACK]: 0, [RED]: 0 });
            }}
         >
            reset score
         </button>
      </div>
   );
}

const MemoizedScore = memo(Score);

export default MemoizedScore;
