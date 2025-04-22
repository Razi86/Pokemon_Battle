import { useParams,NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(data => setPokemon(data));
    }, [name]);

    const addToRoster = () => {
        const currentRoster = JSON.parse(localStorage.getItem('roster')) || [];
        if (currentRoster.find(p => p.name === name)) {
            alert(`${name} was already added to the roster!`);
            return;
        }
        if (!currentRoster.find(p => p.name === name)) {
            localStorage.setItem(
                'roster',
                JSON.stringify([
                    ...currentRoster,
                    { name,id : pokemon.id, sprite: pokemon.sprites.front_default, stats: pokemon.stats },
                ])
            );
        }
        alert(`${name} added to roster!`);
    };

    if (!pokemon) return <div className="text-center mt-10 text-xl">Loading...</div>;

    return (
        
        <div className="w-full min-h-[100vh] pt-[10rem] flex flex-col items-center bg-gray-100">
            
            <div className=" grid grid-cols-1 md:grid-cols-2  items-center border border-red-300 rounded-lg bg-white">
                {/* Left - Pokémon Image */}
                <div className="flex justify-center bg-gray-200 ">
            
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                        className=" min-h-[40vh]"
                    />
                </div>

                {/* Right - Info */}
                <div className='bg-white rounded-lg'>
                    <h2 className=" space-y-6 px-4 text-3xl font-bold flex justify-between text-red-800 ">ID: {pokemon.id} Name: {pokemon.name}</h2>
                    {/* Types */}
                    <div className="flex gap-2 bg-white">
                        {pokemon.types.map(type => (
                            <span className=" mt-4 mb-4 px-4 font-bold flex justify-centere text-red-800" >
                                Type: {type.type.name}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="space-y-6">
                        {pokemon.stats.map(stat => (
                            <div className=" text-xm flex justify-between text-gray-700 gap-x-2 border border-gray-300  rounded-lg" >
                                <span className=" px-4 font-semibold text-red-500">{stat.stat.name}</span>
                                <span className="px-4 font-semibold">{stat.base_stat}</span>
                            </div>

                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={addToRoster}
                            className="mt-5 bg-blue-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition duration-300"
                        >
                            Add to Roster
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-3 gap-5'>
                <button className='mt-5 bg-blue-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition duration-300'
                    onClick={() => navigate(-1)}>
                    Back to Home
                </button>
                <button className='mt-5 bg-blue-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition duration-300'
                    onClick={() => navigate("/roster")}>
                    Roster Page
                </button>
            </div>
            
        </div>
    );
};

export default PokemonDetails;
