import React from "react";
import logo from "../images/logo.png";
import logoSmall from "../images/logo_small.png";
import buttonEditSmall from "../images/button_edit_small.png";
import buttonEdit from "../images/button_edit.png";
import buttonAddLarge from "../images/button_add_large.png";
import buttonAdd from "../images/button_add.png";
import buttonUpdateAvatar from "../images/button_update_avatar.svg";

function Header({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  userAvatar,
  userName,
  userDescription,
}) {
  return (
    <header className="header">
      <picture>
        <source media="(max-width: 768px)" srcSet={logoSmall} />
        <img src={logo} alt="Logo Around The U.S." className="header__logo" />
      </picture>
      <div className="header__line"></div>
      <div className="header__profile">
        <div className="header__item">
          <div className="header__avatar-edit">
            <picture>
              <img
                src={userAvatar}
                alt="Imagem do Avatar"
                className="header__avatar"
                id="header__avatar"
                style={{ backgroundImage: `url(${userAvatar})` }}
              />
            </picture>
            <picture>
              <img
                src={buttonUpdateAvatar}
                alt="Imagem do button editar avatar"
                className="button-avatar-edit"
                id="button-avatar-edit"
                onClick={onEditAvatarClick}
              />
            </picture>
          </div>
          <div className="header__briefing">
            <h1 className="header__title">{userName}</h1>
            <h2 className="header__subtitle">{userDescription}</h2>
            <picture>
              <source media="(max-width: 768px)" srcSet={buttonEditSmall} />
              <img
                className="button-edit"
                src={buttonEdit}
                alt="Imagem do button editar"
                id="button-edit"
                onClick={onEditProfileClick}
              />
            </picture>
          </div>
        </div>
        <picture>
          <source media="(max-width: 768px)" srcSet={buttonAddLarge} />
          <img
            src={buttonAdd}
            alt="Imagem de button adicionar"
            className="button-add"
            id="button-add"
            onClick={onAddPlaceClick}
          />
        </picture>
      </div>
    </header>
  );
}

export default Header;
