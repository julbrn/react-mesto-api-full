import React from 'react';
import Popup from "./Popup";
import successIcon from '../images/successIcon.svg'
import failureIcon from '../images/failureIcon.svg'

function InfoTooltip({isSuccessful, failureMessage, successMessage}) {
    return (
        <>
                <img
                    className="popup__icon"
                    src={isSuccessful ? successIcon : failureIcon}
                    alt={isSuccessful ? 'Успешная регистрация' : 'Ошибка! Попробуйте ещё раз.'}
                />
                <p className="popup__text">
                    {isSuccessful ? successMessage : failureMessage
                    }
                </p>
        </>
    )
}

export default InfoTooltip;