import React from 'react';

function PopupWithForm({popupModifier, onSubmit, title, children, isLoading, loadingText, buttonText}) {
    return (
                <form className="popup__form" name={`${popupModifier}-form`} onSubmit={onSubmit}>
                    <fieldset className="popup__fieldset">
                        <legend className="popup__title">{title}</legend>
                        {children}
                        <button type="submit"
                                className="popup__submit-button popup__submit-button_active">{isLoading ? loadingText : buttonText}
                        </button>
                    </fieldset>
                </form>
    );
}

export default PopupWithForm;