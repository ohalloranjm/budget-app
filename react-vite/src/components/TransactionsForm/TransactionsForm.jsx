import { useEffect, useState } from "react"
import { useLoaderData, useSubmit, useActionData, useNavigate } from "react-router-dom"
import toCents from "../../utils/to-cents"
import { formatDateInternal, todayInternal } from "../../utils/format-date"
import "./TransactionsForm.css"

export default function TransactionsForm({edit}) {

    const submit = useSubmit()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(todayInternal())
    const [budgetName, setBudgetName] = useState('')
    const errors = useActionData() ?? {}
    const data = useLoaderData()
    useEffect(() => {
        if (edit) {
            const og = data[1]
            setName(og.name)
            setAmount(og.amount)
            setDescription(og.description ?? '')
            setDate(formatDateInternal(new Date(og.date)))
            setBudgetName(og.Budget.name)
        }
    }, [])
    
    const Budgets = edit ? data[0].Budgets : data.Budgets

    const budgetCategories = new Set(Budgets.map(b => b.name))

    const post = e => {
        e.preventDefault()
        const transaction = { name, amount: toCents(amount), date, description }
        submit({budgetName, transaction}, {method: 'post', encType: 'application/json'})
    }

    const put = e => {
        e.preventDefault()
        const transaction = { name, amount: toCents(amount), date, description, budgetName }
        submit(transaction, {method: 'post', encType: 'application/json'})
    }

    return <>
    <h1
        className='secondary-dark center'
    >{edit ? 'Edit Transaction' : 'Input a New Transaction'}</h1>
    <form className='transaction-form'>
      <input 
            value={name}
            type='text'
            placeholder='Name'
            onChange={e => setName(e.target.value)}
            className='tf-name'
        />
        <p className='tf-name-error error'>{errors.name ?? ''}</p>
        <input 
            value={amount}
            type='number'
            placeholder='Transaction Amount'
            onChange={e => setAmount(e.target.value)}
            className='tf-amount'
        />
        <p className='tf-amount-error error'>{errors.amount ?? ''}</p>
        <input 
            value={date}
            type='date'
            placeholder='Transaction'
            onChange={e => setDate(e.target.value)}
            className='tf-date'
        />
        <p className='tf-date-error error'>{errors.date ?? ''}</p>
        <textarea 
            value={description}
            placeholder='Description'
            onChange={e => setDescription(e.target.value)}
            className='tf-description'
        />
        <p className='tf-description-error error'>{errors.description ?? ''}</p>
        <select 
            value={budgetName}
            onChange={e => setBudgetName(e.target.value)}
            className='tf-budget-name'
        >
            <option value=''>-</option>
            {budgetCategories.values().toArray().sort().map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="tf-submit">
        <button 
            type='submit'
            onClick={edit ? put : post}
            disabled={!budgetName}
            className='dark tf-submit-button'
        >{edit ? 'Submit Edits' : 'Add Transaction'}</button>
        <button 
            type='button'
            onClick={() => navigate('/transactions')}
            className='tf-back-button dark'
        >Go Back</button>

        </div>
    </form>
    </>
}