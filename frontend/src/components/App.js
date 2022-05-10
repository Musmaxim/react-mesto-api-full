import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithDelete from './PopupWithDelete';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth';

import rejectIcon from '../images/Reject.svg';
import successIcon from '../images/Success.svg';

import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {

    const history = useHistory();
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen]= useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen]= useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen]= useState(false);
    const [isOpenPopupDeleteCards, setisOpenPopupDeleteCards] = useState(false);
    const [isButtonText, setIsButtonText] = useState('')
    const [selectedCard, setSelectedCard]= useState({name:'', link:''});
    const [currentUser, setcurrentUser]= useState({});
    const [cards, setCards] = useState([]);
    const [cardRemove, setCardRemove] = useState({});
    const [isToooltipOpen, setIsTooltipOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ imgPath: "", text: "" });
    
    const tokenCheck = () => {
        const jwt = localStorage.getItem("jwt")
        if (localStorage.getItem("jwt")) {
        auth.checkToken(jwt)
            .then ((data) => {
                if (data) {
                    setLoggedIn(true);
                    history.push("/");
                    setEmail(data.data['email']);
                } 
            })
            .catch((err) => {
                console.log(err);});
        }
    }
    
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
            setcurrentUser(userInfo);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });
        tokenCheck();      
    }, []);

    const handleCardLike = (card) => {
        const isliked = card.likes.some(i => i._id === currentUser._id);
        api
        .likeCard(card._id, !isliked)
        .then((newCard) => {
            setCards((cards) =>
            cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
        console.log(err);});
        
    }

    const handleCardDelete = (card) => {
        setIsButtonText('Удаление...')
        api
        .deleteCard(card._id)
        .then(() => {
            setCards(cards.filter(item => item._id !== card._id))
            closeAllPopups()
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleUpdateUser = (userInfo) => {
        setIsButtonText('Сохранение...')
        api
        .setUserInfo(userInfo)
        .then(res => {
            setcurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleUpdateAvatar = ({ avatar_url }) => {
        setIsButtonText('Сохранение...')
        api
        .setAvatar({ avatar_url })
        .then(res => {
            setcurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleAddPlace = (newCard) => {
        setIsButtonText('Добавление...')
        api
        .addCard(newCard)
        .then(res => {
            setCards([res, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleEditAvatarClick = () => {
        setisEditAvatarPopupOpen(true)
    }
    
    const handleEditProfileClick = () => {
        setisEditProfilePopupOpen(true)
    }
    
    const handleAddPlaceClick = () => {
        setisAddPlacePopupOpen(true)
    }

    const confirmCardDelete = (card) => {
        setCardRemove(card);
        setisOpenPopupDeleteCards(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setisEditAvatarPopupOpen(false)
        setisEditProfilePopupOpen(false)
        setisAddPlacePopupOpen(false)
        setisOpenPopupDeleteCards(false);
        setIsTooltipOpen(false);
        setSelectedCard({name:'', link:''})
        setIsButtonText('')
    }

    const handleSignOut = () => {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        setEmail("");
        history.push("/sign-in");
    }

    const handleToolltipInfoOpen = () => {
        setIsTooltipOpen(true);
    }

    const handleTooltipInfo = ({ imgPath, text }) => {
        setMessage({ imgPath, text });
    }

    const registration = ({ email, password }) => {
        auth
            .register(email, password)
            .then(() => {
                handleTooltipInfo({
                imgPath: successIcon,
                text: "Вы успешно зарегистрированы",
                });
                handleToolltipInfoOpen();
                authorization({ email, password });
            })
            .catch((err) => {
                handleTooltipInfo({
                imgPath: rejectIcon,
                text: "Что-то пошло не так",
            });
            handleToolltipInfoOpen();
            console.log(err);
            });
    }

    function authorization({ email, password }) {
        auth
            .authorize({ email, password })
            .then((data) => {
                setLoggedIn(true);
                setEmail(email)
                history.push("/");
                localStorage.setItem("jwt", data.token);   
            })
            .catch((err) => {
            handleTooltipInfo({
                imgPath: rejectIcon,
                text: "Что-то пошло не так",
            });
            handleToolltipInfoOpen();
            console.log(err);
            });
    }

    return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">
        <Header 
        handleSignOut={handleSignOut}
        loggedIn={loggedIn}
        email={email}
        />
        <Switch>
        <Route path="/sign-in">
            <Login authorize={authorization} />
        </Route>
        <Route path="/sign-up">
            <Register registrate={registration} />
        </Route>
            <ProtectedRoute
            exact path="/"
            component = {Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={confirmCardDelete}
            loggedIn={loggedIn}
            />
        <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>    
        </Switch>
        {loggedIn ? <Footer /> : ''}
    </div>
    </div>


    <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={isButtonText}/>

    <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isButtonText}
        />

    <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        buttonText={isButtonText}
    />

    <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
    />

    <PopupWithDelete 
        isOpen={isOpenPopupDeleteCards}
        onClose={closeAllPopups}
        onSubmitDelete={handleCardDelete}
        cardRemove={cardRemove}
        buttonText={isButtonText}   
    />

    <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isToooltipOpen}
        message={message}
    />

    </CurrentUserContext.Provider>
</>);
    }

    export default App;