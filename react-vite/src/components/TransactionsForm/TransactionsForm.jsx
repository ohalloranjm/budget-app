import { useState } from "react"
import { useLoaderData, useSubmit, useRouteError } from "react-router-dom"
import toCents from "../../utils/to-cents"
import { formatDateInternal } from "../../utils/format-date"

export default function TransactionsForm() {
    const submit = useSubmit()

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(formatDateInternal(new Date()))
    const [budgetName, setBudgetName] = useState('')

    // const error = useRouteError()
    // console.error('this is my error:', error)

    const { Budgets } = useLoaderData()
    const budgetCategories = new Set(Budgets.map(b => b.name))

    const submitForm = e => {
        e.preventDefault()
        const transaction = { name, amount: toCents(amount), date, description }
        try {
            submit({budgetName, transaction}, {method: 'post', encType: 'application/json'})
        } catch(err) {
            console.log('The error has been caught')
            console.error(err)
        }
    }

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
        <select value={budgetName} onChange={e => setBudgetName(e.target.value)}>
            <option value=''>-</option>
            {budgetCategories.values().toArray().sort().map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button 
            type='submit'
            onClick={submitForm}
        >Submit</button>
    </form>
}