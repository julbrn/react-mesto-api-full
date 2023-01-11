import {useContext, useState, useEffect} from 'react';
import Input from "./Input";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen, currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    };

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    };

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }
    return (
        <Popup
            popupModifier="edit-profile"
            containerModifier="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
        <PopupWithForm
            popupModifier="edit-profile"
            title='Редактировать профиль'
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText={props.loadingText}>
            <Input
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                name="name"
                id="profileName-input"
                onChange={handleNameChange}
                value={name || ''}
            />
            <Input
                type="text"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                name="about"
                value={description || ''}
                id="profileInfo-input"
                onChange={handleDescriptionChange}
            />
        </PopupWithForm>
            </Popup>
    );
}

export default EditProfilePopup;