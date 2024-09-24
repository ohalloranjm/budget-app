import React, { useState } from "react";

function TemplateForm() {
  [name, setName] = useState();
  function handleInput(e) {
    setName(e.target.value);
  }
  function handlesubmit() {}
  return (
    <>
      <form action="post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Groceries"
          className="template-form-name"
          onInput={handleInput}
          value={name}
        />
        <div className="template-form-budgets">{}</div>
        <button type="submit">Create Template</button>
      </form>
    </>
  );
}

export default TemplateForm;
