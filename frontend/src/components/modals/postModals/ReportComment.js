import React from "react";

function ReportComment({ commentId, toogleDisplayModal }) {
  return (
    <div className="report__comment__modal modal__background">
      <div className="option red__option">
        <span>Report</span>
      </div>
      <div className="option black__option" onClick={toogleDisplayModal}>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default ReportComment;
