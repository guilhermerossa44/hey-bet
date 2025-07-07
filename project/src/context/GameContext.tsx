import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Bet {
  id: string;
  amount: number;
  color: 'red' | 'black';
  result: 'red' | 'black';
  won: boolean;
  winAmount: number;
  timestamp: Date;
}

interface GameStats {
  totalBets: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
}

interface GameState {
  balance: number;
  bets: Bet[];
  gameStats: GameStats;
}

type GameAction = 
  | { type: 'ADD_BET'; payload: Bet }
  | { type: 'UPDATE_BALANCE'; payload: number };

const initialState: GameState = {
  balance: 1000,
  bets: [],
  gameStats: {
    totalBets: 0,
    totalWagered: 0,
    totalWon: 0,
    winRate: 0
  }
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'ADD_BET':
      const newBet = action.payload;
      const newBets = [newBet, ...state.bets];
      const newBalance = state.balance - newBet.amount + newBet.winAmount;
      
      const totalBets = newBets.length;
      const totalWagered = newBets.reduce((sum, bet) => sum + bet.amount, 0);
      const totalWon = newBets.reduce((sum, bet) => sum + bet.winAmount, 0);
      const wonBets = newBets.filter(bet => bet.won).length;
      const winRate = totalBets > 0 ? Math.round((wonBets / totalBets) * 100) : 0;
      
      return {
        ...state,
        balance: newBalance,
        bets: newBets,
        gameStats: {
          totalBets,
          totalWagered,
          totalWon,
          winRate
        }
      };
    
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload
      };
    
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  addBet: (bet: Bet) => void;
  updateBalance: (balance: number) => void;
  balance: number;
  bets: Bet[];
  gameStats: GameStats;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addBet = (bet: Bet) => {
    dispatch({ type: 'ADD_BET', payload: bet });
  };

  const updateBalance = (balance: number) => {
    dispatch({ type: 'UPDATE_BALANCE', payload: balance });
  };

  const value = {
    state,
    addBet,
    updateBalance,
    balance: state.balance,
    bets: state.bets,
    gameStats: state.gameStats
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};