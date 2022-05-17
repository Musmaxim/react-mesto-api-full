
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;

    const handleClick = () => {
        onCardClick(card);
    }  

    const handleCardLike = () => {
        onCardLike(card)
    }

    const handleCardDelete = () => {
        onCardDelete(card)
    }

    const cardDeleteButton = `elements__btn ${isOwn ? "element__delete_act" : ''}`

    const isliked = card.likes.some(i => i === currentUser._id);
    const cardLikeButton = `${isliked ? "element__like_act" : ""}`;

    return (
        <article className="element">
        <img className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        />
        <button 
        className={`element__delete ${cardDeleteButton}`} 
        onClick={handleCardDelete} 
        type="button">
        </button>
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
            <button 
            className={`element__like element__like_act-none ${cardLikeButton}`} 
            onClick={handleCardLike} 
            type="button">
            </button>
            <div className="elements__like-count">{card.likes.length}</div>
        </div>
    </article>
    )
}

export default Card;