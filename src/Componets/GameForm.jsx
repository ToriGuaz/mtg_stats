import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig'; // Asegúrate de que db esté correctamente importado

function GameForm( { onGameSelect } ) {
  const [games, setGames] = useState([]);
 // const [currentGame, setGameID] = useState([]);

  useEffect(() => {
    const gamesRef = ref(db, 'games');
    
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const gameArray = Object.keys(data).map((id) => ({
          id,
          gameName: data[id].gameName,
        }));
        setGames(gameArray);
      }
    });
  }, []);

  const handleGameSelection = (event) => {
    const selectedGameId = event.target.value;
    console.log("Juego seleccionado con ID:", selectedGameId);
    onGameSelect(selectedGameId);
  };

  return (
    <div>
      <form>
        <label htmlFor="gameSelect">Elige un juego ya creado:</label>
        <select id="gameSelect" onChange={handleGameSelection}>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.gameName} 
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default GameForm;