import { useLoaderData, useSubmit } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TransactionSummary from "./TransactionSummary"
import './TransactionsPage.css'

export default function TransactionsPage() {
    const user = useSelector(store => store.session.user)
    const { Transactions } = useLoaderData()
    const submit = useSubmit()
    useEffect(() => {
        submit()
    }, [user, submit])

    if (!Transactions) return null
    return <div>
        <h1>My Transactions</h1>
        {Transactions.map(t => <TransactionSummary key={t.id} transaction={t} />)}
    </div>
}