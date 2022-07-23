import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isSaving}) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const value = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(value.currentUser.name || '');
    setDescription(value.currentUser.about || '');
  }, [value.currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return <PopupWithForm isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        isSaving={isSaving}
                        title="Редактировать профиль"
                        name="profile">
    <div className="popup__input-wrapper">
      <input value={name} onChange={handleNameChange}
             className="popup__text-input popup__text-input_type_username" id="name-field"
             type="text" name="username"
             placeholder="Имя" minLength="2" maxLength="40" required/>
      <span className="name-field-error popup__input-error"></span>
    </div>
    <div className="popup__input-wrapper">
      <input value={description} onChange={handleDescriptionChange}
             className="popup__text-input popup__text-input_type_description"
             id="description-field" type="text"
             name="description" placeholder="Описание" minLength="2" maxLength="200"
             required/>
      <span className="description-field-error popup__input-error"></span>
    </div>
  </PopupWithForm>;
}
