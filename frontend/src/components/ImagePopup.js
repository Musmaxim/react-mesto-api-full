function ImagePopup(props) {
    return (
    <>
        <div className={`popup popup_open-img ${props.card.link ? 'popup_visible' : ""}`}>
            <div className="popup__content popup__content_img">
                {props.card.link && <img className="popup__image" alt={props.card.name} src={props.card.link} />}
                <p className="popup__caption">{props.card.name}</p>
                <button aria-label="Закрыть" type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    </>
        )}
        export default ImagePopup;