import React from "react";
import ReactDOM  from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";


function Modal ({isOpen, onClose, children}) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="bg-modal">
            <div className="modal">
                <button className="btn-close" onClick={onClose}> <AiFillCloseCircle /></button>
                <span>
                {children}
                </span>
                <div>&#128079; &#127881; &#129302; &#127881; &#128079;</div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export { Modal };