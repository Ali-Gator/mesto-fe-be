import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddCard, isSaving}) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: title,
      link
    });
  }

  return <PopupWithForm isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        isSaving={isSaving}
                        title="Новое место"
                        name="card-add">
    <div className="popup__input-wrapper">
      <input value={title} onChange={handleTitleChange}
             className="popup__text-input popup__text-input_type_card-heading"
             id="card-heading-field" type="text"
             name="card-heading" placeholder="Название" minLength="2" maxLength="30"
             required/>
      <span className="card-heading-field-error popup__input-error"></span>
    </div>
    <div className="popup__input-wrapper">
      <input value={link} onChange={handleLinkChange} className="popup__text-input popup__text-input_type_image-link"
             id="image-link-field" type="url"
             name="image-link" placeholder="Ссылка на картинку" required/>
      <span className="image-link-field-error popup__input-error"></span>
    </div>
  </PopupWithForm>;
}
