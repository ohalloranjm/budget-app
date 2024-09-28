import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

export default function SessionPrompt() {
    return <div className="session-prompt">
        <OpenModalMenuItem
            itemText="Sign Up"
            modalComponent={<SignupFormModal />}
        />
        <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
        />
        <p>Get started tracking your money today.</p>
    </div>
}