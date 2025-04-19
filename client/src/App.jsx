import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PokemonDetails from "./pages/PokemonDetails";
import Battle from './pages/Battle';
import Roster from "./pages/Roster";

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonDetails/:name" element={<PokemonDetails />} /> 
        <Route path="/battle" element={<Battle />} /> 
        <Route path="/battle" element={<Battle />} /> 
        <Route path="/roster" element={<Roster />} />
      </Routes>
    </div>
  );
}

export default App;
