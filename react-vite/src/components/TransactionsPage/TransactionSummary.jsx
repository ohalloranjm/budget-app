import { useNavigate, useSubmit } from "react-router-dom"
import formatDate from "../../utils/format-date"

export default function TransactionSummary({ transaction }) {

    const submit = useSubmit()
    const navigate = useNavigate()
    
    function deleteTransaction(e) {
            e.preventDefault()
            submit({id: transaction.id}, {method: 'delete', encType: 'application/json'})
    }
    
    return <div className='transaction-summary-tile'>
        <h3>{transaction.name}</h3>
        <p>{formatDate(transaction.date)}</p>
        <p>${transaction.amount}</p>
        <p>{transaction.Budget?.name}</p>
        <button onClick={() =>navigate(`${transaction.id}/edit`)}>Edit</button>
        <button onClick={deleteTransaction}>Delete</button>
    </div>
}