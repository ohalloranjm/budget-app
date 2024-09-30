import { useNavigate, useSubmit } from "react-router-dom"
import formatDate from "../../utils/format-date"
import dollarString from "../../utils/dollar-string"

export default function TransactionSummary({ transaction }) {

    const submit = useSubmit()
    const navigate = useNavigate()
    
    function deleteTransaction(e) {
            e.preventDefault()
            const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
            if (!confirmDelete) return;
            submit({id: transaction.id}, {method: 'delete', encType: 'application/json'})
    }
    
    return <div className='transaction-summary-tile'>
        <h3 className='secondary-dark'>{dollarString(transaction.amount)}</h3>
        <p>{transaction.Budget?.name}</p>
        <p>{transaction.name}</p>
        <p>{formatDate(transaction.date)}</p>
        <p>{transaction.description || '—'}</p>
        <button className='dark' onClick={() =>navigate(`${transaction.id}/edit`)}>Edit</button>
        <button className='dark' onClick={deleteTransaction}>Delete</button>
    </div>
}