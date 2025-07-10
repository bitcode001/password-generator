import Password from "./Password"
import Settings from "./Settings"

export const PasswordGenerator: React.FC = () => {
    return (
        <div className="rounded-md bg-white max-w-2xl mx-auto">
            <Password />
            <Settings />
        </div>
    )
}