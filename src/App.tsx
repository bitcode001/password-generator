import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import { PasswordGenerator } from './components/PasswordGenerator';
import { getPass } from './utils';

// Define the state shape for password settings
export interface PasswordState {
  password: string;
  passwordLength: number;
  enableNumbers: boolean;
  enableSymbols: boolean;
  enableAlphabetCharacters: boolean;
  enableUppercase: boolean;
  enableLowercase: boolean;
}

// Define action types for password settings
export type PasswordAction =
  | { type: 'updatePassword'; next: string }
  | { type: 'updatePasswordLength'; next: number }
  | { type: 'toggleEnableNumbers' }
  | { type: 'toggleEnableSymbols' }
  | { type: 'toggleEnableAlphabetCharacters' }
  | { type: 'toggleEnableUppercase' }
  | { type: 'toggleEnableLowercase' }
  | { type: 'regenPassword'};

// Define the context type 
interface PasswordContextType {
  state: PasswordState,
  dispatch: React.Dispatch<PasswordAction>;
}

// Define the context type
export const PasswordGContext = React.createContext<PasswordContextType | undefined>(undefined);

// The password reducer is typed now
function passwordReducer(state: PasswordState, action: PasswordAction): PasswordState {
  switch (action.type) {
    case 'updatePassword': {
      return {
        ...state,
        password: action.next,
      };
    }
    case 'updatePasswordLength': {
      if(action.next >= 7) {
        return {
          ...state,
          passwordLength: action.next,
        };
      }
      return state;
    }
    case 'toggleEnableNumbers': {
      return {
        ...state,
        enableNumbers: !state.enableNumbers,
      };
    }
    case 'toggleEnableSymbols': {
      return {
        ...state,
        enableSymbols: !state.enableSymbols,
      };
    }
    case 'toggleEnableAlphabetCharacters': {
      return {
        ...state,
        enableAlphabetCharacters: !state.enableAlphabetCharacters,
      };
    }
    case 'toggleEnableUppercase': {
      return {
        ...state,
        enableUppercase: !state.enableUppercase,
      };
    }
    case 'toggleEnableLowercase': {
      return {
        ...state,
        enableLowercase: !state.enableLowercase,
      }
    }
    case 'regenPassword': {
      return {
        ...state,
        password: getPass({
          addCapitalLetters: state.enableUppercase,
          addSmallLetters: state.enableLowercase,
          addNumbers: state.enableNumbers,
          addSpecialCharacters: state.enableSymbols,
          passwordLength: state.passwordLength
        })
      }
    }
    default: {
      throw new Error("Unknown action type");
    }
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(passwordReducer, {
    password: '',
    passwordLength: 10,
    enableNumbers: true,
    enableSymbols: true,
    enableAlphabetCharacters: true,
    enableUppercase: true,
    enableLowercase: true,
  });

  return (
    <PasswordGContext.Provider value={{ state, dispatch }}>
      <section className="container mx-auto h-screen">
        <Header />
        <PasswordGenerator />
      </section>
    </PasswordGContext.Provider>
  );
}

export default App;
