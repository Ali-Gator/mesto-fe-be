import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({onImageClick, onAddPlace, onEditAvatar, onEditProfile, cards, onCardLike, onCardDelete}) {

  const value = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="page__profile profile">
        <button className="profile__image-button" onClick={onEditAvatar}>
          <img className="profile__image" src={value.currentUser.avatar} alt="Изображение пользователя"/>
        </button>
        <div className="profile__name-wrapper">
          <h1 className="profile__name">{value.currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
        </div>
        <p className="profile__description">{value.currentUser.about}</p>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="page__cards cards">
        <ul className="cards__list">
          {cards.map(card => (
            <Card card={card} key={card._id} onImageClick={onImageClick} onCardLike={onCardLike}
                  onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}
