import { useState, useEffect } from 'react';

const Roster = () => {
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('roster')) || [];
    setRoster(data);
  }, []);

  const removePokemon = (name) => {
    const newRoster = roster.filter(p => p.name !== name);
    setRoster(newRoster);
    localStorage.setItem('roster', JSON.stringify(newRoster));
  };

  return (
    <div className="homeContainer w-full min-h-[100vh] pt-[10rem] flex flex-col items-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">My Roster</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {roster.map(pokemon => (
          <div
            key={pokemon.name}
            className="pokemon-card w-[20rem] h-[26rem] flex flex-col items-center justify-between  rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
          >
            <figure className="w-full h-[70%] flex items-center justify-center bg-gray-200 shadow-sm rounded-t-lg">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="object-fill w-[90%] h-[90%]"
              />
            </figure>

            <div className="text w-full h-[30%] flex flex-col items-start justify-center gap-y-2 px-8">
              <h3 className="text-blue-900 text-xl font-medium capitalize">
                {pokemon.name}
              </h3>
              <p className="text-gray-600 text-sm font-normal">
                ID: {pokemon.id}
              </p>
              <button
                onClick={() => removePokemon(pokemon.name)}
                className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;
