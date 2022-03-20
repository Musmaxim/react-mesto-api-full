
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

function Card ({ card, onCardClick, onCardLike, onCardDelete, name, link, likes}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

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

    const isliked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButton = `${isliked ? "element__like_act" : ""}`;

    return (
        <article className="element">
        <img className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
        />
        <button 
        className={`element__delete ${cardDeleteButton}`} 
        onClick={handleCardDelete} 
        type="button">
        </button>
        <h2 className="element__title">{name}</h2>
        <div className="element__like-box">
            <button 
            className={`element__like element__like_act-none ${cardLikeButton}`} 
            onClick={handleCardLike} 
            type="button">
            </button>
            <div className="elements__like-count">{likes}</div>
        </div>
    </article>
    )
}

export default Card;