import React from "react";

function InfoTooltip(props) {
    return (
    <div className={`popup popup_tooltip ${props.isOpen ? "popup_visible" : ""}`}>
    <div className="popup__content">
        <img
            src={props.message.imgPath}
            alt="Подтверждение"
            className="popup__tooltip-img"
        />
        <p className="popup__tooltip-description">{props.message.text}</p>
        <button
            aria-label="Закрыть"
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
        />
    </div>
    </div>
    );
}

export default InfoTooltip;