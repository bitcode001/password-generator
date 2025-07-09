import { useContext } from "react";
import { PasswordGContext } from "../App";

const Password: React.FC = () => {
    const context = useContext(PasswordGContext);

    if(!context) {
        throw new Error('Password component must be used withing PasswordGContext.Provider scope');
    }

    const { state } = context;

    return (
        <div>
            <p className="" id="current-password">{state.password}</p>
            <button>Copy</button>
            <button>Regenerate</button>
        </div>
    )
}

export default Password;