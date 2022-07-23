import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({card, onImageClick, onCardLike, onCardDelete}) {

  const value = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === value.currentUser._id;
  const isLiked = card.likes.some(user => user._id === value.currentUser._id);

  function handleClick() {
    onImageClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  return (
    <li className="card">
      <img className="card__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <div className="card__description">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-wrapper">
          <button className={`card__like-icon${isLiked ? ' card__like-icon_pressed' : ''}`} type="button"
                  onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={`card__delete-icon${isOwn ? ' card__delete-icon_active' : ''}`} type="button"
              onClick={handleDeleteClick}></button>
    </li>
  );
}
