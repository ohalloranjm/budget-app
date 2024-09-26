import { useSelector } from "react-redux"
import BudgetSummary from "./BudgetSummary";
import "./LandingPage.css"

export default function LandingPage() {
  const user = useSelector((store) => store.session.user);

    
  return user ? <BudgetSummary /> : <p>'Sign up to get started.'</p>
}