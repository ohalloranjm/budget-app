import getBudgets from './get-budgets.js';
import getTransaction from './get-transaction.js';
import getTransactions from './get-transactions.js';
import postTransactionToBudget from './post-transaction-to-budget.js';
import putTransaction from './put-transaction.js';
import deleteTransaction from './delete-transaction.js';

const all = (...routes) =>
  async function (param) {
    const res = [];
    for (const route of routes) {
      res.push(await route(param));
    }
    return res;
  };

const api = {
  all,
  getBudgets,
  getTransaction,
  getTransactions,
  putTransaction,
  postTransactionToBudget,
  deleteTransaction,
};

export default api;
