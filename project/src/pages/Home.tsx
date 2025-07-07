import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Shield, Zap, ArrowRight, Star, Trophy, Target, Coins, Plane, Bomb, Crown, Gamepad2, Gift, Award, DollarSign, Flame, Play, User, Calendar, Clock, Percent, CheckCircle, Sparkles, Rocket, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const games = [
    {
      id: 'double',
      name: 'DOUBLE',
      description: 'Vermelho ou Preto - 2x o valor',
      icon: Coins,
      color: 'from-orange-500 to-red-600',
      path: '/betting'
    },
    {
      id: 'aviator',
      name: 'AVIATOR',
      description: 'Voe alto e multiplique',
      icon: Plane,
      color: 'from-blue-500 to-cyan-600',
      path: '/games'
    },
    {
      id: 'mines',
      name: 'MINES',
      description: 'Encontre os diamantes',
      icon: Bomb,
      color: 'from-red-500 to-orange-600',
      path: '/games'
    },
    {
      id: 'tigrinho',
      name: 'TIGRINHO',
      description: 'O jogo do tigre da sorte',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      path: '/games'
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Odds Justas',
      description: 'Pagamentos transparentes e justos em todos os jogos',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Super Rápido',
      description: 'Resultados instantâneos e saques em minutos',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Seus dados e dinheiro protegidos com criptografia',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Milhares de jogadores online 24/7',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Gift,
      title: 'Bônus Diários',
      description: 'Promoções e bônus exclusivos todos os dias',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Suporte VIP',
      description: 'Atendimento premium 24 horas por dia',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'Jogadores Ativos', value: '50K+', icon: Users, color: 'from-blue-500 to-cyan-600' },
    { label: 'Prêmios Pagos', value: 'R$ 10M+', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
    { label: 'Jogos Disponíveis', value: '4', icon: Gamepad2, color: 'from-purple-500 to-pink-600' },
    { label: 'Taxa de Vitória', value: '96.5%', icon: Trophy, color: 'from-yellow-500 to-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      text: 'Ganhei R$ 5.000 no Aviator! Plataforma confiável e pagamento rápido.',
      rating: 5,
      game: 'Aviator',
      avatar: '👨‍💼'
    },
    {
      name: 'Maria Santos',
      text: 'Adoro o Double! Já fiz vários saques sem problemas.',
      rating: 5,
      game: 'Double',
      avatar: '👩‍💻'
    },
    {
      name: 'João Oliveira',
      text: 'O Tigrinho me deu sorte! Jackpot de R$ 2.500!',
      rating: 5,
      game: 'Tigrinho',
      avatar: '👨‍🎓'
    }
  ];

  const promotions = [
    {
      title: 'Bônus de Boas-vindas',
      description: '100% no primeiro depósito',
      value: 'ATÉ R$ 500',
      icon: Gift,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Cashback Diário',
      description: '10% de volta em perdas',
      value: 'TODO DIA',
      icon: Percent,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Giros Grátis',
      description: 'Rodadas gratuitas no Tigrinho',
      value: '50 GIROS',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const liveWins = [
    { player: 'João***', game: 'Aviator', amount: 'R$ 1.250', time: '2 min' },
    { player: 'Maria***', game: 'Double', amount: 'R$ 800', time: '5 min' },
    { player: 'Pedro***', game: 'Tigrinho', amount: 'R$ 2.100', time: '8 min' },
    { player: 'Ana***', game: 'Mines', amount: 'R$ 650', time: '12 min' },
    { player: 'Carlos***', game: 'Aviator', amount: 'R$ 3.400', time: '15 min' }
  ];

  const handleGameClick = (path: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-600/10 to-purple-600/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-20 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 px-4 py-2 rounded-full border border-orange-500/30 mb-6 animate-bounce">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">Plataforma #1 em Apostas</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  HEY BET
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                A experiência mais emocionante em apostas online. 
                <span className="text-orange-400 font-semibold"> Aviator, Mines, Tigrinho e Double</span> - 
                Sua sorte está a um clique de distância!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/betting"
                    className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>COMEÇAR AGORA</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/games"
                    className="border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Gamepad2 className="w-6 h-6" />
                    <span>VER JOGOS</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>COMEÇAR AGORA</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <User className="w-6 h-6" />
                    <span>CRIAR CONTA</span>
                  </button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Wins Ticker */}
        <section className="py-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-y border-green-500/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-8 overflow-hidden">
              <div className="flex items-center space-x-2 text-green-400 font-bold whitespace-nowrap">
                <Trophy className="w-5 h-5" />
                <span>VITÓRIAS AO VIVO:</span>
              </div>
              <div className="flex space-x-8 animate-scroll">
                {[...liveWins, ...liveWins].map((win, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white whitespace-nowrap">
                    <span className="text-green-400 font-bold">{win.player}</span>
                    <span className="text-gray-400">ganhou</span>
                    <span className="text-yellow-400 font-bold">{win.amount}</span>
                    <span className="text-gray-400">no</span>
                    <span className="text-orange-400">{win.game}</span>
                    <span className="text-gray-500">• {win.time} atrás</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Promoções <span className="text-orange-400">Exclusivas</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {promotions.map((promo, index) => {
                const IconComponent = promo.icon;
                return (
                  <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${promo.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-gray-400 mb-4">{promo.description}</p>
                    <div className="text-3xl font-black text-orange-400 mb-6">{promo.value}</div>
                    <button className={`w-full bg-gradient-to-r ${promo.color} hover:opacity-90 text-white py-3 rounded-xl font-bold transition-all duration-300`}>
                      RESGATAR
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Games Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Nossos <span className="text-orange-400">Jogos</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {games.map((game) => {
                const IconComponent = game.icon;
                return (
                  <div
                    key={game.id}
                    className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 shadow-2xl hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleGameClick(game.path)}
                  >
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                      <p className="text-gray-400 mb-6">{game.description}</p>
                      
                      {isAuthenticated ? (
                        <Link
                          to={game.path}
                          className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2`}
                        >
                          <Play className="w-5 h-5" />
                          <span>JOGAR</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowAuthModal(true)}
                          className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2`}
                        >
                          <User className="w-5 h-5" />
                          <span>ENTRAR</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Por que Escolher o <span className="text-orange-400">Hey Bet</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 text-center hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              O que Nossos <span className="text-orange-400">Jogadores</span> Dizem
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-orange-400 text-sm">{testimonial.game}</div>
                    </div>
                    <div className="text-4xl">{testimonial.avatar}</div>
                  </div>
                </div>
              ))}
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
                    <User className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Crie sua Conta</h3>
                <p className="text-gray-400 text-lg">Cadastro rápido e seguro em menos de 2 minutos</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Faça seu Depósito</h3>
                <p className="text-gray-400 text-lg">PIX instantâneo a partir de R$ 10</p>
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
                <h3 className="text-2xl font-bold text-white mb-4">Jogue e Ganhe</h3>
                <p className="text-gray-400 text-lg">Escolha seu jogo favorito e multiplique seus ganhos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Confiança e <span className="text-orange-400">Segurança</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">SSL 256-bit</h3>
                <p className="text-gray-400 text-sm">Criptografia de nível bancário</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Licenciado</h3>
                <p className="text-gray-400 text-sm">Operação 100% legal</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Suporte 24/7</h3>
                <p className="text-gray-400 text-sm">Atendimento sempre disponível</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Jogo Responsável</h3>
                <p className="text-gray-400 text-sm">Ferramentas de controle</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-12 rounded-3xl border border-orange-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10"></div>
                <div className="relative">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-full mb-6">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">OFERTA LIMITADA</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Pronto para <span className="text-orange-400">Ganhar</span>?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Junte-se a milhares de jogadores e comece a ganhar agora mesmo!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/betting"
                          className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                        >
                          <Rocket className="w-6 h-6" />
                          <span>JOGAR AGORA</span>
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                        <Link
                          to="/games"
                          className="inline-flex items-center space-x-3 border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300"
                        >
                          <span>VER JOGOS</span>
                          <Gamepad2 className="w-6 h-6" />
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowAuthModal(true)}
                          className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
                        >
                          <Rocket className="w-6 h-6" />
                          <span>CRIAR CONTA</span>
                          <ArrowRight className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => setShowAuthModal(true)}
                          className="inline-flex items-center space-x-3 border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300"
                        >
                          <span>FAZER LOGIN</span>
                          <User className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Home;