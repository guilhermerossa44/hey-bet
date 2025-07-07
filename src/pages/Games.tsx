import React, { useState } from 'react';
import { Plane, Bomb, Crown, Coins, Trophy, Zap, Target, Award, User } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import AviatorGame from '../components/games/AviatorGame';
import MinesGame from '../components/games/MinesGame';
import TigrinhoGame from '../components/games/TigrinhoGame';

const Games = () => {
  const { balance, gameStats } = useGame();
  const { isAuthenticated } = useAuth();
  const [selectedGame, setSelectedGame] = useState<'aviator' | 'mines' | 'tigrinho' | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const games = [
    {
      id: 'aviator',
      name: 'AVIATOR',
      description: 'Voe alto e multiplique seus ganhos',
      icon: Plane,
      color: 'from-blue-500 to-cyan-600',
      maxMultiplier: '1000x',
      minBet: 1,
      popular: true
    },
    {
      id: 'mines',
      name: 'MINES',
      description: 'Encontre os diamantes, evite as bombas',
      icon: Bomb,
      color: 'from-red-500 to-orange-600',
      maxMultiplier: '24x',
      minBet: 1,
      popular: true
    },
    {
      id: 'tigrinho',
      name: 'TIGRINHO',
      description: 'O jogo do tigre da sorte',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      maxMultiplier: '2500x',
      minBet: 1,
      popular: true
    }
  ];

  const handleGameSelect = (gameId: 'aviator' | 'mines' | 'tigrinho') => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedGame(gameId);
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {selectedGame === 'aviator' && <AviatorGame onBack={() => setSelectedGame(null)} />}
        {selectedGame === 'mines' && <MinesGame onBack={() => setSelectedGame(null)} />}
        {selectedGame === 'tigrinho' && <TigrinhoGame onBack={() => setSelectedGame(null)} />}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-12 rounded-3xl border border-orange-500/20">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-orange-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Faça Login para Jogar</h3>
                <p className="text-gray-400 text-lg mb-8">Entre na sua conta para acessar nossos jogos exclusivos!</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                >
                  ENTRAR AGORA
                </button>
              </div>
            </div>
          </div>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 px-4 py-2 rounded-full border border-orange-500/30 mb-4">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium">JOGOS PREMIUM</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                JOGOS
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Os melhores jogos com os maiores prêmios</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">JOGOS</span>
                <Target className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-white">3</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">JACKPOT</span>
                <Trophy className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-400">R$ 1M+</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">APOSTAS</span>
                <Award className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-400">{gameStats.totalBets}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">SALDO</span>
                <Coins className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-white">R$ {balance.toFixed(2)}</div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {games.map((game) => {
                const IconComponent = game.icon;
                return (
                  <div
                    key={game.id}
                    className="group relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleGameSelect(game.id as 'aviator' | 'mines' | 'tigrinho')}
                  >
                    <div className="p-8">
                      {/* Game Icon */}
                      <div className={`w-20 h-20 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Game Info */}
                      <div className="text-center">
                        <h3 className="text-2xl font-black text-white mb-2">{game.name}</h3>
                        <p className="text-gray-400 mb-4">{game.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-black/30 p-3 rounded-xl">
                            <div className="text-gray-400 text-xs">MAX WIN</div>
                            <div className="text-orange-400 font-bold">{game.maxMultiplier}</div>
                          </div>
                          <div className="bg-black/30 p-3 rounded-xl">
                            <div className="text-gray-400 text-xs">MIN BET</div>
                            <div className="text-white font-bold">R$ {game.minBet}</div>
                          </div>
                        </div>

                        {game.popular && (
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 rounded-full mb-4">
                            <Zap className="w-3 h-3 text-white" />
                            <span className="text-white text-xs font-bold">POPULAR</span>
                          </div>
                        )}

                        <button className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2`}>
                          <span>JOGAR AGORA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Games;