import React from "react";

export default (props) => (
    <div className="RUI-modal-container">
        <div className="RUI-modal-backdrop"></div>
        <div className="RUI-modal-content">
            {props.children}
        </div>
    </div>
)