import { useState, useEffect, useMemo } from 'react';
//=======
import './App.css';
import { BLACK, FILLING } from './utils/constants';
import { makeBoard, winnerCalculation } from './utils/helpers';
import Instructions from './components/Instructions';
import Quad from './components/Quad';
import Score from './components/Score';
import Status from './components/Status';
import WinnerHighlight from './components/WinnerHighlight';
import { useIsMounted, useScore } from './utils/hooks';

const Board = () => {
   const board = useMemo(() => makeBoard(), []);
   const [winner, setWinner] = useState(false);
   const [quad1, setQuad1] = useState(board[0]);
   const [quad2, setQuad2] = useState(board[0]);
   const [quad3, setQuad3] = useState(board[0]);
   const [quad4, setQuad4] = useState(board[0]);
   const mount = useIsMounted();
   const { score, addScore, resetScore } = useScore();
   useEffect(() => {
      if (mount) return;
      let checkWinner = winnerCalculation(quad1, quad2, quad3, quad4);
      if (checkWinner) {
         setWinner(checkWinner);
         addScore(checkWinner.player);
      }
   }, [quad1, quad2, quad3, quad4, mount, addScore]);
   const [player, setPlayer] = useState(BLACK);
   const [phase, setPhase] = useState(FILLING);

   return (
      <div className="game">
         <Status phase={phase} player={player} winner={winner}>
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
               Restart
            </button>
         </Status>
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
         <Score score={score} resetScore={resetScore} />
         <Instructions />
      </div>
   );
};
function test() {
   const limit = 15;
   let count = 1;
   return Array(limit)
      .fill(0)
      .reduce((acc, _, index) => {
         const spaces = ' '.repeat(Math.abs(limit - count) / 2);
         const stars = '*'.repeat(count) + '\n';
         index >= Math.floor(limit / 2) ? (count -= 2) : (count += 2);
         return `${acc}${spaces}${stars}`;
      }, '\n');
}
//====================

//========================

export default Board;
