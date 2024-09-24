import { Link, useLoaderData, useSubmit } from "react-router-dom"
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
        <h1 className='secondary-dark'>My Transactions</h1>
        <Link className='dark' to='new'>Input a New Transaction</Link>
        {Transactions.map(t => <TransactionSummary key={t.id} transaction={t} />)}
    </div>
}