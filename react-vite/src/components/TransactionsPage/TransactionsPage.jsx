import { useLoaderData } from "react-router-dom"

export default function TransactionsPage() {
    const { Transactions } = useLoaderData()
    return <div>
        <h1>Your Transactions</h1>
        {Transactions.map(t => <p key={t.id}>{t.name}</p>)}
    </div>
}