import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip";
import Popup from "./Popup";
import PageNotFound from "./PageNotFound";
import NoInternetConnection from "./NoInternetConnection"

function App() {
    let history = useHistory();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false)
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [isSuccessful, setSuccessful] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [selectedCard, setSelectedCard] = useState(null)
    const [cards, setCards] = useState([])
    const [card, setCard] = useState({})
    const [currentUser, setCurrentUser] = useState({
        about: '',
        name: '',
        avatar: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);
        // Отправляем запрос и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    }
    function handleCardDelete(card) {
        setIsLoading(true)
        api.deleteCardfromServer(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id && c));
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                setIsLoading(false)
                closeAllPopups();
            });
    }
    const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard || isConfirmPopupOpen || isInfoTooltipOpen;
    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.downloadInitialCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData.user);
                    setCards(cardsData.reverse());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        function handleEscapeClose(event) {
            if (event.key === 'Escape') {
                closeAllPopups()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeClose);
            return () => {
                document.removeEventListener('keydown', handleEscapeClose)
            }
        }
    }, [isOpen])

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleDeleteBtnClick(card) {
        setConfirmPopupOpen(true); setCard(card);
    }
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }
    function closeAllPopups() {
        setEditProfilePopupOpen(false); setAddPlacePopupOpen(false); setEditAvatarPopupOpen(false); setSelectedCard(null); setConfirmPopupOpen(false); setInfoTooltipOpen(false);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(inputData) {
        setIsLoading(true)
        api.uploadUserInfo(inputData)
            .then(user => {
                setCurrentUser(user);
                setEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)//
            })
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true)
        api.editAvatar(data)
            .then(res => {
                setCurrentUser(res);
                setEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleAddPlace(data) {
        setIsLoading(true)
        api.uploadCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)//
            })
    }
    function handleRegister(newUser) {
        setIsLoading(true);
        auth
            .register(newUser.email, newUser.password)
            .then(() => {
                setSuccessful(true);
                history.push('/signin');
            })

            .catch((err) => {
                setSuccessful(false);
                console.log(err);
                setInfoTooltipOpen(true)
            })
            .finally(() => {
                setInfoTooltipOpen(true)
                setIsLoading(false);
            })
    }

    function handleLogin(user) {
        setIsLoading(true);
        auth
            .signIn(user.email, user.password)
            .then((data) => {
                setIsLoggedIn(true);
                localStorage.setItem("jwt", data.token);
                setUserEmail(user.email);
                history.push("/");
            })
            .catch((err) => {
                setInfoTooltipOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function tokenCheck() {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth.getProfile(token)
                .then((res) => {
                    if (res) {
                        setUserEmail(res.user.email);
                        setIsLoggedIn(true);
                        history.push('/')
                    }
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        tokenCheck();
    }, [])

    const handleSignOut = () => {
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            setIsLoggedIn(false);
            setUserEmail('');
            history.push("/signin");
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <NoInternetConnection isOpen="true">
                    <Header onSignOut={handleSignOut} email={userEmail} isLoggedIn={isLoggedIn} loginLinkText="Вход" registerLinkText="Регистрация" />
                    <Switch>
                        <ProtectedRoute exact path="/"
                            loggedIn={isLoggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            setCards={setCards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteBtnClick}
                            component={Main}
                        />
                        <Route path="/signup">
                            <Register
                                onRegister={handleRegister} isLoading={isLoading} loadingText="Регистрация..." buttonText="Зарегистрироваться"
                            />
                        </Route>
                        <Route path="/signin">
                            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} isLoading={isLoading} loadingText="Вход..." buttonText="Войти"
                            />
                        </Route>
                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                    <Footer />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} loadingText="Сохранение..." />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} loadingText="Сохранение..." />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} isLoading={isLoading} loadingText="Добавление..." />
                    <Popup popupModifier="zoom-image" containerModifier="zoom-image" onClose={closeAllPopups} isOpen={selectedCard}>
                        <ImagePopup
                            card={selectedCard}
                        >
                        </ImagePopup></Popup>
                    <DeleteConfirmationPopup isOpen={isConfirmPopupOpen} isLoading={isLoading} loadingText="Удаление..." onClose={closeAllPopups} onSubmit={handleCardDelete} card={card} />
                    <Popup containerModifier="auth" onClose={closeAllPopups} isOpen={isInfoTooltipOpen}>
                        <InfoTooltip
                            isSuccessful={isSuccessful} failureMessage="Что-то пошло не так! Попробуйте ещё раз." successMessage="Вы успешно зарегистрировались!"
                        />
                    </Popup>
                </NoInternetConnection>
            </div>
        </CurrentUserContext.Provider>)
}
export default App;

