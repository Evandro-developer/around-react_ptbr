import React, { useState } from "react";
import trashIcon from "../images/trash_icon.svg";
import heartIconDisabled from "../images/heart_icon_disabled.png";
import heartIconEnabled from "../images/heart_icon_enabled.png";

function Card({ card, onCardImageClick, onCardTrashClick }) {
  const { name, link } = card;
  const [heartIcon, setHeartIcon] = useState(heartIconDisabled);

  const handleCardImageClick = () => {
    onCardImageClick(card);
  };

  const handleCardTrashClick = () => {
    onCardTrashClick(card);
  };

  const toggleCardLike = () => {
    setHeartIcon(
      heartIcon === heartIconDisabled ? heartIconEnabled : heartIconDisabled
    );
  };

  return (
    <ul className="card">
      <picture>
        <img
          src={trashIcon}
          alt="Icone de remoção para lixeira"
          className="button-trash-icon"
          id="button-trash-icon"
          onClick={handleCardTrashClick}
        />
      </picture>
      <picture>
        <img
          src={link}
          alt="Imagem do local"
          className="card__image"
          onClick={handleCardImageClick}
        />
      </picture>
      <li className="card__briefing">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <picture>
            <img
              src={heartIcon}
              alt="#"
              className={`button-heart-icon ${
                heartIcon === heartIconEnabled
                  ? "button-heart-icon__active"
                  : ""
              }`}
              id="button-heart-icon"
              onClick={toggleCardLike}
            />
          </picture>
          <p className="card__likes">0</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
