import { useLoaderData } from "react-router-dom"
import { useEffect } from 'react'
import TransactionSummary from "./TransactionSummary"
import './TransactionsPage.css'

export default function TransactionsPage() {
    const { Transactions } = useLoaderData()
    useEffect(() => {
    }, [Transactions])

    if (!Transactions) return null
    return <div>
        <h1>My Transactions</h1>
        {Transactions.map(t => <TransactionSummary key={t.id} transaction={t} />)}
    </div>
}