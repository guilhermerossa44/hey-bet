import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Betting from './pages/Betting';
import Games from './pages/Games';
import History from './pages/History';
import Profile from './pages/Profile';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/betting" element={<Betting />} />
              <Route path="/games" element={<Games />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;