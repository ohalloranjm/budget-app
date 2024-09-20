export default function TransactionSummary({ transaction }) {
    
    function formatDate(dateStr) {
        const date = new Date(dateStr)
        // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        // const month = months[date.getMonth()]
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day < 10 ? '0' : ''}${day}/${year}`
    }
    
    return <div className='transaction-summary-tile' onClick>
        <h3>{transaction.name}</h3>
        <p>{formatDate(transaction.date)}</p>
        <p>${transaction.amount}</p>
        <p>{transaction.Budget?.name}</p>
    </div>
}