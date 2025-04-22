import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ORIGIN_URL } from "../config";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [originalPokemon, setOriginalPokemon] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      const res = await axios.post(
        `${ORIGIN_URL}users/logout`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.message);
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error);
    }
  };

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

  const handleSearch = (searchTerm) => {
    const filtered = originalPokemon.filter((poke) =>
      poke.name[0].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPokemon(filtered);
  };

  const sortPokemon = (order) => {
    const sorted = [...pokemon].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setPokemon(sorted);
    setSortOrder(order);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${ORIGIN_URL}users/check-session`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log(res.data.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        logout,
        handleSearch,
        pokemon,
        sortOrder,
        sortPokemon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
