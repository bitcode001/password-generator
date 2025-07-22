import { useContext } from "react";
import { PasswordGContext, type PasswordAction } from "../App";

const Settings: React.FC = () => {
    const context = useContext(PasswordGContext);

    if(!context) {
        throw new Error('Settings component must be used withing PasswordGContext.Provider scope');
    }

    const { state, dispatch } = context;

    const rulesClass = "flex text-xs";

    // Middleware to validate action
    const avoidRemovingEverything: () => boolean = () => {
        const flagCount = [state.enableNumbers, state.enableSymbols, state.enableLowercase, state.enableUppercase];
        if(flagCount.filter(Boolean).length === 1) return true;

        return false;
    }

    const toggleSettingOptions = (action: PasswordAction) => {
        switch (action.type) {
            case 'toggleEnableNumbers': {
                if(state.enableNumbers && avoidRemovingEverything()) {
                    return;
                } else {
                    console.log('FROM ELSE')
                    dispatch({ type: "toggleEnableNumbers" });
                    dispatch({ type: "regenPassword" });
                }
                break;
            }
            case 'toggleEnableSymbols': {
                if(state.enableSymbols && avoidRemovingEverything()) {
                    return;
                } else {
                    dispatch({ type: "toggleEnableSymbols" });
                    dispatch({ type: "regenPassword" });
                }
                break;
            }
            case 'toggleEnableUppercase': {
                if(state.enableUppercase && avoidRemovingEverything()) {
                    return;
                } else {
                    dispatch({ type: "toggleEnableUppercase" });
                    dispatch({ type: "regenPassword" });
                }
                break;
            }
            case 'toggleEnableLowercase': {
                if(state.enableLowercase && avoidRemovingEverything()) {
                    return;
                } else {
                    dispatch({ type: "toggleEnableLowercase" });
                    dispatch({ type: "regenPassword" });
                }
                break;
            }
            case 'updatePasswordLength': {
                dispatch({ type: "updatePasswordLength", next: action.next });
                dispatch({ type: "regenPassword" });
                break;
            }
            default:
                break;
        }
    }


    return (
        <div className="p-5 flex flex-col">
            <div className="flex flex-col mb-4">
                <label htmlFor="password_length" className="text-sm mb-2">Password Length : ({state.passwordLength})</label>
                <div className="range-wrapper">
                    <input className="custom-range-slider" type="range" value={state.passwordLength} min={0} max={26} name="password_length" id="password_length" onChange={(e) => toggleSettingOptions({ type: "updatePasswordLength", next: e.target.valueAsNumber })} />
                    <output htmlFor="slider" className="thumb-tooltip"></output>
                </div>
            </div>

            <div id="rules" className="flex flex-wrap gap-6 mt-4">
                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableUppercase} name="enable_uppercase" id="enable_uppercase" onChange={() => toggleSettingOptions({ type: "toggleEnableUppercase" })} />
                    <label htmlFor="enable_uppercase">Enable Uppercase</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableLowercase} name="enable_lowercase" id="enable_lowercase" onChange={() => toggleSettingOptions({ type: "toggleEnableLowercase" })} />
                    <label htmlFor="enable_lowercase">Enable Lowercase</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableNumbers} name="enable_numbers" id="enable_numbers" onChange={() => toggleSettingOptions({ type: "toggleEnableNumbers" })} />
                    <label htmlFor="enable_numbers">Enable Numbers</label>
                </div>

                <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableSymbols} name="enable_symbols" id="enable_symbols" onChange={() => toggleSettingOptions({ type: "toggleEnableSymbols" })} />
                    <label htmlFor="enable_symbols">Enable Symbols</label>
                </div>

                {/* <div className={rulesClass}>
                    <input type="checkbox" checked={state.enableAlphabetCharacters} name="enable_alphabet" id="enable_alphabet" onChange={() => dispatch({ type: "toggleEnableAlphabetCharacters" })} />
                    <label htmlFor="enable_alphabet">Enable AlphabetCharacters</label>
                </div> */}
            </div>
        </div>
    )
}

export default Settings;