import getBudgets from './get-budgets';
import getTransactions from './get-transactions';
import postTransactionToBudget from './post-transaction-to-budget';
import deleteTransaction from './delete-transaction';

const api = {
  getBudgets,
  getTransactions,
  postTransactionToBudget,
  deleteTransaction,
};

export default api;
