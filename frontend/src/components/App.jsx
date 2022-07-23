import '../index.css';
import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import {getContent} from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isTooltipPopupOpened, setTooltipPopupOpened] = React.useState(false);
  const [isFetchOk, setIsFetchOk] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token)
        .then(data => {
          if (data) {
            setCurrentUser(prev => {
              return {...prev, email: data.data.email};
            });
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    Promise.all([api.getInitialUser(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(prev => {
          return {...prev, ...user};
        });
        setCards(cards);
      })
      .catch(err => console.log(err));
    checkToken();
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard(card);
  }

  function handleRegister(isOk) {
    setTooltipPopupOpened(true);
    setIsFetchOk(isOk);
  }

  function handleLogin(isOk) {
    if (isOk) {
      setLoggedIn(true);
    } else {
      setTooltipPopupOpened(true);
      setIsFetchOk(false);
    }
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setTooltipPopupOpened(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  function handleConfirmedCardDelete() {
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => alert(`${err}. Попробуйте ещё раз`));
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api.patchProfile(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => {
        alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
      })
      .finally(() => setIsSaving(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api.patchAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => {
        alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
      })
      .finally(() => setIsSaving(false));
  }

  function handleAddCard(card) {
    setIsSaving(true);
    api.postCard(card)
      .then(newCard => {
        setCards(state => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(err => {
        alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
      })
      .finally(() => setIsSaving(false));
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, setLoggedIn}}>
      <div className="page">
        <Header/>
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} history={history}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} history={history}/>
          </Route>
          <ProtectedRoute exact path="/"
                          loggedIn={loggedIn}
                          component={Main}
                          onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onImageClick={handleImageClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}/>
        </Switch>
        {loggedIn && <>
          <Footer/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar} isSaving={isSaving}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser} isSaving={isSaving}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}
                         isSaving={isSaving}/>
          <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onAgree={handleConfirmedCardDelete}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </>}
        <InfoTooltip isOpen={isTooltipPopupOpened} onClose={closeAllPopups} isOk={isFetchOk}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
