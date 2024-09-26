import { useSelector } from "react-redux"
import BudgetSummary from "./BudgetSummary";

export default function LandingPage() {
  const user = useSelector((store) => store.session.user);

    
    return <><h1 className="dark">Landing Page</h1>
    {user ? <BudgetSummary /> : <p>'Sign up to get started.'</p>}
    </>
}