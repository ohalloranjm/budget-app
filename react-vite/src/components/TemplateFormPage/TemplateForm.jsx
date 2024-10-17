import { useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import "./TemplateForm.css";

function TemplateForm({ edit }) {
  const submit = useSubmit();
  const loader = useLoaderData();
  const template = loader.template;
  const Budgets = edit ? loader.budgets.Budgets : loader.Budgets;
  const [name, setName] = useState(edit ? template.name : "");
  const [budgetsAdded, setBudgetsAdded] = useState(
    edit ? [...template.Budgets] : []
  );
  const [errors, setErrors] = useState({});
  //name
  const [selected, setSelected] = useState(Budgets[0]);
  const handleClick = () => {
    if (!budgetsAdded.find((b) => b.id === selected.id)) {
      setBudgetsAdded([...budgetsAdded, selected]);
    }
  };

  const validateData = (data) => {
    const validationErrors = {};
    if (!data.name) {
      validationErrors.name = "This field is required";
    }
    if (data.name.length > 50) {
      validationErrors.name = "This field must be less than 50 chars";
    }
    console.log(Object.keys(validationErrors), validationErrors);
    return Object.keys(validationErrors).length > 0 ? validationErrors : false;
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

    const validationErrors = validateData(template);
    if (validationErrors) {
      return setErrors({ ...validationErrors });
    } else
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
    const validationErrors = validateData(template);
    if (validationErrors) {
      return setErrors({ ...validationErrors });
    } else
      submit(
        { template, budgets },
        { method: "post", encType: "application/json" }
      );
  };

  return (
    <div className="template-form-container">
      <form action="post" onSubmit={edit ? put : post}>
        <h2 className="secondary-dark center">
          {edit ? "Edit a Template" : "Create a New Template"}
        </h2>
        <p>Template Name</p>
        <input
          type="text"
          placeholder="Template Name"
          className="template-form-name"
          onInput={(e) => setName(e.target.value)}
          value={name}
        />
        {errors.name && <p className="alert-text">{errors.name}</p>}
        <div className="template-form-added-budgets">
          <p>Budgets</p>
          {budgetsAdded.map((ba, i) => (
            <span key={ba.id} className="template-form-budget">
              <p>{ba.name + " | " + `$${ba.allocated}`}</p>
              <button
                type="button"
                className="error"
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
                <option key={b.id} id={b.id}>
                  <p>{b.name + " | " + `$${b.allocated}`}</p>
                </option>
              );
            })}
          </select>
          <button type="button" className="dark" onClick={handleClick}>
            Add Budget
          </button>
        </div>
        <button type="submit" className="dark">
          {edit ? "Update Template" : "Create Template"}
        </button>
      </form>
    </div>
  );
}

export default TemplateForm;
