// import React from 'react';

function Instructions() {
   return (
      <div className="instruction">
         <p>
            take turns at placing marbles on the game board and twisting the game blocks.
            A player is free to twist any of the game blocks, regardless of which game
            block the player placed the marble on.
         </p>
         <p>
            <strong>
               The object is to get five marbles in a row before your opponent does
            </strong>
            . The mind twisting part of Pentago is that each player will also twist one of
            the four game blocks 90 degrees (one "notch"), clockwise or counter clockwise,
            as part of each turn.
         </p>
      </div>
   );
}

export default Instructions;
