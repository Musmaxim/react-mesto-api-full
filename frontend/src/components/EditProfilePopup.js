import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

function EditProfilePopup ({ isOpen, onClose, buttonText, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    const handleUserName = (e) => {
        setName(e.target.value)
    }
    
    const handleUserAbout = (e) => {
        setAbout(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about
        });
    }

    return (
        <PopupWithForm 
            title="Редактировать профиль" 
            name="profile" 
            buttonName="Сохранить" 
            buttonText={buttonText}
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}>
                <fieldset className="form__fieldset">
                    <input 
                    type="text" 
                    value={`${name}`} 
                    onChange={handleUserName} 
                    placeholder="Введите имя" 
                    className="form__item form__item_el_name" 
                    id="input_name" 
                    minLength="2" 
                    maxLength="40" 
                    required 
                    autoComplete="off"/>
                    <span className="form__item-error" id="input_name-error"></span>
                    <input 
                    type="text" 
                    value={`${about}`} 
                    onChange={handleUserAbout} 
                    placeholder="Введите род занятий" 
                    className="form__item form__item_el_work" 
                    id="input_work" 
                    minLength="2" 
                    maxLength="200" 
                    required 
                    autoComplete="off"/>
                    <span className="form__item-error" id="input_work-error"></span>
                </fieldset>
        </PopupWithForm>
            )
}

export default EditProfilePopup;