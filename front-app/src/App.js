import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Crewmembers from "./pages/crewmembers";
import Ships from "./pages/ships";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ships />} />
        <Route path="/ships/:id/crewmembers" element={<Crewmembers />} />
      </Routes>
    </Router>
  );
}

export default App;
