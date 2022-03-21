import { FILLING } from '../utils/constants';
import './Status.css';
function Status({ children, player, phase, winner }) {
   const WinnerText = () => (
      <div className="status">
         <h1>{winner && <span style={{ color: 'gold' }}> {winner.player} WON</span>}</h1>
         {children}
      </div>
   );

   const StatusText = () => (
      <div className="status">
         <h1>
            <span className={player}>{player}</span>
         </h1>
         <h3>
            {phase === FILLING ? 'Place a marble in an empty hole' : 'Rotate a quad'}
         </h3>
         {children}
      </div>
   );
   return winner ? <WinnerText /> : <StatusText />;
}

export default Status;
