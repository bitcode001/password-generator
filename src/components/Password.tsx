import { useContext, useEffect } from "react";
import { PasswordGContext } from "../App";
import { getPass } from "../utils";

const Password: React.FC = () => {
    const context = useContext(PasswordGContext);

    if(!context) {
        throw new Error('Password component must be used withing PasswordGContext.Provider scope');
    }

    const { state, dispatch } = context;

    const svgFillColor = '#191a1c';

    const generatePassword = () => {
        console.log('State: ', state);
        const generatedPass: string = getPass({
            addCapitalLetters: state.enableUppercase,
            addSmallLetters: state.enableLowercase,
            addNumebrs: state.enableNumbers,
            addSpecialCharacters: state.enableSymbols,
            passwordLength: state.passwordLength
        });

        dispatch({ type: "updatePassword", next: generatedPass })
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(state.password);
    }

    useEffect(() => {
        generatePassword();
    }, [])

    return (
        <div className="p-5 flex bg-gray-200 rounded-tr-md rounded-tl-md">
            <p className="flex flex-auto text-2xl font-medium text-black" id="current-password">{state.password}</p>
            <button className="mx-4 cursor-pointer" onClick={generatePassword}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={svgFillColor}><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
            </button>
            <button className="cursor-pointer" onClick={copyPassword}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={svgFillColor}><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
            </button>
        </div>
    )
}

export default Password;