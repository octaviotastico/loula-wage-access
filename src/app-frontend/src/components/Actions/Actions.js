import React from "react";
import "./Actions.css";

function Actions() {
  return (
    <div className="actions">
      <h3>Actions</h3>
      <div className="action-list">
        <button className="action action-grey">
          Send <span className="material-symbols-rounded">arrow_upward</span>
        </button>
        <button className="action action-green">
          Wage Access <span className="material-symbols-rounded">arrow_downward</span>
        </button>
      </div>
    </div>
  );
}

export default Actions;
