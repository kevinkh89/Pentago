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
   // console.log(score, 'app');
   useEffect(() => {
      if (mount) return;
      let checkWinner = winnerCalculation(quad1, quad2, quad3, quad4);
      if (checkWinner) {
         setWinner(checkWinner);
         // let blackScore = score.current[BLACK];
         // let redScore = score.current[RED];
         // score.current = {
         //    [BLACK]: player === BLACK ? blackScore + 1 : blackScore,
         //    [RED]: player === RED ? redScore + 1 : redScore,
         // };
         addScore(checkWinner.player);
         // res
      }
   }, [quad1, quad2, quad3, quad4, mount, addScore]);
   const [player, setPlayer] = useState(BLACK);
   const [phase, setPhase] = useState(FILLING);

   // const callbackedReset=useCallback(resetScore,[])
   return (
      <>
         {/* <div className="desc"> */}
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
         {/* <Score score={score} resetScore={resetScore} />
         <Instructions /> */}
         {/* </div> */}
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
      </>
   );
};

const Game = () => {
   return (
      // <div>
      <div className="game">
         <Board />
      </div>
      // </div>
   );
};

//====================

//========================

export default Game;
