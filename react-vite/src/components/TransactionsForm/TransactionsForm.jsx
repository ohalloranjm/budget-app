import { useState } from "react"
import { useLoaderData } from "react-router-dom"

const formatDate = function(date) {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    let day = date.getDate()
    if (day < 10) day = '0' + day
    return `${year}-${month}-${day}`
}

export default function TransactionsForm() {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(formatDate(new Date()))

    const { Budgets } = useLoaderData()
    const budgetCategories = new Set(Budgets.map(b => b.name))
    console.log(budgetCategories.keys())

    return <form>
      <input 
            value={name}
            type='text'
            placeholder='Name'
            onChange={e => setName(e.target.value)}
        />
        <input 
            value={amount}
            type='number'
            placeholder='Transaction Amount'
            onChange={e => setAmount(e.target.value)}
        />
        <input 
            value={date}
            type='date'
            placeholder='Transaction'
            onChange={e => setDate(e.target.value)}
        />
        <textarea 
            value={description}
            placeholder='Description'
            onChange={e => setDescription(e.target.value)}
        />
        <select>
            {budgetCategories.values().toArray().sort().map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button 
            type='submit'
            onClick={e => e.preventDefault()}
        >Submit</button>
    </form>
}