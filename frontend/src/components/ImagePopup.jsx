import React from 'react';

export default function ImagePopup({card, onClose}) {
    return (
        <div className ={`popup popup_type_picture ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_picture">
                <figure className="popup__image-container">
                    <img alt={card?.name} className="popup__image" src={card?.link}/>
                    <figcaption className="popup__image-caption"></figcaption>
                </figure>
                <button className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}
