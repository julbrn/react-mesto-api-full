import React from "react";

function Popup({popupModifier, containerModifier, isOpen, onClose, children}) {
    return (
        <div
            className={`popup popup_type_${popupModifier} ${isOpen ? "popup_opened" : ""}`}
            onClick={onClose}
        >
            <div className={`popup__container popup__container_type_${containerModifier}`} onClick={(event) => {event.stopPropagation()}}>
                <button
                    onClick={onClose}
                    type="button" aria-label="Close"
                    className="popup__close"
                />
                {children}
            </div>
        </div>
    );
}

export default Popup;