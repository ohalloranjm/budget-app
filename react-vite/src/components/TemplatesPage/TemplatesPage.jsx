import React from "react";
import { redirect, useLoaderData } from "react-router-dom";

function TemplatesPage() {
  const templates = useLoaderData() || [];
  return (
    <div className="templates">
      {templates.map((t) => (
        <div className="template">
          <h2>{t.name}</h2>
          <div className="template-update-delete"></div>
        </div>
      ))}
      <button onClick={() => redirect("/")}>Create new template</button>
    </div>
  );
}

export default TemplatesPage;
