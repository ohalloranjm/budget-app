import { useSelector } from "react-redux"
import BudgetSummary from "./BudgetSummary";
import "./LandingPage.css"
import SessionPrompt from "./SessionPrompt";

export default function LandingPage() {
  const user = useSelector((store) => store.session.user);

    
  return user ? <BudgetSummary /> : <SessionPrompt />
}