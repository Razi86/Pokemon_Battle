import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonDetails/:name" element={<PokemonDetails />} /> 
      </Routes>
    </div>
  );
}

export default App;
