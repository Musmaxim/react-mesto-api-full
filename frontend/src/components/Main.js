import pencil from '../images/Pencil.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (<>
        <main className="content">
            <section className="profile">
                <div className="info">
                    <div className="info__photo" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                        <img className="info__photo-edit" src={pencil}  alt="Обновить аватар" onClick={onEditAvatar}/>
                    </div>
                    <h1 className="info__name">{currentUser.name}</h1>
                    <button className="info__edit" type="button" onClick={onEditProfile}>
                    </button>
                    <p className="info__work">{currentUser.about}</p>
                </div>
                <button className="button" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {cards.map((card)=>{
                    return <Card 
                    card={card}
                    key={card._id} 
                    name={card.name} 
                    link={card.link} 
                    likes={card.likes.length} 
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}/>
                })}
            </section>
        </main>
        </>)}

        export default Main;