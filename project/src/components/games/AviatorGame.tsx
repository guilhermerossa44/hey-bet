import React, { useState, useEffect, useCallback } from 'react';
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
  const [countdown, setCountdown] = useState(0);
  const [gamePhase, setGamePhase] = useState<'waiting' | 'betting' | 'flying' | 'crashed'>('waiting');

  const startNewRound = useCallback(() => {
    setGamePhase('betting');
    setCountdown(5);
    setMultiplier(1.00);
    setGameResult(null);
    setCashedOut(false);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setGamePhase('flying');
          setIsFlying(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isFlying && !cashedOut && gamePhase === 'flying') {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const increment = 0.01 + (Math.random() * 0.05);
          const newMultiplier = prev + increment;
          
          // Random crash calculation - higher multipliers have higher crash chance
          const crashChance = Math.min(0.02 + (newMultiplier - 1) * 0.01, 0.15);
          
          if (Math.random() < crashChance) {
            setIsFlying(false);
            setGamePhase('crashed');
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
              setHasActiveBet(false);
            }
            
            setTimeout(() => {
              setGamePhase('waiting');
              setTimeout(startNewRound, 2000);
            }, 3000);
            
            return newMultiplier;
          }
          
          return newMultiplier;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFlying, cashedOut, gamePhase, hasActiveBet, betAmount, addBet, startNewRound]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const placeBet = () => {
    if (!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > balance || gamePhase !== 'betting') return;
    
    setHasActiveBet(true);
  };

  const cashOut = () => {
    if (!hasActiveBet || cashedOut || gamePhase !== 'flying') return;
    
    setCashedOut(true);
    setIsFlying(false);
    setGamePhase('crashed');
    
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
    setHasActiveBet(false);
    
    setTimeout(() => {
      setGamePhase('waiting');
      setTimeout(startNewRound, 2000);
    }, 3000);
  };

  const quickBets = [5, 10, 25, 50, 100, 250];

  const getStatusText = () => {
    switch (gamePhase) {
      case 'waiting':
        return 'Aguardando próximo voo...';
      case 'betting':
        return `Apostas abertas! ${countdown}s`;
      case 'flying':
        return 'VOANDO...';
      case 'crashed':
        return gameResult?.crashed ? '💥 CRASHED!' : '✅ CASH OUT!';
      default:
        return '';
    }
  };

  const getMultiplierColor = () => {
    if (gamePhase === 'flying') return 'text-green-400 animate-pulse';
    if (gameResult?.crashed) return 'text-red-400';
    if (gameResult && !gameResult.crashed) return 'text-green-400';
    return 'text-white';
  };

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
                <div className={`text-8xl font-black mb-4 transition-all duration-300 ${getMultiplierColor()}`}>
                  {multiplier.toFixed(2)}x
                </div>
                
                <div className="text-2xl font-bold text-blue-300 mb-4">
                  {getStatusText()}
                </div>
                
                {gamePhase === 'betting' && (
                  <div className="text-yellow-400 text-lg">
                    Faça sua aposta agora!
                  </div>
                )}
              </div>

              {/* Plane Animation */}
              <div className="relative h-64 mb-8 overflow-hidden rounded-2xl bg-gradient-to-t from-blue-900/30 to-transparent">
                <div className={`absolute transition-all duration-1000 ${
                  gamePhase === 'flying' ? 'bottom-32 right-8 transform rotate-45' : 'bottom-4 left-4'
                }`}>
                  <Plane className={`w-12 h-12 text-blue-400 ${gamePhase === 'flying' ? 'animate-pulse' : ''}`} />
                </div>
                
                {/* Flight Path */}
                {gamePhase === 'flying' && (
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
                {gamePhase === 'betting' && !hasActiveBet && (
                  <button
                    onClick={placeBet}
                    disabled={!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > balance}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300"
                  >
                    APOSTAR R$ {betAmount || '0,00'}
                  </button>
                )}
                
                {gamePhase === 'flying' && hasActiveBet && !cashedOut && (
                  <button
                    onClick={cashOut}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl font-bold transition-all duration-300 animate-pulse"
                  >
                    CASH OUT R$ {(parseFloat(betAmount) * multiplier).toFixed(2)}
                  </button>
                )}

                {(gamePhase === 'waiting' || gamePhase === 'crashed') && (
                  <div className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-bold text-center">
                    {gamePhase === 'waiting' ? 'AGUARDE...' : 'ROUND FINALIZADO'}
                  </div>
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
                disabled={hasActiveBet || gamePhase === 'flying'}
                className="w-full px-4 py-4 bg-black/50 border border-blue-500/30 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {quickBets.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount.toString())}
                    disabled={hasActiveBet || gamePhase === 'flying'}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/40 hover:to-cyan-600/40 text-white rounded-lg text-sm font-bold transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <li>• Clique em APOSTAR durante a fase de apostas</li>
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
                    gamePhase === 'flying' ? 'text-green-400' : 
                    gamePhase === 'betting' ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {gamePhase === 'flying' ? 'VOANDO' : 
                     gamePhase === 'betting' ? 'APOSTAS ABERTAS' : 'AGUARDANDO'}
                  </span>
                </div>
                {hasActiveBet && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sua Aposta:</span>
                    <span className="text-orange-400 font-bold">R$ {betAmount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AviatorGame;