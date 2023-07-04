import React, { useContext, useState, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

import trashIcon from "../images/trash_icon.svg";
import heartIconDisabled from "../images/heart_icon_disabled.png";
import heartIconEnabled from "../images/heart_icon_enabled.png";

function Card({ card, onCardImageClick, onCardTrashClick, onCardLikeClick }) {
  const currentUser = useContext(CurrentUserContext);

  const { name, link } = card;

  const isOwn = card.owner._id === currentUser?._id;

  const [isLiked, setIsLiked] = useState(
    card.likes.some((i) => i._id === currentUser?._id)
  );

  const [heartIcon, setHeartIcon] = useState(
    isLiked ? heartIconEnabled : heartIconDisabled
  );

  useEffect(() => {
    setHeartIcon(isLiked ? heartIconEnabled : heartIconDisabled);
  }, [isLiked]);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onCardLikeClick(card);
  };

  const handleCardImageClick = () => {
    onCardImageClick(card);
  };

  const handleCardTrashClick = () => {
    onCardTrashClick(card);
  };

  return (
    <ul className="card">
      <picture>
        <img
          src={trashIcon}
          alt="Icone de remoção para lixeira"
          className={`button-trash-icon ${
            isOwn && "button-trash-icon__visible"
          }`}
          onClick={handleCardTrashClick}
        />
      </picture>
      <picture>
        <img
          src={link}
          alt={`Imagem do local ${name}`}
          className="card__image"
          onClick={handleCardImageClick}
        />
      </picture>
      <li className="card__briefing">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <img
            src={heartIcon}
            alt={
              isLiked
                ? "Icon de coração ativado com preenchimento"
                : "Icon de coração desativado apenas com bordas"
            }
            className={"button-heart-icon"}
            onClick={handleLikeClick}
          />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
