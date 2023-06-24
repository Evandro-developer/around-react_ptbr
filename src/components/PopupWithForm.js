import React from "react";
import closeIconSmall from "../images/close_icon_small.png";
import closeIcon from "../images/close_icon.png";

function PopupWithForm({
  title,
  name,
  isOpen,
  children,
  formClassName,
  closeAllPopups,
}) {
  const popupOpenedClass = isOpen ? `${name}__opened` : "";

  if (!isOpen) {
    return null;
  }

  return (
    <section className={`${name} ${popupOpenedClass}`} id={name}>
      <form
        className={`popup__form  ${formClassName}`}
        id={formClassName}
        noValidate
      >
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt="Imagem do ícone de fechamento da janela do popup"
            className={`popup__closed-btn`}
            id={`${name}__closed-btn`}
            onClick={closeAllPopups}
          />
        </picture>
        <h2 className="popup__heading">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
