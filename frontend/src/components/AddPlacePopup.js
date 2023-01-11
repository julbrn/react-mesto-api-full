import {useState, useEffect} from 'react';
import Input from "./Input";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace, isLoading, loadingText}) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    function handleCardTitle(event) {
        setTitle(event.target.value)
    }

    function handleCardLink(event) {
        setLink(event.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: title,
            link: link
        })
    }

    useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen])

    return (
        <Popup
            popupModifier="add-card"
            containerModifier="add-card"
            isOpen={isOpen}
            onClose={onClose}
        >
        <PopupWithForm
        popupModifier='add-card'
        title='Новое место'
        buttonText='Создать'
        onSubmit={handleSubmit}
        isLoading={isLoading}
        loadingText={loadingText}>
        <Input
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            name="name"
            id="placeName-input"
            onChange={handleCardTitle}
            value={title}
        />
        <Input
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            id="placeUrl-input"
            onChange={handleCardLink}
            value={link}
        />
    </PopupWithForm>
        </Popup>)
}
export default AddPlacePopup