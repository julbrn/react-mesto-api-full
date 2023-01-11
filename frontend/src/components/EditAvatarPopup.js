import {useContext, useEffect, useRef} from 'react';
import Input from "./Input";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, loadingText}) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <Popup
            popupModifier="edit-avatar"
            containerModifier="edit-avatar"
            isOpen={isOpen}
            onClose={onClose}
        >
    <PopupWithForm
    popupModifier="edit-avatar"
    title='Обновить аватар'
    buttonText='Сохранить'
    onSubmit={handleSubmit}
    isLoading={isLoading}
    loadingText={loadingText}>
    <Input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatarLink"
        id="avatarUrl-input"
        avatarRef={avatarRef}
    />
</PopupWithForm>
        </Popup>)
}

export default EditAvatarPopup;