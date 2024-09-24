import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import BudgetsPage from "../components/BudgetsPage";
import BudgetForm from "../components/BudgetsForm/BudgetsForm";
import BudgetDetails from "../components/BudgetsPage/BudgetDetails";
import TransactionsPage from "../components/TransactionsPage";
import Layout from "./Layout";
import TransactionsForm from "../components/TransactionsForm";
import api from "../api";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/budgets", // Review all budgets by current user
        element: <BudgetsPage></BudgetsPage>,
        loader: async () => {
          let res = await fetch("/api/budgets");
          if (res.ok) {
            return await res.json();
          }
          return false;
        },
      },
      {
        path: "/budgets/new", // Create a new budget
        element: <BudgetForm />,
      },

      {
        path: "/budgets/:id", // View budget by budget_ID
        element: <BudgetDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`/api/budgets/${params.id}`);
          if (res.ok) {
            const data = await res.json();
            return data;
          } else {
            return false;
          }
        },
      },

      {
        path: "/budgets/:id/edit", // Edit an existing budget
        element: <BudgetForm />,
        loader: async ({ params }) => {
          const res = await fetch(`/api/budgets/${params.id}`);
          return res.ok ? await res.json() : null;
        },
      },

      {
        path: "/transactions",
        element: <TransactionsPage />,
        loader: api.getTransactions,
        action: api.deleteTransaction,
      },
      {
        path: "/transactions/new",
        element: <TransactionsForm />,
        loader: api.getBudgets,
        action: api.postTransactionToBudget,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
