import React from "react";

const Model = ({ title, show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog  modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Model;
