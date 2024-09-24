import getBudgets from './get-budgets.js';
import getTransactions from './get-transactions.js';
import postTransactionToBudget from './post-transaction-to-budget.js';
import deleteTransaction from './delete-transaction.js';

const all = (...routes) =>
  async function () {
    const res = [];
    for (const route of routes) {
      res.push(await route());
    }
    return res;
  };

const api = {
  all,
  getBudgets,
  getTransactions,
  postTransactionToBudget,
  deleteTransaction,
};

export default api;
