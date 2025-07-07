import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Zap, RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface TigrinhoGameProps {
  onBack: () => void;
}

const TigrinhoGame: React.FC<TigrinhoGameProps> = ({ onBack }) => {
  const { balance, addBet } = useGame();
  const [betAmount, setBetAmount] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🐅', '🐅', '🐅']);
  const [gameResult, setGameResult] = useState<{ won: boolean; multiplier: number; winAmount: number } | null>(null);

  const symbols = ['🐅', '👑', '💎', '🍀', '⭐', '🔥', '💰', '🎰'];
  const payouts = {
    '🐅🐅🐅': 2500, // Jackpot
    '👑👑👑': 1000,
    '💎💎💎': 500,
    '🍀🍀🍀': 250,
    '⭐⭐⭐': 100,
    '🔥🔥🔥': 50,
    '💰💰💰': 25,
    '🎰🎰🎰': 10,
    // Two matching symbols
    '🐅🐅': 5,
    '👑👑': 3,
    '💎💎': 2,
  };

  const spin = async () => {
    if (!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > balance) return;

    setIsSpinning(true);
    setGameResult(null);

    // Animate spinning
    const spinDuration = 2000;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Determine final result
      const finalReels = generateResult();
      setReels(finalReels);
      
      const result = calculateWin(finalReels, parseFloat(betAmount));
      setGameResult(result);
      
      addBet({
        id: Date.now().toString(),
        amount: parseFloat(betAmount),
        color: result.won ? 'red' : 'black',
        result: result.won ? 'red' : 'black',
        won: result.won,
        winAmount: result.winAmount,
        timestamp: new Date()
      });
      
      setIsSpinning(false);
    }, spinDuration);
  };

  const generateResult = () => {
    // Weighted probability for different outcomes
    const random = Math.random();
    
    if (random < 0.001) { // 0.1% chance for jackpot
      return ['🐅', '🐅', '🐅'];
    } else if (random < 0.005) { // 0.4% chance for other triple matches
      const symbol = symbols[Math.floor(Math.random() * (symbols.length - 1)) + 1];
      return [symbol, symbol, symbol];
    } else if (random < 0.05) { // 4.5% chance for double matches
      const symbol = symbols[Math.floor(Math.random() * 3)]; // Only high-value symbols
      const otherSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      return [symbol, symbol, otherSymbol];
    } else { // 95% chance for no match
      let result;
      do {
        result = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
      } while (isWinningCombination(result));
      return result;
    }
  };

  const isWinningCombination = (reels: string[]) => {
    const combination = reels.join('');
    return Object.keys(payouts).some(key => combination.includes(key));
  };

  const calculateWin = (reels: string[], betAmount: number) => {
    const combination = reels.join('');
    
    // Check for three of a kind first
    for (const [pattern, multiplier] of Object.entries(payouts)) {
      if (pattern.length === 3 && combination === pattern) {
        return {
          won: true,
          multiplier,
          winAmount: betAmount * multiplier
        };
      }
    }
    
    // Check for two of a kind
    for (const [pattern, multiplier] of Object.entries(payouts)) {
      if (pattern.length === 2) {
        const symbol = pattern[0];
        const count = reels.filter(r => r === symbol).length;
        if (count >= 2) {
          return {
            won: true,
            multiplier,
            winAmount: betAmount * multiplier
          };
        }
      }
    }
    
    return {
      won: false,
      multiplier: 0,
      winAmount: 0
    };
  };

  const quickBets = [5, 10, 25, 50, 100, 250];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-black to-gray-900 py-8">
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
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              TIGRINHO
            </span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-yellow-900/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-yellow-500/20 shadow-2xl">
              {/* Slot Machine */}
              <div className="bg-gradient-to-br from-yellow-800/30 to-orange-800/30 p-8 rounded-2xl border border-yellow-500/30 mb-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gradient-to-br from-yellow-600 to-orange-700 rounded-2xl flex items-center justify-center text-6xl border-4 border-yellow-400/50 shadow-2xl ${
                        isSpinning ? 'animate-spin' : ''
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
                
                {/* Result Display */}
                {gameResult && !isSpinning && (
                  <div className="text-center">
                    {gameResult.won ? (
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          🎉 VOCÊ GANHOU! 🎉
                        </div>
                        <div className="text-xl text-white">
                          {gameResult.multiplier}x • R$ {gameResult.winAmount.toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-red-500/20 to-orange-600/20 border border-red-500/30 rounded-xl p-4">
                        <div className="text-2xl font-bold text-red-400">
                          Tente novamente!
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Spin Button */}
              <button
                onClick={spin}
                disabled={isSpinning || !betAmount || parseFloat(betAmount) <= 0}
                className="w-full py-6 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-black text-2xl rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl"
              >
                {isSpinning ? (
                  <>
                    <RotateCcw className="w-8 h-8 animate-spin" />
                    <span>GIRANDO...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-8 h-8" />
                    <span>GIRAR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Bet Amount */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">VALOR DA APOSTA</h3>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="R$ 0,00"
                disabled={isSpinning}
                className="w-full px-4 py-4 bg-black/50 border border-yellow-500/30 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
              />
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {quickBets.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount.toString())}
                    disabled={isSpinning}
                    className="px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 hover:from-yellow-500/40 hover:to-orange-600/40 text-white rounded-lg text-sm font-bold transition-all duration-300 border border-yellow-500/30 hover:border-yellow-500/50"
                  >
                    R$ {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Paytable */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>TABELA DE PRÊMIOS</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-lg">
                  <span className="text-white">🐅🐅🐅</span>
                  <span className="text-yellow-400 font-bold">2500x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                  <span className="text-white">👑👑👑</span>
                  <span className="text-yellow-400 font-bold">1000x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                  <span className="text-white">💎💎💎</span>
                  <span className="text-yellow-400 font-bold">500x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                  <span className="text-white">🍀🍀🍀</span>
                  <span className="text-yellow-400 font-bold">250x</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                  <span className="text-white">🐅🐅</span>
                  <span className="text-green-400 font-bold">5x</span>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>COMO JOGAR</span>
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Defina o valor da sua aposta</li>
                <li>• Clique em GIRAR</li>
                <li>• 3 símbolos iguais = grande prêmio</li>
                <li>• 2 símbolos iguais = prêmio menor</li>
                <li>• Tigre triplo = JACKPOT 2500x!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TigrinhoGame;