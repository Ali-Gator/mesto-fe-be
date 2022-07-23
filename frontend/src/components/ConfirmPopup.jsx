export default function ConfirmPopup({isOpen, onClose, onAgree}) {

    return (
        <div className={`popup popup_type_confirm${isOpen ? ' popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__heading">Вы уверены?</h2>
                <button className="popup__save-button" onClick={onAgree}>Да</button>
                <button className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}
