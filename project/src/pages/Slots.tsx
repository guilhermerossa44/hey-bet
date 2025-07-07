import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Coins, Trophy, Zap, Crown, Star, Diamond, Flame, Target, Award } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface SlotGame {
  id: string;
  name: string;
  provider: string;
  image: string;
  minBet: number;
  maxBet: number;
  maxWin: string;
  rtp: number;
  volatility: 'Baixa' | 'Média' | 'Alta';
  popular: boolean;
  new: boolean;
}

const slotGames: SlotGame[] = [
  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.5,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '21.100x',
    rtp: 96.48,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'sugar-rush',
    name: 'Sugar Rush',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.5,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'the-dog-house',
    name: 'The Dog House',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '6.750x',
    rtp: 96.51,
    volatility: 'Alta',
    popular: false,
    new: false
  },
  {
    id: 'big-bass-bonanza',
    name: 'Big Bass Bonanza',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.10,
    maxBet: 250,
    maxWin: '2.100x',
    rtp: 96.71,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'fruit-party',
    name: 'Fruit Party',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.5,
    volatility: 'Alta',
    popular: false,
    new: false
  },
  {
    id: 'wild-west-gold',
    name: 'Wild West Gold',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.51,
    volatility: 'Alta',
    popular: false,
    new: false
  },
  {
    id: 'starlight-princess',
    name: 'Starlight Princess',
    provider: 'Pragmatic Play',
    image: 'https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.5,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'book-of-dead',
    name: 'Book of Dead',
    provider: 'Play\'n GO',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.01,
    maxBet: 100,
    maxWin: '5.000x',
    rtp: 96.21,
    volatility: 'Alta',
    popular: true,
    new: false
  },
  {
    id: 'fire-joker',
    name: 'Fire Joker',
    provider: 'Play\'n GO',
    image: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.05,
    maxBet: 100,
    maxWin: '800x',
    rtp: 96.15,
    volatility: 'Média',
    popular: false,
    new: false
  },
  {
    id: 'reactoonz',
    name: 'Reactoonz',
    provider: 'Play\'n GO',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.20,
    maxBet: 100,
    maxWin: '4.570x',
    rtp: 96.51,
    volatility: 'Alta',
    popular: false,
    new: false
  },
  {
    id: 'money-train-3',
    name: 'Money Train 3',
    provider: 'Relax Gaming',
    image: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=400',
    minBet: 0.10,
    maxBet: 20,
    maxWin: '100.000x',
    rtp: 96.1,
    volatility: 'Alta',
    popular: true,
    new: true
  }
];

const Slots = () => {
  const { balance } = useGame();
  const [selectedGame, setSelectedGame] = useState<SlotGame | null>(null);
  const [filter, setFilter] = useState<'all' | 'popular' | 'new'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = slotGames.filter(game => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'popular' && game.popular) || 
                         (filter === 'new' && game.new);
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const playGame = (game: SlotGame) => {
    setSelectedGame(game);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 px-4 py-2 rounded-full border border-orange-500/30 mb-4">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium">SLOTS PREMIUM</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              CAÇA-NÍQUEIS
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Os melhores slots com os maiores prêmios</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">JOGOS</span>
              <Target className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-white">{slotGames.length}</div>
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
              <span className="text-gray-400 text-sm">RTP MÉDIO</span>
              <Award className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-400">96.5%</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">SALDO</span>
              <Coins className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">R$ {balance.toFixed(2)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                TODOS
              </button>
              <button
                onClick={() => setFilter('popular')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                  filter === 'popular' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>POPULARES</span>
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                  filter === 'new' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>NOVOS</span>
              </button>
            </div>
            
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-3 bg-gray-800/50 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => playGame(game)}
              >
                {/* Game Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {game.popular && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>HOT</span>
                      </div>
                    )}
                    {game.new && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>NOVO</span>
                      </div>
                    )}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-1 truncate">{game.name}</h3>
                  <p className="text-gray-400 text-xs mb-2">{game.provider}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-green-400 font-bold">RTP {game.rtp}%</div>
                    <div className="text-orange-400 font-bold">{game.maxWin}</div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-400">R$ {game.minBet} - R$ {game.maxBet}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      game.volatility === 'Alta' ? 'bg-red-500/20 text-red-400' :
                      game.volatility === 'Média' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {game.volatility}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-orange-500/30 p-8 max-w-2xl w-full">
              <div className="text-center">
                <img
                  src={selectedGame.image}
                  alt={selectedGame.name}
                  className="w-32 h-32 object-cover rounded-2xl mx-auto mb-6"
                />
                <h2 className="text-3xl font-black text-white mb-2">{selectedGame.name}</h2>
                <p className="text-orange-400 font-bold mb-6">{selectedGame.provider}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm">RTP</div>
                    <div className="text-green-400 font-bold text-xl">{selectedGame.rtp}%</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm">MAX WIN</div>
                    <div className="text-orange-400 font-bold text-xl">{selectedGame.maxWin}</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm">APOSTA MIN</div>
                    <div className="text-white font-bold text-xl">R$ {selectedGame.minBet}</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm">VOLATILIDADE</div>
                    <div className="text-white font-bold text-xl">{selectedGame.volatility}</div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300"
                  >
                    VOLTAR
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>JOGAR AGORA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slots;