import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import BudgetsPage from '../components/BudgetsPage'
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
          console.log(res.json())
          return {Budgets: [{name:'asd'}]}
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