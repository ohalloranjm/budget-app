import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

function TemplateDetails() {
  const navigate = useNavigate();
  const template = useLoaderData();
  const { Budgets: budgets, Creator: creator } = template;
  const user = useSelector((store) => store.session.user);
  console.log(user);
  return (
    <div className="template-summary">
      {user.id === creator.id ? (
        <>
          <button>Delete Template</button>
          <button>Update Template</button>
          <button
            onClick={() =>
              navigator.clipboard.writeText("/templates/" + template.id)
            }
          >
            Copy Share Link
          </button>
        </>
      ) : (
        <button>Copy Template</button>
      )}
      <h2>{template.name}</h2>
      {budgets.map((b) => (
        <div
          className="template-summary-budget"
          onClick={() => navigate("/budgets/" + b.id)}
        >
          <p>{b.name}</p>
          <p>{b.allocated}</p>
        </div>
      ))}
    </div>
  );
}

export default TemplateDetails;
