import { useEffect, useContext } from "react";
import api from "../utils/api.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  setCards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button
            onClick={onEditAvatar}
            className="profile__edit-avatar-button"
            aria-label="Редактировать аватар"
            type="button"
          />
          <img
            className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="Аватар"
          />
        </div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button
          className="profile__edit-button"
          onClick={onEditProfile}
          aria-label="Редактировать информацию профиля"
          type="button"
        />
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Add"
          type="button"
        />
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map((card) => (
            <Card
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
