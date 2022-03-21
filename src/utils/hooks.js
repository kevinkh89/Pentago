import { useEffect, useRef, useState, useCallback } from 'react';
import { BLACK, RED } from './constants';

function useIsMounted() {
   const isMounted = useRef(true);
   useEffect(() => {
      isMounted.current = false;
   }, []);
   return isMounted.current;
}

function useScore() {
   const [score, setScore] = useState({ [BLACK]: 0, [RED]: 0 });
   const addScore = useCallback(player => {
      console.log(player);
      setScore(score => ({
         [BLACK]: player === BLACK ? score[BLACK] + 1 : score[BLACK],
         [RED]: player === RED ? score[RED] + 1 : score[RED],
      }));
   }, []);
   const resetScore = useCallback(() => {
      setScore({ [BLACK]: 0, [RED]: 0 });
   }, []);
   return { score, addScore, resetScore };
}
export { useIsMounted, useScore };
