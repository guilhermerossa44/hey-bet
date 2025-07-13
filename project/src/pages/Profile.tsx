import React, { useState } from 'react';
import { User, Wallet, TrendingUp, Award, Calendar, Crown, Star, Target, Plus, Minus, CreditCard, Smartphone, Edit, Camera, Save, X } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import AuthModal from '../components/AuthModal';

const Profile = () => {
  const { balance, gameStats, bets } = useGame();
  const { isAuthenticated, user, updateUser } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'deposit' | 'withdraw'>('deposit');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    profileImage: user?.profileImage || ''
  });

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
                <h3 className="text-3xl font-bold text-white mb-4">Acesso Restrito</h3>
                <p className="text-gray-400 text-lg mb-8">Faça login para acessar seu perfil e gerenciar sua conta.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                  >
                    FAZER LOGIN
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-8 py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    CRIAR CONTA
                  </button>
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
  }

  const memberSince = new Date(2024, 0, 1);
  const totalProfit = gameStats.totalWon - (gameStats.totalWagered - gameStats.totalWon);
  const bestWin = bets.length > 0 ? Math.max(...bets.map(bet => bet.winAmount)) : 0;

  const getPlayerLevel = () => {
    if (gameStats.totalBets >= 100) return { name: 'LENDÁRIO', icon: Crown, color: 'from-yellow-400 to-orange-500' };
    if (gameStats.totalBets >= 50) return { name: 'EXPERT', icon: Star, color: 'from-purple-400 to-pink-500' };
    if (gameStats.totalBets >= 20) return { name: 'AVANÇADO', icon: Target, color: 'from-blue-400 to-cyan-500' };
    if (gameStats.totalBets >= 5) return { name: 'INICIANTE', icon: User, color: 'from-green-400 to-emerald-500' };
    return { name: 'NOVATO', icon: User, color: 'from-gray-400 to-gray-500' };
  };

  const playerLevel = getPlayerLevel();

  const handlePayment = (type: 'deposit' | 'withdraw') => {
    setPaymentType(type);
    setShowPaymentModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditData({ ...editData, profileImage: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    updateUser({
      name: editData.name,
      profileImage: editData.profileImage
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      name: user?.name || '',
      profileImage: user?.profileImage || ''
    });
    setIsEditing(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                PERFIL
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Suas estatísticas e conquistas</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/30 mb-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-4 border-orange-500/50 overflow-hidden">
                    {(isEditing ? editData.profileImage : user?.profileImage) ? (
                      <img 
                        src={isEditing ? editData.profileImage : user?.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${playerLevel.color} rounded-full flex items-center justify-center border-2 border-black`}>
                    <playerLevel.icon className="w-6 h-6 text-white" />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors border-2 border-black">
                      <Camera className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <div className="text-center md:text-left flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="text-4xl font-black text-white bg-transparent border-b-2 border-orange-500 focus:outline-none focus:border-orange-400 text-center md:text-left"
                        placeholder="Seu nome"
                      />
                      <div className="flex space-x-4 justify-center md:justify-start">
                        <button
                          onClick={handleSaveChanges}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300"
                        >
                          <Save className="w-4 h-4" />
                          <span>SALVAR</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                          <span>CANCELAR</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4 mb-2">
                        <h2 className="text-4xl font-black text-white">{user?.name}</h2>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          <Edit className="w-6 h-6" />
                        </button>
                      </div>
                      <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${playerLevel.color} px-4 py-2 rounded-full mb-4`}>
                        <playerLevel.icon className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-sm">{playerLevel.name}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2 text-orange-300">
                        <Calendar className="w-4 h-4" />
                        <span>Membro desde {memberSince.toLocaleDateString('pt-BR')}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 rounded-2xl border border-green-500/30 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wallet className="w-5 h-5 text-white" />
                      <span className="text-green-100 text-sm font-medium">SALDO ATUAL</span>
                    </div>
                    <div className="text-3xl font-black text-white">R$ {balance.toFixed(2)}</div>
                  </div>
                  
                  {/* Payment Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePayment('deposit')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      <span>DEPOSITAR</span>
                    </button>
                    <button
                      onClick={() => handlePayment('withdraw')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300"
                    >
                      <Minus className="w-4 h-4" />
                      <span>SACAR</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Smartphone className="w-6 h-6 text-green-400" />
                  <span>PIX</span>
                </h3>
                <p className="text-gray-400 mb-4">Depósitos e saques instantâneos via PIX</p>
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div className="flex justify-between">
                    <span>Depósito mínimo:</span>
                    <span className="text-green-400 font-bold">R$ 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saque mínimo:</span>
                    <span className="text-blue-400 font-bold">R$ 50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa:</span>
                    <span className="text-green-400 font-bold">Grátis</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePayment('deposit')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    DEPOSITAR
                  </button>
                  <button
                    onClick={() => handlePayment('withdraw')}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    SACAR
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                  <span>CARTÃO</span>
                </h3>
                <p className="text-gray-400 mb-4">Depósitos com cartão de crédito</p>
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div className="flex justify-between">
                    <span>Depósito mínimo:</span>
                    <span className="text-blue-400 font-bold">R$ 20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depósito máximo:</span>
                    <span className="text-blue-400 font-bold">R$ 5.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa:</span>
                    <span className="text-yellow-400 font-bold">3,5%</span>
                  </div>
                </div>
                <button
                  onClick={() => handlePayment('deposit')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all duration-300"
                >
                  DEPOSITAR
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">APOSTAS</h3>
                <div className="text-3xl font-black text-white">{gameStats.totalBets}</div>
                <div className="text-blue-400 text-sm font-medium">TOTAL</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-purple-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">APOSTADO</h3>
                <div className="text-3xl font-black text-white">R$ {gameStats.totalWagered.toFixed(0)}</div>
                <div className="text-purple-400 text-sm font-medium">TOTAL</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-green-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">GANHO</h3>
                <div className="text-3xl font-black text-green-400">R$ {gameStats.totalWon.toFixed(0)}</div>
                <div className="text-green-400 text-sm font-medium">TOTAL</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-6 rounded-3xl border border-yellow-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">VITÓRIAS</h3>
                <div className="text-3xl font-black text-white">{gameStats.winRate}%</div>
                <div className="text-yellow-400 text-sm font-medium">TAXA</div>
              </div>
            </div>

            {/* Performance & Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <span>DESEMPENHO</span>
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                    <span className="text-gray-400 font-medium">Lucro/Prejuízo Total</span>
                    <span className={`font-black text-xl ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      R$ {totalProfit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                    <span className="text-gray-400 font-medium">Melhor Vitória</span>
                    <span className="text-green-400 font-black text-xl">R$ {bestWin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                    <span className="text-gray-400 font-medium">Aposta Média</span>
                    <span className="text-white font-black text-xl">
                      R$ {gameStats.totalBets > 0 ? (gameStats.totalWagered / gameStats.totalBets).toFixed(2) : '0,00'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Award className="w-6 h-6 text-orange-400" />
                  <span>CONQUISTAS</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl border border-orange-500/30">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">PRIMEIRA APOSTA</div>
                      <div className="text-orange-300 text-sm">Fez sua primeira aposta</div>
                    </div>
                  </div>
                  
                  {gameStats.totalBets >= 10 && (
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">APOSTADOR ATIVO</div>
                        <div className="text-blue-300 text-sm">Fez mais de 10 apostas</div>
                      </div>
                    </div>
                  )}
                  
                  {gameStats.totalWon >= 100 && (
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">GRANDE VENCEDOR</div>
                        <div className="text-green-300 text-sm">Ganhou mais de R$ 100</div>
                      </div>
                    </div>
                  )}
                  
                  {gameStats.winRate >= 60 && (
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">SORTUDO</div>
                        <div className="text-yellow-300 text-sm">Taxa de vitória acima de 60%</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        type={paymentType}
      />
    </>
  );
};

export default Profile;