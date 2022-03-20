export const authorInput = document.querySelector('.form__item_el_name');
export const workInput = document.querySelector('.form__item_el_work');
export const popupProfile = document.querySelector('.popup_profile');
export const openEditPopupBtn = document.querySelector('.info__edit');
export const formEditProfile = document.querySelector('.form_profile');
export const formAddCard = document.querySelector('.form_cards');
export const formAvatar = document.querySelector('.form_avatar');
export const popupAddCard = document.querySelector('.popup_add-cards');
export const popupElement = document.querySelector('.popup_open-img');
export const popupConfirm = document.querySelector('.popup_confirm');
export const popupAvatar = document.querySelector('.popup_avatar');
export const elementContainer = document.querySelector('.elements');
export const popupOpenButtonElementCard = document.querySelector('.button');
export const cardTemplateId = "#template";

export const dataVal = ({
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__item-error_active"
});

export const profileSelectors = {
    nameSelector: ".info__name",
    descriptionSelector: ".info__work",
    avatarSelector: ".info__photo",
    avatarEditSelector: ".info__photo-edit",
};

export const apiConfig = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30/",
    headers: {
        authorization: "f527135c-0312-442d-818d-6dc714cef781",
        "Content-Type": "application/json",
    },
};