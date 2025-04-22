import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const PokemonContext = createContext();

function PokemonContextProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=80");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setOriginalPokemon(pokemonData);
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <PokemonContext.Provider value={{ pokemon, setPokemon, loading, error }}>
        {children}
      </PokemonContext.Provider>
    </div>
  );
}

export default PokemonContextProvider;
