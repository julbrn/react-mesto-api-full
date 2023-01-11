import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from "react";

function Card({card, name, link, likes, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;
    function handleClick() {
        onCardClick(card);
    };
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
            <li className="card">
                <img src={link} onClick={handleClick} className="card__photo" alt="{name}"/>
                <div className="card__info-container">
                    <h2 className="card__title">{name}</h2>
                    <div className="card__like-container">
                        <button
                            onClick={handleLikeClick}
                            type="button"
                            className={cardLikeButtonClassName}
                            aria-label="like"
                        />
                        <p className="card__like-counter">{likes}</p>
                    </div>
                    <button className={cardDeleteButtonClassName} aria-label="delete" onClick={handleCardDelete}/>
                </div>
            </li>
    );
}

export default Card;