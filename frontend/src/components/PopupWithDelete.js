import PopupWithForm from "./PopupWithForm";

function PopupWithDelete({ isOpen, onClose, onSubmitDelete, cardRemove, buttonText }) {

    function handleSubmitCardsDelete(e) {
        e.preventDefault();
        onSubmitDelete(cardRemove)
    }
    

    return (
    <PopupWithForm 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitCardsDelete}
        buttonText={buttonText}
        title="Вы уверены?"
        buttonName="Да"
        name="delete-cards"
    />
        )}


    export default PopupWithDelete;