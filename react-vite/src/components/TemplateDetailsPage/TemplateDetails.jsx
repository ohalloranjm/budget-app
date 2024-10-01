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
      {user.id === creator.id ? (
        <>
          <button className="dark" onClick={deleter}>
            Delete Template
          </button>
          <button
            className="dark"
            onClick={() => navigate(`/templates/${template.id}/edit`)}
          >
            Update Template
          </button>
          <button
            className="dark"
            onClick={() =>
              navigator.clipboard.writeText(
                "https://budget-me.onrender.com/templates/" + template.id
              )
            }
          >
            Copy Share Link
          </button>
        </>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            const confirmDelete = window.confirm("Feature Coming Soon");
          }}
        >
          Copy Template
        </button>
      )}
    </div>
  ) : (
    "Not Signed In"
  );
}

export default TemplateDetails;
