import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Trophy, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';

const History = () => {
  const { bets } = useGame();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              HISTÓRICO
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Acompanhe todas as suas apostas</p>
        </div>

        {bets.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-12 rounded-3xl border border-orange-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nenhuma Aposta Ainda</h3>
              <p className="text-gray-400 text-lg mb-6">Comece a apostar para ver seu histórico aqui!</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                FAZER PRIMEIRA APOSTA
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm font-bold">VITÓRIAS</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {bets.filter(bet => bet.won).length}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm font-bold">DERROTAS</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {bets.filter(bet => !bet.won).length}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 text-sm font-bold">SEQUÊNCIA</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {bets.length > 0 && bets[0].won ? '🔥' : '❄️'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 text-sm font-bold">TOTAL</span>
                </div>
                <div className="text-2xl font-bold text-white">{bets.length}</div>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-3xl border border-orange-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white">ÚLTIMAS APOSTAS</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">HORÁRIO</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">APOSTA</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">RESULTADO</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">VALOR</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">RETORNO</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-bold text-sm">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bets.map((bet, index) => (
                      <tr key={bet.id} className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-900/20' : 'bg-black/20'}`}>
                        <td className="px-6 py-4 text-gray-300 font-medium">
                          {formatDate(bet.timestamp)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${
                              bet.color === 'red' ? 'bg-red-500' : 'bg-gray-600'
                            }`}></div>
                            <span className="text-white font-bold">
                              {bet.color === 'red' ? 'VERMELHO' : 'PRETO'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${
                              bet.result === 'red' ? 'bg-red-500' : 'bg-gray-600'
                            }`}></div>
                            <span className="text-white font-bold">
                              {bet.result === 'red' ? 'VERMELHO' : 'PRETO'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white font-bold">
                          R$ {bet.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${bet.won ? 'text-green-400' : 'text-red-400'}`}>
                            R$ {bet.winAmount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {bet.won ? (
                              <>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-bold text-sm">GANHOU</span>
                              </>
                            ) : (
                              <>
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span className="text-red-400 font-bold text-sm">PERDEU</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;