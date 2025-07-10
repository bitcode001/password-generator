import { useContext } from "react";
import { PasswordGContext } from "../App";

const Settings: React.FC = () => {
    const context = useContext(PasswordGContext);

    if(!context) {
        throw new Error('Settings component must be used withing PasswordGContext.Provider scope');
    }

    const { state, dispatch } = context;

    const rulesClass = "flex text-xs"

    return (
        <div className="p-5 flex flex-col">
            <div className="flex flex-col mb-4">
                <label htmlFor="password_length" className="text-sm">Password Length : ({state.passwordLength})</label>
                <input type="range" value={state.passwordLength} min={7} max={100} name="password_length" id="password_length" onChange={(e) => dispatch({ type: "updatePasswordLength", next: e.target.valueAsNumber })} />
            </div>

            <div id="rules" className="flex flex-wrap gap-6 mt-4">
                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableUppercase} name="enable_uppercase" id="enable_uppercase" onChange={() => dispatch({ type: "toggleEnableUppercase" })} />
                    <label htmlFor="enable_uppercase">Enable Uppercase</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableLowercase} name="enable_lowercase" id="enable_lowercase" onChange={() => dispatch({ type: "toggleEnableLowercase" })} />
                    <label htmlFor="enable_lowercase">Enable Lowercase</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableNumbers} name="enable_numbers" id="enable_numbers" onChange={() => dispatch({ type: "toggleEnableNumbers" })} />
                    <label htmlFor="enable_numbers">Enable Numbers</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableSymbols} name="enable_symbols" id="enable_symbols" onChange={() => dispatch({ type: "toggleEnableSymbols" })} />
                    <label htmlFor="enable_symbols">Enable Symbols</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableAlphabetCharacters} name="enable_alphabet" id="enable_alphabet" onChange={() => dispatch({ type: "toggleEnableAlphabetCharacters" })} />
                    <label htmlFor="enable_alphabet">Enable AlphabetCharacters</label>
                </div>
            </div>
        </div>
    )
}

export default Settings;