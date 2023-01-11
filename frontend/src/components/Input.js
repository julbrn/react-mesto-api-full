import React from 'react';

function Input(props) {
    return (
        <>
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            className="popup__input"
            placeholder={props.placeholder}
            autoComplete="off"
            minLength={props.minLength}
            maxLength={props.maxLength}
            required
            onChange={props.onChange}
            ref={props.avatarRef}
            value={props.value}
        />
        <span className="popup__input-error"/>
            </>
    );
}

export default Input;