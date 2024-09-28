import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";

function TemplateForm({ edit }) {
  const submit = useSubmit();
  const loader = useLoaderData();
  const template = loader.template;
  const Budgets = edit ? loader.budgets.Budgets : loader.Budgets;
  const [name, setName] = useState(edit ? template.name : "");
  const [budgetsAdded, setBudgetsAdded] = useState(
    edit ? [...template.Budgets] : []
  );
  //name
  const [selected, setSelected] = useState(Budgets[0]);
  const handleClick = () => {
    if (!budgetsAdded.find((b) => b.id === selected.id)) {
      setBudgetsAdded([...budgetsAdded, selected]);
    }
  };

  const post = (e) => {
    e.preventDefault();
    const template = {
      name,
    };
    const budgets = budgetsAdded.reduce((acc, b) => {
      acc[b.id] = b;
      return acc;
    }, {});
    submit(
      { template, budgets },
      { method: "post", encType: "application/json" }
    );
  };

  const put = (e) => {
    console.log(name);
    e.preventDefault();
    const template = {
      name,
    };
    const budgets = budgetsAdded.reduce((acc, b) => {
      acc[b.id] = b;
      return acc;
    }, {});
    submit(
      { template, budgets },
      { method: "post", encType: "application/json" }
    );
  };

  return (
    <>
      <form action="post" onSubmit={edit ? put : post}>
        <input
          type="text"
          placeholder="Template Name"
          className="template-form-name"
          onInput={(e) => setName(e.target.value)}
          value={name}
        />
        <div className="template-form-added-budgets">
          {budgetsAdded.map((ba, i) => (
            <span>
              <p>{ba.name + " | " + `$${ba.allocated}`}</p>
              <button
                type="button"
                onClick={() => {
                  console.log(
                    budgetsAdded.slice(0, i),
                    budgetsAdded[i],
                    budgetsAdded.slice(i + 1)
                  );
                  setBudgetsAdded([
                    ...budgetsAdded.slice(0, i),
                    ...budgetsAdded.slice(i + 1),
                  ]);
                }}
              >
                Remove
              </button>
            </span>
          ))}
        </div>
        <div className="template-form-budgets">
          <select
            name=""
            id=""
            onChange={(e) => {
              setSelected(
                Budgets.find(
                  (b) =>
                    b.id === Number(e.target.options[e.target.selectedIndex].id)
                )
              );
            }}
            value={selected.name + " | " + `$${selected.allocated}`}
          >
            {Budgets.map((b) => {
              return (
                <option id={b.id}>
                  <p>{b.name + " | " + `$${b.allocated}`}</p>
                </option>
              );
            })}
          </select>
          <button type="button" onClick={handleClick}>
            Add Budget
          </button>
        </div>
        <button type="submit">
          {edit ? "Update Template" : "Create Template"}
        </button>
      </form>
    </>
  );
}

export default TemplateForm;
