import PopupWithForm from "./PopupWithForm";
import React from 'react';

function AddPlacePopup ({ isOpen, onClose, onAddPlace, buttonText}) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setcardLink] = React.useState('');

    React.useEffect(() => {
        setCardName('');
        setcardLink('');
    }, [isOpen]);

    const handleCardName = (e) => {
        setCardName(e.target.value)
    }

    const handleCardLink = (e) => {
        setcardLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: cardName,
            link: cardLink
        });
    }

return (

    <PopupWithForm 
        title="Новое место" 
        name="add-cards"
        buttonName="Сохранить" 
        buttonText={buttonText}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <fieldset className="form__fieldset">
                <input 
                type="text" 
                value={`${cardName}`} 
                onChange={handleCardName} 
                placeholder="Название картинки" 
                className="form__item form__item_el_discr" 
                id="input_discr" 
                minLength="2" 
                maxLength="30" 
                required 
                autoComplete="off"/>
                <span className="form__item-error" id="input_discr-error"></span>
                <input 
                type="url" 
                value={`${cardLink}`} 
                onChange={handleCardLink} 
                placeholder="Ссылка на картинку" 
                className="form__item form__item_el_img" 
                id="input_img" 
                required 
                autoComplete="off"/>
                <span className="form__item-error" id="input_img-error"></span>
            </fieldset>
    </PopupWithForm>

)

}

export default AddPlacePopup;