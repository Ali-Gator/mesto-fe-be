import React from 'react';

export default function PopupWithForm({name, isOpen, children, onClose, title, onSubmit, isSaving}) {
  return (
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <form onSubmit={onSubmit} className={`popup__form popup__form_edit-${name}`} method="post"
                name={`edit-${name}`} noValidate>
            <h2 className="popup__heading">{title}</h2>
            {children}
            <button className="popup__save-button" type="submit">{isSaving ? 'Сохранение' : 'Сохранить'}</button>
          </form>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
        </div>
      </div>
  );
}
