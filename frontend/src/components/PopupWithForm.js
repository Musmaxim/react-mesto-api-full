import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_visible' : ""}`}>
        <div className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            <form className="form form_profile" name={props.name} onSubmit={props.onSubmit}>
                {props.children}
                <button className="form__button" type="submit">{props.buttonText ? props.buttonText : props.buttonName}</button>
            </form>
            <button aria-label="Закрыть" type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
        </div>
        )}
        export default PopupWithForm;
