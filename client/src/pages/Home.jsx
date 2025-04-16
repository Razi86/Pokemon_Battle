import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const offset = currentPage * itemsPerPage;
  const currentItems = pokemonList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(pokemonList.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
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
        setPokemonList(pokemonData);
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
    <div className="homeContainer w-full min-h-[100vh] pt-[10rem] flex flex-col items-center bg-gray-100">
      <div className="heading-sort-text w-[calc(100%-10rem)] flex flex-col items-start justify-center gap-y-4">
        <div className="headings-btns w-full flex justify-between items-center border-b-4 border-blue-900 pb-2">
          <div className="headings w-full text-blue-900 flex justify-start items-end gap-x-2">
            <h1 className="text-5xl font-medium">Pokemon</h1>
            <h2 className="text-xl font-normal">List of Pokemon</h2>
          </div>
          <div className="btns flex items-end gap-x-2">
            <button className="btn w-[6rem] btn-outline rounded-full outline-blue-900 text-[1rem] text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-[.5s]">
              A-Z
            </button>
            <button className="btn w-[6rem] btn-outline rounded-full outline-blue-900 text-[1rem] text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-[.5s]">
              Z-A
            </button>
          </div>
        </div>
        <div className="text">
          <p className="text-blue-900 text-[1.1rem]">
            Click on it to select the pokémon you want to bring into battle.
          </p>
        </div>
      </div>

      <div className="pokemon-list w-full flex flex-wrap justify-center items-center gap-x-4 gap-y-6 mt-5">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error.message}</div>
        ) : (
          currentItems.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card w-[20rem] h-[26rem] flex flex-col items-center justify-between bg-white rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <figure className="w-full h-[70%] flex items-center justify-center bg-gray-200 shadow-sm rounded-t-lg">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
                  className="object-fill w-[70%] h-[70%]"
                />
              </figure>

              <div className="text w-full h-[30%] flex flex-col items-start justify-center gap-y-2 px-8">
                <h3 className="text-blue-900 text-xl font-medium capitalize">
                  {pokemon.name}
                </h3>
                <p className="text-gray-600 text-sm font-normal">
                  ID: {pokemon.id}
                </p>
                
                 
                <NavLink to={`/pokemonDetails/${pokemon.name}`} className="text-blue-900 underline">
                  More Details
                </NavLink>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination mt-10">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          pageClassName={
            "px-4 py-2 bg-white rounded shadow text-blue-900 cursor-pointer"
          }
          activeClassName={"bg-blue-900 text-blue-900"}
          previousClassName={"p-2 bg-blue-900 rounded shadow cursor-pointer"}
          nextClassName={"p-2 bg-blue-900 rounded shadow cursor-pointer"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
}

export default Home;
