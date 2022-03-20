import { FILLING } from './constants';

function Status({ player, phase, winner }) {
   let winnerText = () => (
      <>
         <h1>{winner && <span style={{ color: 'gold' }}> {winner.player} WON</span>}</h1>
      </>
   );

   let statusText = () => (
      <>
         <h1>
            Player : <span className={player}>{player}</span>
         </h1>
         <h3>
            {phase === FILLING ? 'Place a marble in an empty hole' : 'Rotate a quad'}
         </h3>
      </>
   );
   return winner ? winnerText() : statusText();
}

export default Status;
