import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import "./TemplateDetails.css";

function TemplateDetails() {
  const navigate = useNavigate();
  const { template } = useLoaderData();
  const { Budgets: budgets, Creator: creator } = template;
  const user = useSelector((store) => store.session.user);
  const submit = useSubmit();

  const deleter = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Template?"
    );
    if (!confirmDelete) {
      return;
    }
    submit(
      { id: template.id },
      { method: "delete", encType: "application/json" }
    );
    navigate("/templates");
  };

  return user ? (
    <div className="template-summary">
      {user.id === creator.id ? (
        <>
          <button onClick={deleter}>Delete Template</button>
          <button onClick={() => navigate(`/templates/${template.id}/edit`)}>
            Update Template
          </button>
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
      <h2>{template.name}</h2>{" "}
      {budgets.map((b) => (
        <div
          className="template-summary-budget"
          onClick={() => navigate("/budgets/" + b.id)}
        >
          <p>{b.name}</p>
          <p>${b.allocated}</p>
        </div>
      ))}
    </div>
  ) : (
    "Not Signed In"
  );
}

export default TemplateDetails;
