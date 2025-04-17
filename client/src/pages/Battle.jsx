import { useState } from 'react';

const Battle = () => {
  const roster = JSON.parse(localStorage.getItem('roster')) || [];
  const [enemy, setEnemy] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const randomStatTotal = (stats) => stats.reduce((sum, s) => sum + s.base_stat, 0);

  const fight = async (playerPokemon) => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const enemyPokemon = await res.json();
    setEnemy(enemyPokemon);

    const playerTotal = randomStatTotal(playerPokemon.stats);
    const enemyTotal = randomStatTotal(enemyPokemon.stats);

    if (playerTotal > enemyTotal) {
      setResult('You win!');
      setScore(prev => prev + 10);
    } else {
      setResult('You lose!');
    }
  };

  return (
    <div className="w-full min-h-[100vh] pt-[10rem] flex flex-col items-center bg-gray-100">
      <h2>Battle</h2>
      <p>Pick one of your Pokémon to fight!</p>
      {roster.map(pokemon => (
        <div key={pokemon.name}>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <button onClick={() => fight(pokemon)}>Battle</button>
        </div>
      ))}

      {enemy && (
        <div>
          <h3>Enemy Pokémon:</h3>
          <p>{enemy.name}</p>
          <img src={enemy.sprites.front_default} alt={enemy.name} />
        </div>
      )}

      {result && (
        <div>
          <h3>Result: {result}</h3>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Battle;
