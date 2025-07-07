import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, User, History, Home, DollarSign, Menu, LogOut, LogIn, Gamepad2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const location = useLocation();
  const { balance } = useGame();
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };
  
  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-orange-500/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Hey Bet
                </span>
                <div className="text-xs text-gray-400 -mt-1">APOSTAS ONLINE</div>
              </div>
            </Link>
            
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-2">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/') 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Início</span>
                </Link>
                <Link
                  to="/betting"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/betting') 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span className="font-medium">Double</span>
                </Link>
                <Link
                  to="/games"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/games') 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span className="font-medium">Jogos</span>
                </Link>
                <Link
                  to="/history"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/history') 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span className="font-medium">Histórico</span>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/profile') 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Perfil</span>
                </Link>
              </nav>
            )}
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-2 rounded-xl shadow-lg border border-green-500/30">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-lg">R$ {balance.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center space-x-2 text-gray-300">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-sm">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Sair</span>
                  </button>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Entrar</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">Cadastrar</span>
                  </button>
                </div>
              )}
              <button className="md:hidden p-2 text-gray-300 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;