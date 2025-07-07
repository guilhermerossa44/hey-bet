import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Shield, Zap, ArrowRight, Star, Trophy, Target, Coins } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Seção Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6">
              <Star className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium">Plataforma #1 em Apostas</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                HEY BET
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A experiência mais emocionante em apostas online. 
              <span className="text-orange-400 font-semibold"> Double, Slots e muito mais</span> - 
              Sua sorte está a um clique de distância!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/betting"
              className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
            >
              <span>COMEÇAR AGORA</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/slots"
              className="border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
            >
              VER SLOTS
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">50%</div>
              <div className="text-gray-400">Chance de Vitória</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <div className="text-3xl font-bold text-green-400">2x</div>
              <div className="text-gray-400">Multiplicador</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <div className="text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400">Disponível</div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <div className="text-3xl font-bold text-purple-400">100+</div>
              <div className="text-gray-400">Slots</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Nossos <span className="text-orange-400">Jogos</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Double Game */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">DOUBLE</h3>
                <p className="text-gray-400">Vermelho ou Preto - 2x o valor</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-orange-500/30 flex items-center justify-center shadow-2xl">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse">
                      ?
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-xl text-center text-white font-bold shadow-lg">
                  VERMELHO
                </div>
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-xl text-center text-white font-bold shadow-lg">
                  PRETO
                </div>
              </div>
              
              <Link
                to="/betting"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Coins className="w-5 h-5" />
                <span>JOGAR DOUBLE</span>
              </Link>
            </div>

            {/* Slots Preview */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">SLOTS</h3>
                <p className="text-gray-400">Caça-níqueis com grandes prêmios</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍒</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👑</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-yellow-400 font-bold text-lg">Gates of Olympus</div>
                <div className="text-green-400 text-sm">RTP: 96.5% • Max Win: 5.000x</div>
              </div>
              
              <Link
                to="/slots"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>VER SLOTS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Por que Escolher o <span className="text-orange-400">Hey Bet</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 text-center hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Odds Justas</h3>
              <p className="text-gray-400">Pagamento de 2x em todas as vitórias. Sem pegadinhas, sem complicações.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 text-center hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Super Rápido</h3>
              <p className="text-gray-400">Resultados instantâneos. Aposte, gire e ganhe em segundos.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 text-center hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">100% Seguro</h3>
              <p className="text-gray-400">Seus dados e dinheiro protegidos com tecnologia de ponta.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 text-center hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Comunidade</h3>
              <p className="text-gray-400">Milhares de jogadores online. Junte-se à diversão!</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Como <span className="text-orange-400">Funciona</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Escolha Seu Jogo</h3>
              <p className="text-gray-400 text-lg">Double ou Slots? A decisão é sua. Confie no seu instinto!</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <Coins className="w-4 h-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Defina o Valor</h3>
              <p className="text-gray-400 text-lg">Escolha quanto quer apostar. Desde R$ 1 até o limite que desejar.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ganhe Muito</h3>
              <p className="text-gray-400 text-lg">Acertou? Parabéns! Receba seus prêmios na hora.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-12 rounded-3xl border border-orange-500/30">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para <span className="text-orange-400">Ganhar</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Junte-se a milhares de jogadores e comece a ganhar agora mesmo!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/betting"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                >
                  <span>JOGAR DOUBLE</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  to="/slots"
                  className="inline-flex items-center space-x-3 border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300"
                >
                  <span>VER SLOTS</span>
                  <Target className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;