import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import { PasswordGenerator } from './components/PasswordGenerator';
import { getPass, type IGetPass } from './utils';

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
type PasswordAction =
  | { type: 'updatePassword'; next: string }
  | { type: 'updatePasswordLength'; next: number }
  | { type: 'toggleEnableNumbers' }
  | { type: 'toggleEnableSymbols' }
  | { type: 'toggleEnableAlphabetCharacters' }
  | { type: 'toggleEnableUppercase' }
  | { type: 'toggleEnableLowercase' };

// Define the context type 
interface PasswordContextType {
  state: PasswordState,
  dispatch: React.Dispatch<PasswordAction>;
}

// Define the context type
export const PasswordGContext = React.createContext<PasswordContextType | undefined>(undefined);

// The password reducer is typed now
function passwordReducer(state: PasswordState, action: PasswordAction): PasswordState {
  // Middleware to validate action
  const avoidRemovingEverything: () => boolean = () => {
    const flagCount = [state.enableNumbers, state.enableSymbols, state.enableLowercase, state.enableUppercase];
    if(flagCount.filter(Boolean).length === 1) return true;

    return false;
  }

  const newPass: (newPassProps: IGetPass) => string = (newPassProps) => {

    const generatedPass: string = getPass({
        addCapitalLetters: newPassProps.addCapitalLetters,
        addSmallLetters: newPassProps.addSmallLetters,
        addNumbers: newPassProps.addNumbers,
        addSpecialCharacters: newPassProps.addSpecialCharacters,
        passwordLength: newPassProps.passwordLength
    });

    return generatedPass;
  }

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
      if(state.enableNumbers && avoidRemovingEverything()) {
        return state;
      } else {
        return {
          ...state,
          enableNumbers: !state.enableNumbers,
          password: newPass({
            addCapitalLetters: state.enableUppercase,
            addSmallLetters: state.enableLowercase,
            addNumbers: !state.enableNumbers,
            addSpecialCharacters: state.enableSymbols,
            passwordLength: state.passwordLength
          }),
        };
      }
    }
    case 'toggleEnableSymbols': {
      if(state.enableSymbols && avoidRemovingEverything()) {
        return state;
      } else {
        return {
          ...state,
          enableSymbols: !state.enableSymbols,
          password: newPass({
            addCapitalLetters: state.enableUppercase,
            addSmallLetters: state.enableLowercase,
            addNumbers: state.enableNumbers,
            addSpecialCharacters: !state.enableSymbols,
            passwordLength: state.passwordLength
          }),
        };
      }
    }
    case 'toggleEnableAlphabetCharacters': {
      return {
        ...state,
        enableAlphabetCharacters: !state.enableAlphabetCharacters,
      };
    }
    case 'toggleEnableUppercase': {
      if(state.enableUppercase && avoidRemovingEverything()) {
        return state;
      } else {
        return {
          ...state,
          enableUppercase: !state.enableUppercase,
          password: newPass({
            addCapitalLetters: !state.enableUppercase,
            addSmallLetters: state.enableLowercase,
            addNumbers: state.enableNumbers,
            addSpecialCharacters: state.enableSymbols,
            passwordLength: state.passwordLength
          }),
        };
      }
    }
    case 'toggleEnableLowercase': {
      if(state.enableLowercase && avoidRemovingEverything()) {
        return state;
      } else {
        return {
          ...state,
          enableLowercase: !state.enableLowercase,
          password: newPass({
            addCapitalLetters: state.enableUppercase,
            addSmallLetters: !state.enableLowercase,
            addNumbers: state.enableNumbers,
            addSpecialCharacters: state.enableSymbols,
            passwordLength: state.passwordLength
          }),
        }
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
