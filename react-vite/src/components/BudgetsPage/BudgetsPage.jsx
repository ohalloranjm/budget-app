import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useLoaderData } from "react-router-dom";

export default function BudgetsPage() {
    const budgets = useLoaderData().Budgets

    return <div className="primary-dark">
        {budgets.map(budget=> {
            return <div>
                <h2>{budget.name}</h2>
                <p>${budget.allocated}</p>
            </div>
        })}
    </div>
}