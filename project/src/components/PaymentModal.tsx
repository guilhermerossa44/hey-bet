import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, QrCode, Copy, Check, ArrowLeft, Wallet, DollarSign } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, type }) => {
  const { balance, updateBalance } = useGame();
  const [step, setStep] = useState<'method' | 'amount' | 'pix' | 'card' | 'success'>('method');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [amount, setAmount] = useState('');
  const [pixCode, setPixCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (step === 'pix' && amount) {
      // Generate mock PIX code
      const mockPixCode = `00020126580014BR.GOV.BCB.PIX0136${Date.now()}5204000053039865802BR5925HEY BET PAGAMENTOS LTDA6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setPixCode(mockPixCode);
    }
  }, [step, amount]);

  if (!isOpen) return null;

  const quickAmounts = type === 'deposit' ? [20, 50, 100, 200, 500, 1000] : [50, 100, 200, 500];

  const handleAmountSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    if (type === 'withdraw' && parseFloat(amount) > balance) {
      alert('Saldo insuficiente!');
      return;
    }

    if (paymentMethod === 'pix') {
      setStep('pix');
    } else {
      setStep('card');
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substr(0, 5);
  };

  const handlePaymentComplete = () => {
    const amountValue = parseFloat(amount);
    if (type === 'deposit') {
      updateBalance(balance + amountValue);
    } else {
      updateBalance(balance - amountValue);
    }
    setStep('success');
    setTimeout(() => {
      onClose();
      resetModal();
    }, 3000);
  };

  const resetModal = () => {
    setStep('method');
    setAmount('');
    setPixCode('');
    setCopied(false);
    setCardData({ number: '', name: '', expiry: '', cvv: '' });
  };

  const renderMethodSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-6">
        Escolha o método de {type === 'deposit' ? 'depósito' : 'saque'}
      </h3>
      
      <button
        onClick={() => {
          setPaymentMethod('pix');
          setStep('amount');
        }}
        className="w-full p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl hover:border-green-500/50 transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h4 className="text-white font-bold text-lg">PIX</h4>
            <p className="text-gray-400">Instantâneo • Sem taxas</p>
            <p className="text-green-400 text-sm font-medium">Recomendado</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => {
          setPaymentMethod('card');
          setStep('amount');
        }}
        className="w-full p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h4 className="text-white font-bold text-lg">Cartão de Crédito</h4>
            <p className="text-gray-400">Visa • Mastercard • Elo</p>
            <p className="text-blue-400 text-sm font-medium">Taxa: 3.5%</p>
          </div>
        </div>
      </button>
    </div>
  );

  const renderAmountInput = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setStep('method')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-white">
          Valor do {type === 'deposit' ? 'depósito' : 'saque'}
        </h3>
      </div>

      <div className="bg-black/30 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Saldo atual</span>
          <span className="text-white font-bold">R$ {balance.toFixed(2)}</span>
        </div>
        {type === 'withdraw' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Disponível para saque</span>
            <span className="text-green-400 font-bold">R$ {balance.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Valor (R$)
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white text-xl font-bold text-center focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            placeholder="0,00"
            min={type === 'deposit' ? '10' : '50'}
            max={type === 'withdraw' ? balance.toString() : '10000'}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {quickAmounts.map(quickAmount => (
          <button
            key={quickAmount}
            onClick={() => setAmount(quickAmount.toString())}
            className="px-4 py-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 hover:from-orange-500/40 hover:to-red-600/40 text-white rounded-xl font-bold transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50"
          >
            R$ {quickAmount}
          </button>
        ))}
      </div>

      <button
        onClick={handleAmountSubmit}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300"
      >
        CONTINUAR
      </button>
    </div>
  );

  const renderPixPayment = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setStep('amount')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-white">Pagamento PIX</h3>
      </div>

      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-white font-bold text-lg mb-2">
          {type === 'deposit' ? 'Depósito' : 'Saque'} via PIX
        </h4>
        <p className="text-green-300 text-2xl font-bold">R$ {parseFloat(amount).toFixed(2)}</p>
      </div>

      {/* Mock QR Code */}
      <div className="bg-white p-6 rounded-2xl">
        <div className="w-48 h-48 mx-auto bg-black rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Código PIX Copia e Cola
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={pixCode}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white text-sm"
          />
          <button
            onClick={copyPixCode}
            className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl font-bold transition-all duration-300 flex items-center space-x-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'COPIADO' : 'COPIAR'}</span>
          </button>
        </div>
      </div>

      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
        <p className="text-blue-300 text-sm">
          ℹ️ {type === 'deposit' 
            ? 'Após o pagamento, o valor será creditado automaticamente em sua conta em até 5 minutos.'
            : 'O valor será transferido para sua conta PIX cadastrada em até 30 minutos.'
          }
        </p>
      </div>

      <button
        onClick={handlePaymentComplete}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold transition-all duration-300"
      >
        {type === 'deposit' ? 'CONFIRMAR PAGAMENTO' : 'SOLICITAR SAQUE'}
      </button>
    </div>
  );

  const renderCardPayment = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setStep('amount')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-white">Dados do Cartão</h3>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-white font-bold text-lg mb-2">Cartão de Crédito</h4>
        <p className="text-blue-300 text-2xl font-bold">R$ {parseFloat(amount).toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Número do Cartão
          </label>
          <input
            type="text"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Nome no Cartão
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            placeholder="NOME COMO NO CARTÃO"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Validade
            </label>
            <input
              type="text"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              placeholder="000"
              maxLength={4}
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
        <p className="text-yellow-300 text-sm">
          💳 Taxa de processamento: 3.5% • Valor final: R$ {(parseFloat(amount) * 1.035).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handlePaymentComplete}
        disabled={!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all duration-300"
      >
        CONFIRMAR PAGAMENTO
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-white" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {type === 'deposit' ? 'Depósito Realizado!' : 'Saque Solicitado!'}
        </h3>
        <p className="text-gray-300">
          {type === 'deposit' 
            ? `R$ ${parseFloat(amount).toFixed(2)} foi adicionado ao seu saldo`
            : `R$ ${parseFloat(amount).toFixed(2)} será transferido em breve`
          }
        </p>
      </div>

      <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
        <p className="text-green-300 text-sm">
          ✅ {type === 'deposit' 
            ? 'Transação processada com sucesso!'
            : 'Solicitação de saque enviada com sucesso!'
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-orange-500/30 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {type === 'deposit' ? 'DEPÓSITO' : 'SAQUE'}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetModal();
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'method' && renderMethodSelection()}
        {step === 'amount' && renderAmountInput()}
        {step === 'pix' && renderPixPayment()}
        {step === 'card' && renderCardPayment()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};

export default PaymentModal;