import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSaving}) {

    const avatar = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar.current.value
        });
    }

    return <PopupWithForm isOpen={isOpen}
                          onClose={onClose}
                          isSaving={isSaving}
                          onSubmit={handleSubmit}
                          title="Обновить аватар"
                          name="avatar">
        <div className="popup__input-wrapper">
            <input ref={avatar} className="popup__text-input popup__text-input_type_avatar-link"
                   id="avatar-link-field" type="url"
                   name="avatar-link" placeholder="Ссылка на аватар" required/>
            <span className="avatar-link-field-error popup__input-error"></span>
        </div>
    </PopupWithForm>;
}
