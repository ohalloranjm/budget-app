import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import BudgetsPage from "../components/BudgetsPage";
import BudgetForm from "../components/BudgetsForm/BudgetsForm";
import BudgetDetails from "../components/BudgetsPage/BudgetDetails";
import TransactionsPage from "../components/TransactionsPage";
import GenericError from "../components/GenericError";
import Layout from "./Layout";
import TransactionsForm from "../components/TransactionsForm";
import api from "../api";
import LandingPage from "../components/LandingPage/";
import SaveGoals from "../components/SaveGoalsPage";
import SaveGoalDetails from "../components/SaveGoalDetailsPage";
import SaveGoalsForm from "../components/SaveGoalsForm";
import TemplatesPage from "../components/TemplatesPage/TemplatesPage";
import TemplateForm from "../components/TemplateFormPage";
import TemplateDetails from "../components/TemplateDetailsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
        loader: api.all(api.getBudgets, api.getTransactions),
      },
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
        path: "/save-goals",
        element: <SaveGoals />,
        loader: api.getSaveGoals,
      },
      {
        path: "/save-goals/:saveGoalId",
        element: <SaveGoalDetails />,
        loader: api.getSaveGoal,
        action: api.deleteSaveGoal,
      },
      {
        path: "/save-goals/new",
        element: <SaveGoalsForm edit={false} />,
        action: api.postSaveGoal,
      },
      {
        path: "/save-goals/:saveGoalId/edit",
        element: <SaveGoalsForm edit={true} />,
        loader: api.getSaveGoal,
        action: api.putSaveGoal,
      },
      {
        path: "/templates",
        element: <TemplatesPage />,
        loader: api.getTemplates,
      },
      {
        path: "/templates/:templateId",
        element: <TemplateDetails />,
        loader: api.getTemplate,
        action: api.deleteTemplate,
      },
      {
        path: "/templates/:templateId/edit",
        element: <TemplateForm edit={true} />,
        loader: api.getTemplate,
        action: api.putTemplate,
      },
      {
        path: "/templates/new",
        element: <TemplateForm />,
        loader: api.getBudgets,
        action: api.postTemplate,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
        loader: api.getTransactions,
        action: api.deleteTransaction,
      },
      {
        path: "/transactions/new",
        element: <TransactionsForm edit={false} />,
        loader: api.getBudgets,
        action: api.postTransactionToBudget,
      },
      {
        path: "/transactions/:transactionId/edit",
        element: <TransactionsForm edit={true} />,
        errorElement: <GenericError />,
        loader: api.all(api.getBudgets, api.getTransaction),
        action: api.putTransaction,
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
