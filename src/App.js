import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { BLACK, FILLING } from './constants';
import { makeBoard, winnerCalculation, useIsMounted } from './helpers';
import Quad from './Quad';
import Status from './Status';
import WinnerHighlight from './WiinerHighlight';

//=================

const Board = () => {
   const board = useMemo(() => makeBoard(), [makeBoard]);
   const [winner, setWinner] = useState(false);
   const [quad1, setQuad1] = useState(board[0]);
   const [quad2, setQuad2] = useState(board[0]);
   const [quad3, setQuad3] = useState(board[0]);
   const [quad4, setQuad4] = useState(board[0]);
   const mount = useIsMounted();
   useEffect(() => {
      if (mount) return;
      let checkWinner = winnerCalculation(quad1, quad2, quad3, quad4);
      if (checkWinner) {
         setWinner(checkWinner);
      }
   }, [quad1, quad2, quad3, quad4, mount]);
   const [player, setPlayer] = useState(BLACK);
   const [phase, setPhase] = useState(FILLING);
   return (
      <>
         <div className="desc">
            <Status phase={phase} player={player} winner={winner} />
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
               Reset
            </button>
         </div>

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
      </>
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

//========================

export default Game;
