import React from 'react';
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function DeleteConfirmationPopup({isOpen, isLoading, loadingText, onClose, onSubmit, card}) {
    function handleYesClick(e) {
        e.preventDefault();
        onSubmit(card);
    }
    return (
        <Popup
            popupModifier="deletion-confirmation"
            containerModifier="deletion-confirmation"
            isOpen={isOpen}
            onClose={onClose}
        >
        <PopupWithForm
            popupModifier="deletion-confirmation"
            title="Вы уверены?"
            buttonText="Да"
            onSubmit={handleYesClick}
            isLoading={isLoading}
            loadingText={loadingText}
        >
        </PopupWithForm>
        </Popup>
    )
}
export default DeleteConfirmationPopup;