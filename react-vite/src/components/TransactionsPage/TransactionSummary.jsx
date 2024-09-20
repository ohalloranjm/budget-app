import { useSubmit } from "react-router-dom"

export default function TransactionSummary({ transaction }) {

    const submit = useSubmit()
    
    function formatDate(dateStr) {
        const date = new Date(dateStr)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day < 10 ? '0' : ''}${day}/${year}`
    }
    
    return <div className='transaction-summary-tile'>
        <h3>{transaction.name}</h3>
        <p>{formatDate(transaction.date)}</p>
        <p>${transaction.amount}</p>
        <p>{transaction.Budget?.name}</p>
        <button onClick={(e) => {
            e.preventDefault()
            console.log('Successfully executing function')
            submit({id: transaction.id}, {'method': 'delete', encType: 'application/json'})
        }}>Delete</button>
    </div>
}