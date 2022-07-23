import React from 'react';
import ok from '../images/icon-ok.svg';
import error from '../images/icon-error.svg';


function InfoTooltip({onClose, isOpen, isOk}) {

  return (
    <div className={`popup ${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__icon" src={isOk ? ok : error} alt="icon"/>
        <p className="popup__text">
          {isOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
