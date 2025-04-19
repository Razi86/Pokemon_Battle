import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Home() {
  const {
    pokemon = [],
    error,
    loading,
    sortPokemon,
    sortOrder,
  } = useContext(AuthContext);
  const [activeSort, setActiveSort] = useState(null);
  // const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(pokemon)
    ? pokemon.slice(offset, offset + itemsPerPage)
    : [];
  const pageCount = Math.ceil((pokemon?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // useEffect(() => {
  //   const fetchPokemon = async () => {
  //     try {
  //       const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await res.json();
  //       const pokemonData = await Promise.all(
  //         data.results.map(async (pokemon) => {
  //           const res = await fetch(pokemon.url);
  //           return res.json();
  //         })
  //       );
  //       setPokemonList(pokemonData);
  //     } catch (error) {
  //       console.error("Error fetching Pokemon data:", error);
  //     }
  //   };
  //   fetchPokemon();
  // }, []);

  return (
    <div className="homeContainer w-full min-h-[100vh] pt-[10rem] flex flex-col items-center bg-gray-100">
      <div className="heading-sort-text w-[calc(100%-10rem)] flex flex-col items-start justify-center gap-y-4">
        <div className="headings-btns w-full flex justify-between items-center border-b-4 border-blue-900 pb-2">
          <div className="headings w-full text-blue-900 flex justify-start items-end gap-x-2">
            <h1 className="text-5xl font-medium">Pokemon</h1>
            <h2 className="text-xl font-normal">List of Pokemon</h2>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                sortPokemon("asc");
                setActiveSort("asc");
              }}
              className={`w-[4.7rem] h-[2.3rem] border rounded-full shadow transition-all duration-300 cursor-pointer
              ${
                activeSort === "asc"
                  ? "bg-blue-900 text-yellow-300 font-bold border-blue-900"
                  : "text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-yellow-300 font-medium"
              }`}
            >
              A → Z
            </button>

            <button
              onClick={() => {
                sortPokemon("desc");
                setActiveSort("desc");
              }}
              className={`w-[4.7rem] h-[2.3rem] border rounded-full shadow transition-all duration-300 cursor-pointer
              ${
                activeSort === "desc"
                  ? "bg-blue-900 text-yellow-300 font-bold border-blue-900"
                  : "text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-yellow-300 font-medium"
              }`}
            >
              Z → A
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

                <NavLink
                  to={`/pokemonDetails/${pokemon.name}`}
                  className="text-blue-900 underline"
                >
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
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          containerClassName={"flex gap-2"}
          pageClassName={
            "px-4 py-2 bg-white rounded shadow text-blue-900 cursor-pointer"
          }
          activeClassName={
            "bg-blue-900 text-blue-900 font-bold border border-blue-700"
          }
          breakClassName={"text-blue-900 px-2 py-2"}
          previousClassName={
            "p-2 bg-blue-900 text-yellow-300 rounded shadow cursor-pointer"
          }
          nextClassName={
            "p-2 bg-blue-900 text-yellow-300 rounded shadow cursor-pointer"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
}

export default Home;
