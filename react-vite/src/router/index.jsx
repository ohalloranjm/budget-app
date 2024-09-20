import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BudgetsPage from '../components/BudgetsPage'
import TransactionsPage from '../components/TransactionsPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <BudgetsPage></BudgetsPage>,
        loader: async ()=> {
          let res = await fetch('/api/budgets')
          if (res.ok) {
            return await res.json()
          }
          return false
        }
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
        loader: async () => {
          const res = await fetch('/api/transactions')
          const data = await res.json()
          if (res.ok) return data
          return false
        }
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