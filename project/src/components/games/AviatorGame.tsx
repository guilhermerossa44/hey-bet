import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plane, TrendingUp, Zap } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface AviatorGameProps {
  onBack: () => void;
}

const AviatorGame: React.FC<AviatorGameProps> = ({ onBack }) => {
  const { balance, addBet } = useGame();
  const [betAmount, setBetAmount] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.00);
  const [hasActiveBet, setHasActiveBet] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [gameResult, setGameResult] = useState<{ multiplier: number; crashed: boolean } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isFlying && !cashedOut) {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const newMultiplier = prev + (Math.random() * 0.1);
          
          // Random crash between 1.1x and 10x
          const crashPoint = 1.1 + Math.random() * 8.9;
          if (newMultiplier >= crashPoint) {
            setIsFlying(false);
            setGameResult({ multiplier: newMultiplier, crashed: true });
            
            if (hasActiveBet) {
              // Player lost
              addBet({
                id: Date.now().toString(),
                amount: parseFloat(betAmount),
                color: 'red',
                result: 'black',
                won: false,
                winAmount: 0,
                timestamp: new Date()
              });
            }
            
            setTimeout(() => {
              setMultiplier(1.00);
              setHasActiveBet(false);
              setCashedOut(false);
              setGameResult(null);
              startNewRound();
            }, 3000);
            
            return newMultiplier;
          }
          
          return newMultiplier;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isFlying, cashedOut, hasActiveBet, betAmount, addBet]);

  const startNewRound = () => {
    setTimeout(() => {
      setIsFlying(true);
    }, 2000);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const placeBet = () => {
    if (!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > balance) return;
    
    setHasActiveBet(true);
  };

  const cashOut = () => {
    if (!hasActiveBet || cashedOut) return;
    
    setCashedOut(true);
    setIsFlying(false);
    
    const winAmount = parseFloat(betAmount) * multiplier;
    
    addBet({
      id: Date.now().toString(),
      amount: parseFloat(betAmount),
      color: 'red',
      result: 'red',
      won: true,
      winAmount,
      timestamp: new Date()
    });
    
    setGameResult({ multiplier, crashed: false });
    
    setTimeout(() => {
      setMultiplier(1.00);
      setHasActiveBet(false);
      setCashedOut(false);
      setGameResult(null);
      startNewRound();
    }, 3000);
  };

  const quickBets = [5, 10, 25, 50, 100, 250];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-black text-white">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              AVIATOR
            </span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-900/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/20 shadow-2xl">
              {/* Multiplier Display */}
              <div className="text-center mb-8">
                <div className={`text-8xl font-black mb-4 transition-all duration-300 ${
                  isFlying ? 'text-green-400 animate-pulse' : 
                  gameResult?.crashed ? 'text-red-400' : 'text-white'
                }`}>
                  {multiplier.toFixed(2)}x
                </div>
                
                {isFlying && (
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Plane className="w-6 h-6 animate-bounce" />
                    <span className="text-xl font-bold">VOANDO...</span>
                  </div>
                )}
                
                {gameResult && (
                  <div className={`text-2xl font-bold ${gameResult.crashed ? 'text-red-400' : 'text-green-400'}`}>
                    {gameResult.crashed ? '💥 CRASHED!' : '✅ CASH OUT!'}
                  </div>
                )}
                
                {!isFlying && !gameResult && (
                  <div className="text-gray-400 text-xl">Próximo voo em breve...</div>
                )}
              </div>

              {/* Plane Animation */}
              <div className="relative h-64 mb-8 overflow-hidden rounded-2xl bg-gradient-to-t from-blue-900/30 to-transparent">
                <div className={`absolute transition-all duration-1000 ${
                  isFlying ? 'bottom-32 right-8 transform rotate-45' : 'bottom-4 left-4'
                }`}>
                  <Plane className={`w-12 h-12 text-blue-400 ${isFlying ? 'animate-pulse' : ''}`} />
                </div>
                
                {/* Flight Path */}
                {isFlying && (
                  <div className="absolute bottom-0 left-0 w-full h-full">
                    <svg className="w-full h-full">
                      <path
                        d="M 0 240 Q 200 200 400 100"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="10,5"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {!hasActiveBet && isFlying && (
                  <button
                    onClick={placeBet}
                    disabled={!betAmount || parseFloat(betAmount) <= 0}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300"
                  >
                    APOSTAR R$ {betAmount || '0,00'}
                  </button>
                )}
                
                {hasActiveBet && isFlying && !cashedOut && (
                  <button
                    onClick={cashOut}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl font-bold transition-all duration-300 animate-pulse"
                  >
                    CASH OUT R$ {(parseFloat(betAmount) * multiplier).toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Bet Amount */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">VALOR DA APOSTA</h3>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="R$ 0,00"
                disabled={hasActiveBet}
                className="w-full px-4 py-4 bg-black/50 border border-blue-500/30 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {quickBets.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount.toString())}
                    disabled={hasActiveBet}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/40 hover:to-cyan-600/40 text-white rounded-lg text-sm font-bold transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                  >
                    R$ {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>COMO JOGAR</span>
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Defina o valor da sua aposta</li>
                <li>• Clique em APOSTAR quando o avião decolar</li>
                <li>• Faça CASH OUT antes do avião cair</li>
                <li>• Quanto mais alto, maior o multiplicador</li>
                <li>• Cuidado! O avião pode cair a qualquer momento</li>
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>ESTATÍSTICAS</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Saldo:</span>
                  <span className="text-white font-bold">R$ {balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Multiplicador Atual:</span>
                  <span className="text-blue-400 font-bold">{multiplier.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`font-bold ${
                    isFlying ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {isFlying ? 'VOANDO' : 'AGUARDANDO'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AviatorGame;