import React, { useState } from 'react';
import { Coins, RefreshCw, TrendingUp, TrendingDown, Flame, Zap, User } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const Betting = () => {
  const { balance, addBet, gameStats } = useGame();
  const { isAuthenticated } = useAuth();
  const [betAmount, setBetAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<'red' | 'black' | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleBet = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedColor || !betAmount || parseFloat(betAmount) <= 0) return;
    
    const amount = parseFloat(betAmount);
    if (amount > balance) {
      alert('Saldo insuficiente!');
      return;
    }

    setIsSpinning(true);
    
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'red' : 'black';
      const won = result === selectedColor;
      const winAmount = won ? amount * 2 : 0;
      
      addBet({
        id: Date.now().toString(),
        amount,
        color: selectedColor,
        result,
        won,
        winAmount,
        timestamp: new Date()
      });
      
      setLastResult(result);
      setIsSpinning(false);
      setBetAmount('');
      setSelectedColor(null);
    }, 3000);
  };

  const quickBets = [5, 10, 25, 50, 100, 250];

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
                <h3 className="text-3xl font-bold text-white mb-4">Faça Login para Apostar</h3>
                <p className="text-gray-400 text-lg mb-8">Entre na sua conta para começar a jogar e ganhar prêmios incríveis!</p>
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
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium">JOGO AO VIVO</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                DOUBLE
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Escolha vermelho ou preto e multiplique por 2x</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">APOSTAS</span>
                <Coins className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-white">{gameStats.totalBets}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">APOSTADO</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-white">R$ {gameStats.totalWagered.toFixed(0)}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">GANHO</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-400">R$ {gameStats.totalWon.toFixed(0)}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">VITÓRIAS</span>
                <TrendingDown className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-white">{gameStats.winRate}%</div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Game Area */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 shadow-2xl">
                {/* Roulette */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className={`w-48 h-48 mx-auto rounded-full border-8 flex items-center justify-center transition-all duration-500 shadow-2xl ${
                      isSpinning ? 'animate-spin border-orange-500' : 
                      lastResult === 'red' ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400' : 
                      lastResult === 'black' ? 'bg-gradient-to-br from-gray-700 to-gray-900 border-gray-400' : 
                      'bg-gradient-to-br from-gray-700 to-gray-900 border-orange-500/50'
                    }`}>
                      {isSpinning ? (
                        <div className="text-center">
                          <Zap className="w-12 h-12 text-white mx-auto mb-2 animate-pulse" />
                          <div className="text-white font-bold">GIRANDO</div>
                        </div>
                      ) : lastResult ? (
                        <div className="text-center">
                          <div className="text-white font-black text-2xl mb-1">
                            {lastResult === 'red' ? 'VERMELHO' : 'PRETO'}
                          </div>
                          <div className="text-white/80 text-sm">VENCEDOR</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-6xl text-white/50 font-bold">?</div>
                          <div className="text-white/60 text-sm mt-2">AGUARDANDO</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${
                      isSpinning ? 'bg-orange-500' :
                      lastResult === 'red' ? 'bg-red-500' :
                      lastResult === 'black' ? 'bg-gray-500' :
                      'bg-orange-500/30'
                    }`}></div>
                  </div>
                  
                  {lastResult && !isSpinning && (
                    <div className="mt-6 p-4 bg-black/30 rounded-2xl border border-orange-500/20">
                      <p className="text-lg text-gray-300">
                        Último resultado: <span className={`font-bold text-xl ${lastResult === 'red' ? 'text-red-400' : 'text-white'}`}>
                          {lastResult === 'red' ? 'VERMELHO' : 'PRETO'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <button
                    onClick={() => setSelectedColor('red')}
                    disabled={isSpinning}
                    className={`group relative overflow-hidden py-8 px-6 rounded-2xl font-black text-white text-xl transition-all duration-300 ${
                      selectedColor === 'red' 
                        ? 'bg-gradient-to-br from-red-500 to-red-700 ring-4 ring-red-400 shadow-2xl shadow-red-500/25 scale-105' 
                        : 'bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 hover:scale-105'
                    } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="relative z-10">
                      <div className="text-3xl mb-2">🔴</div>
                      <div>VERMELHO</div>
                      <div className="text-sm font-normal opacity-80">2.00x</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedColor('black')}
                    disabled={isSpinning}
                    className={`group relative overflow-hidden py-8 px-6 rounded-2xl font-black text-white text-xl transition-all duration-300 ${
                      selectedColor === 'black' 
                        ? 'bg-gradient-to-br from-gray-700 to-gray-900 ring-4 ring-gray-400 shadow-2xl shadow-gray-500/25 scale-105' 
                        : 'bg-gradient-to-br from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 hover:scale-105'
                    } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="relative z-10">
                      <div className="text-3xl mb-2">⚫</div>
                      <div>PRETO</div>
                      <div className="text-sm font-normal opacity-80">2.00x</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Betting Panel */}
            <div className="space-y-6">
              {/* Bet Amount */}
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-xl font-bold text-white mb-4">VALOR DA APOSTA</h3>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="R$ 0,00"
                  disabled={isSpinning}
                  className="w-full px-4 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {quickBets.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount.toString())}
                      disabled={isSpinning}
                      className="px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 hover:from-orange-500/40 hover:to-red-600/40 text-white rounded-lg text-sm font-bold transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50"
                    >
                      R$ {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bet Button */}
              <button
                onClick={handleBet}
                disabled={!selectedColor || !betAmount || isSpinning || parseFloat(betAmount) <= 0}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-black text-xl rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 disabled:transform-none"
              >
                {isSpinning ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>GIRANDO...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-6 h-6" />
                    <span>APOSTAR</span>
                  </>
                )}
              </button>

              {/* Rules */}
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-lg font-bold text-white mb-4">🎯 COMO JOGAR</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Escolha VERMELHO ou PRETO</li>
                  <li>• Defina o valor da sua aposta</li>
                  <li>• Acertou? Ganhe 2x o valor!</li>
                  <li>• Errou? Tente novamente!</li>
                  <li>• 50% de chance em cada cor</li>
                </ul>
              </div>
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

export default Betting;