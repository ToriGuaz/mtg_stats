import React, { useEffect, useState } from 'react';
import PrincipalPlayer from './PrincipalPlayer';
import { ref, get, getDatabase, child } from 'firebase/database';
import Opponent from './Opponent'



function Game( {gameID} ) {
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState([]);    

    useEffect(() => {
        if (gameID) {
          const dbRef = ref(getDatabase());
    
    
          get(child(dbRef, `games/${gameID}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                setGameName(data.gameName); 
                
                if (data.players) {
                  setPlayers(Object.keys(data.players)); // Establece los jugadores
                  console.log("lista de jugadores dentro de useEffect :" , players);

                } else {
                  setPlayers([]); // Si no hay jugadores, establece un array vacío
                }
                
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [gameID]);

      console.log("lista de jugadores fuera de useEffect :" , players);

  return (
    <div>
        <h2>Partida: {gameName}</h2>
        <PrincipalPlayer gameID={gameID} />
        <ul>
            {players.map((playerID) => {
            //console.log("Rendering Opponent with:", item);
            return (
                <li key={playerID}>
                <Opponent opponentID={playerID} gameID={gameID} />
                </li>
            );
            })}
        </ul>

    </div>
  );
}

export default Game



/*        <ul>
            {players.map((item, index) => (//ver de hacer esto de forma que se actualice con los cambios.
            <li key={index}>
                {item.playerName}: {item.life} : {item.counter}
            </li>
            ))}
        </ul> */