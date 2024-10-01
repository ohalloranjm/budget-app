import React from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import "./TemplatesPage.css";

function TemplatesPage() {
  const { Templates } = useLoaderData() || [];
  const navigate = useNavigate();
  return (
    <div className="templates">
      {Templates.map((t) => (
        <div
          className="template"
          onClick={(e) => navigate("/templates/" + t.id)}
        >
          <h2>{t.name}</h2>
        </div>
      ))}
      <button className="dark" onClick={() => navigate("/templates/new")}>
        Create new template
      </button>
    </div>
  );
}

export default TemplatesPage;
