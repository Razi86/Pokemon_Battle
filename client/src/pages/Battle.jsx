import { useState,useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ORIGIN_URL } from '../config';

const Battle = () => {
  const roster = JSON.parse(localStorage.getItem('roster')) || [];
  const [enemy, setEnemy] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const { user } = useContext(AuthContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const randomStatTotal = (stats) => stats.reduce((sum, s) => sum + s.base_stat, 0);
console.log(selectedPokemon)
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get(`${ORIGIN_URL}leaderboard/${user.id}`);
        setScore(res.data.score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    }
    if(user && user.id) {
      fetchScore();
    }
  },[user]);


  const fight = async (playerPokemon) => {
    const enemyPokemon=await generateEnemy();
    const newScore=calculateScore(playerPokemon, enemyPokemon);
    
    const totalScore= score + newScore;
    setScore(totalScore);
    await saveBattleResult(totalScore);
  };

  const generateEnemy = async () => {
    const randomId = Math.floor(Math.random() * 80) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const enemyPokemon = await res.json();
    setEnemy(enemyPokemon);
    return enemyPokemon;
  }

  const calculateScore = (playerPokemon,enemyPokemon) => {
    
    const playerTotal = randomStatTotal(playerPokemon.stats);
    const enemyTotal = randomStatTotal(enemyPokemon.stats);
    if (playerTotal > enemyTotal) {
      setResult('You win!');
      return 10;
    } else {
      setResult('You lose!');
      return 0;
    }
  }

  const saveBattleResult = async (totalScore) => {
    try {
      await axios.post(`${ORIGIN_URL}leaderboard/${user.id}`, {
        score: totalScore,
      });
    } catch (error) {
      console.error('Error saving battle result:', error);  
    }
  }

  return (
    <div className="w-full min-h-[100vh] pt-[9rem] flex flex-col items-center bg-gray-100">
      <h2 className='text-center font-bold luckiest-guy-regular text-3xl text-blue-900'>Battle</h2>
      <p>Pick one of your Pokémon to fight!</p>
      <div className='flex flex-wrap justify-center gap-4 my-5'>
        {roster.length === 0 && <p className='text-red-500'>No Pokémon in your roster!</p>}
        {roster.map(pokemon => (
          <div key={pokemon.id} 
               className='cursor-pointer rounded-lg shadow-lg border-1 border-gray-300 p-4 bg-white flex flex-col items-center'
               onClick={() => setSelectedPokemon(pokemon)}>
            <h3 className='font-bold pb-3 text-blue-900 luckiest-guy-regular'>{pokemon.name}</h3>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
            className='w-[120px]'/>
          </div>
        ))}
      </div>
      <div className='flex text-2xl'>
              <p className='text-bold luckiest-guy-regular text-blue-900 pr-2'>Your Total Score: </p>
              <p className='text-bold luckiest-guy-regular text-red-700'>{score}</p>
      </div>
      <div className='flex justify-around items-center my-5'>
        {selectedPokemon && (
          <>
            <div className='flex flex-col items-center rounded-lg shadow-lg border-1 border-gray-300 p-4 bg-white min-w-[200px] min-h-[320px]'>
              <h3>Your Pokémon</h3>
              <p className='font-bold luckiest-guy-regular text-blue-900'>{selectedPokemon.name}</p>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
              alt={selectedPokemon.name}
              className='w-[150px]'/>
              <div>
                {selectedPokemon.stats.map(stat => (
                  <p key={stat.stat.name} className='text-sm text-blue-900'>
                    {stat.stat.name}: {stat.base_stat}
                  </p>
                ))}
              </div>
            </div>
            
            <div className='flex flex-col items-center'>
              <div className='vs w-[150px] h-[170px] mx-4 mb-5'></div>
              <button 
                className='bg-red-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700' 
                onClick={() => fight(selectedPokemon)}>Fight!
              </button>
              <div>
                {result && (
                  <div className='flex text-2xl mt-3 mx-3'>
                    <p className='text-bold luckiest-guy-regular text-blue-900 pr-2'>Result: </p>
                    <p className='text-bold luckiest-guy-regular text-red-700'>{result}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className='flex flex-col items-center rounded-lg shadow-lg border-1 border-gray-300 p-4 bg-white min-w-[200px] min-h-[320px]'>
              {enemy && (
                <>
                  <h3>Enemy Pokémon</h3>
                  <p className='font-bold luckiest-guy-regular text-blue-900'>{enemy.name}</p>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${enemy.id}.svg`}
                  alt={enemy.name}
                  className='w-[150px]'/>
                  <div>
                    {enemy.stats.map(stat => (
                      <p key={stat.stat.name} className='text-sm text-blue-900'>
                        {stat.stat.name}: {stat.base_stat}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>

          </>
        )}
      </div>
       
    </div>
  );
};

export default Battle;
