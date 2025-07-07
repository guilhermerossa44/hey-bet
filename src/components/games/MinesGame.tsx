import React, { useState } from 'react';
import { ArrowLeft, Bomb, Diamond, RotateCcw, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface MinesGameProps {
  onBack: () => void;
}

interface Cell {
  id: number;
  revealed: boolean;
  isMine: boolean;
  isDiamond: boolean;
}

const MinesGame: React.FC<MinesGameProps> = ({ onBack }) => {
  const { balance, addBet } = useGame();
  const [betAmount, setBetAmount] = useState('');
  const [minesCount, setMinesCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [cells, setCells] = useState<Cell[]>([]);
  const [revealedDiamonds, setRevealedDiamonds] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);

  const initializeGame = () => {
    if (!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > balance) return;

    const newCells: Cell[] = [];
    for (let i = 0; i < 25; i++) {
      newCells.push({
        id: i,
        revealed: false,
        isMine: false,
        isDiamond: false
      });
    }

    // Place mines randomly
    const minePositions = new Set<number>();
    while (minePositions.size < minesCount) {
      const randomPos = Math.floor(Math.random() * 25);
      minePositions.add(randomPos);
    }

    minePositions.forEach(pos => {
      newCells[pos].isMine = true;
    });

    // Set diamonds in non-mine positions
    newCells.forEach(cell => {
      if (!cell.isMine) {
        cell.isDiamond = true;
      }
    });

    setCells(newCells);
    setGameStarted(true);
    setGameEnded(false);
    setRevealedDiamonds(0);
    setCurrentMultiplier(1);
  };

  const revealCell = (cellId: number) => {
    if (!gameStarted || gameEnded) return;

    const newCells = [...cells];
    const cell = newCells[cellId];
    
    if (cell.revealed) return;

    cell.revealed = true;

    if (cell.isMine) {
      // Game over - hit a mine
      setGameEnded(true);
      
      // Reveal all mines
      newCells.forEach(c => {
        if (c.isMine) c.revealed = true;
      });

      addBet({
        id: Date.now().toString(),
        amount: parseFloat(betAmount),
        color: 'red',
        result: 'black',
        won: false,
        winAmount: 0,
        timestamp: new Date()
      });
    } else {
      // Found a diamond
      const newRevealedDiamonds = revealedDiamonds + 1;
      setRevealedDiamonds(newRevealedDiamonds);
      
      // Calculate multiplier based on revealed diamonds and mines
      const totalDiamonds = 25 - minesCount;
      const multiplier = calculateMultiplier(newRevealedDiamonds, minesCount, totalDiamonds);
      setCurrentMultiplier(multiplier);
    }

    setCells(newCells);
  };

  const calculateMultiplier = (revealed: number, mines: number, totalDiamonds: number) => {
    if (revealed === 0) return 1;
    
    let multiplier = 1;
    for (let i = 0; i < revealed; i++) {
      const remaining = totalDiamonds - i;
      const totalRemaining = 25 - mines - i;
      multiplier *= (totalRemaining / remaining);
    }
    
    return Math.max(1, multiplier * 0.97); // 3% house edge
  };

  const cashOut = () => {
    if (!gameStarted || gameEnded || revealedDiamonds === 0) return;

    setGameEnded(true);
    const winAmount = parseFloat(betAmount) * currentMultiplier;

    addBet({
      id: Date.now().toString(),
      amount: parseFloat(betAmount),
      color: 'red',
      result: 'red',
      won: true,
      winAmount,
      timestamp: new Date()
    });
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCells([]);
    setRevealedDiamonds(0);
    setCurrentMultiplier(1);
  };

  const quickBets = [5, 10, 25, 50, 100, 250];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 py-8">
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
            <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              MINES
            </span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-red-900/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-red-500/20 shadow-2xl">
              {/* Game Stats */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{revealedDiamonds}</div>
                  <div className="text-gray-400 text-sm">DIAMANTES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{currentMultiplier.toFixed(2)}x</div>
                  <div className="text-gray-400 text-sm">MULTIPLICADOR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{minesCount}</div>
                  <div className="text-gray-400 text-sm">MINAS</div>
                </div>
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Array.from({ length: 25 }, (_, i) => {
                  const cell = cells[i];
                  return (
                    <button
                      key={i}
                      onClick={() => revealCell(i)}
                      disabled={!gameStarted || gameEnded || (cell && cell.revealed)}
                      className={`aspect-square rounded-xl font-bold text-xl transition-all duration-300 flex items-center justify-center ${
                        !cell || !cell.revealed
                          ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-400'
                          : cell.isMine
                          ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
                          : 'bg-gradient-to-br from-green-600 to-emerald-700 text-white'
                      } ${!gameStarted || gameEnded ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                    >
                      {cell && cell.revealed && (
                        <>
                          {cell.isMine ? <Bomb className="w-6 h-6" /> : <Diamond className="w-6 h-6" />}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {!gameStarted && (
                  <button
                    onClick={initializeGame}
                    disabled={!betAmount || parseFloat(betAmount) <= 0}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300"
                  >
                    INICIAR JOGO
                  </button>
                )}
                
                {gameStarted && !gameEnded && revealedDiamonds > 0 && (
                  <button
                    onClick={cashOut}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl font-bold transition-all duration-300"
                  >
                    CASH OUT R$ {(parseFloat(betAmount) * currentMultiplier).toFixed(2)}
                  </button>
                )}
                
                {gameEnded && (
                  <button
                    onClick={resetGame}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>NOVO JOGO</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Bet Amount */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-red-500/20">
              <h3 className="text-xl font-bold text-white mb-4">VALOR DA APOSTA</h3>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="R$ 0,00"
                disabled={gameStarted}
                className="w-full px-4 py-4 bg-black/50 border border-red-500/30 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                {quickBets.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount.toString())}
                    disabled={gameStarted}
                    className="px-3 py-2 bg-gradient-to-r from-red-500/20 to-orange-600/20 hover:from-red-500/40 hover:to-orange-600/40 text-white rounded-lg text-sm font-bold transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                  >
                    R$ {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Mines Count */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-red-500/20">
              <h3 className="text-xl font-bold text-white mb-4">NÚMERO DE MINAS</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 5, 7, 10, 15].map(count => (
                  <button
                    key={count}
                    onClick={() => setMinesCount(count)}
                    disabled={gameStarted}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                      minesCount === count
                        ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                        : 'bg-gradient-to-r from-red-500/20 to-orange-600/20 hover:from-red-500/40 hover:to-orange-600/40 text-white border border-red-500/30 hover:border-red-500/50'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-red-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-red-400" />
                <span>COMO JOGAR</span>
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm">
                <li>• Escolha o número de minas</li>
                <li>• Defina o valor da aposta</li>
                <li>• Clique nas células para revelar</li>
                <li>• Encontre diamantes, evite minas</li>
                <li>• Faça cash out a qualquer momento</li>
                <li>• Mais minas = maior multiplicador</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinesGame;