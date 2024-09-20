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
        },
        action: async ({request: req}) => {
          console.log(req)
          if (req.method?.toLowerCase() === 'delete') {
            const { id } = await req.json()
            const res = await fetch(`/api/transactions/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            return res
          }


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