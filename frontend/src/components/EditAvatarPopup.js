import PopupWithForm from "./PopupWithForm";
import React from 'react';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, buttonText}) {

    const avatarRef = React.useRef('');

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
        avatar_url: avatarRef.current.value 
        });
    }

    return (
        <PopupWithForm 
            title="Обновить аватар" 
            name="avatar" 
            buttonName="Сохранить" 
            buttonText={buttonText}
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}>
                <fieldset className="form__fieldset">
                    <span className="form__item-error" id="avatar_name-error"></span>
                    <input type="url" 
                    name="avatar_url" 
                    placeholder="Ссылка на аватар" 
                    className=" form__item form__item_el_url" 
                    id="input_avatar"
                    ref={avatarRef}
                    required autoComplete="off"/>
                    <span className="form__item-error" id="input_avatar-error"></span>
                </fieldset>
        </PopupWithForm>
            )

}

export default EditAvatarPopup;