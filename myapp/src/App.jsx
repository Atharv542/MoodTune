import React, { use } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Emotion from "./pages/Emotion";
 


function App() {
  const navigate= useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={()=>{navigate('/') }} className="flex cursor-pointer items-center gap-3">
          <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
          <span className="text-2xl font-bold">MoodTune</span>
        </button>
        
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/emotion" element={<Emotion />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
