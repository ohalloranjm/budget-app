import { useLoaderData, useNavigate, useSubmit } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TransactionSummary from "./TransactionSummary"
import './TransactionsPage.css'

export default function TransactionsPage() {
    const user = useSelector(store => store.session.user)
    const { Transactions } = useLoaderData()
    const submit = useSubmit()
    const navigate = useNavigate()
    useEffect(() => {
        submit()
    }, [user, submit])

    const makeNew = () => navigate('new')

    if (!Transactions) return null
    return <div>
        <button className='dark new-transaction-button' onClick={makeNew}>New Transaction</button>
        {Transactions.map(t => <TransactionSummary key={t.id} transaction={t} />)}
    </div>
}