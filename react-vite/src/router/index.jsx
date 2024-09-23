import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BudgetsPage from '../components/BudgetsPage'
import TransactionsPage from '../components/TransactionsPage';
import Layout from './Layout';
import TransactionsForm from '../components/TransactionsForm';
import api from '../api';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <BudgetsPage></BudgetsPage>,
        loader: api.getBudgets
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
        loader: api.getTransactions,
        action: api.deleteTransaction
      },
      {
        path: '/transactions/new',
        element: <TransactionsForm />,
        loader: api.getBudgets,
        action: api.postTransactionToBudget
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