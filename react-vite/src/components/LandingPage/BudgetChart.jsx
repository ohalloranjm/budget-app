import { LineChart, Line } from 'recharts';

export default function BudgetChart({totalBudgeted, transactions, now}) {
    const fakedata = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 2400, pv: 400, amt: 2000}, {name: 'Page C', uv: 600, pv: 600, amt: 40}]
    console.log(totalBudgeted, transactions)

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
    
    return <LineChart width={400} height={400} data={data}>
        <Line type='monotone' dataKey='spent' stroke='#8884d8' />
        <Line type='monotone' dataKey='budgeted' stroke='#aaffaa' />
    </LineChart>
}