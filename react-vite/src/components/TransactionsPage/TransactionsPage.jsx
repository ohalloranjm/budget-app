import { useLoaderData } from "react-router-dom"
import TransactionSummary from "./TransactionSummary"

export default function TransactionsPage() {
    const { Transactions: transactions } = useLoaderData()
    if (transactions) console.log(transactions)
    return <div>
        <h1>Your Transactions</h1>
        {transactions.map(t => <TransactionSummary key={t.id} transaction={t} />)}
    </div>
}