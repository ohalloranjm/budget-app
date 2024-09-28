import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function BudgetChart({totalBudgeted, transactions, now}) {

    const month = now.getMonth()
    const year = now.getFullYear()
    let day = 0
    let date = new Date(year, month, day)
    const incrementDate = () => {
        day++
        date = new Date(year, month, day)
        if (date.getMonth() === month) return date
    }
    let runningTotalSpent = 0;

    const data = [];
    while (incrementDate()) {
        const point = {}
        point.date = date
        point.day = day
        point.transactions = transactions.filter(t => {
            const tDate = new Date(t.date)
            return tDate.getDate() === day
        })
        runningTotalSpent += point.transactions.reduce((sum, t) => sum + t.amount, 0)
        point.spent = runningTotalSpent
        data.push(point)
    }

    data.forEach((d, i) => d.budgeted = (i + 1) * totalBudgeted / data.length)

    console.log(data)
    
    return <div className='bs-chart'>
        <ResponsiveContainer width='100%' height={500}>
        <LineChart data={data}>
            <Line type='monotone' dataKey='spent' stroke='#8884d8' />
            <Line type='monotone' dataKey='budgeted' stroke='#aaffaa' />
            <CartesianGrid stroke='#ccc' strokeDasharray={'5 5'} />
            <XAxis dataKey='day' />
            <YAxis />
        </LineChart>
        </ResponsiveContainer>
        <h2 className='secondary-dark center'>Total Monthly Spending</h2>
    </div>
}