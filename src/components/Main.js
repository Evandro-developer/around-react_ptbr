import React from "react";
import PopupWithForm from "./PopupWithForm";
import closeIconSmall from "../images/close_icon_small.png";
import closeIcon from "../images/close_icon.png";

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isAddConfirmationPopupOpen,
  closeAllPopups,
  selectedCard,
  onClose,
}) {
  return (
    <main>
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        style={{ display: isEditProfilePopupOpen ? "block" : "hidden" }}
        closeAllPopups={closeAllPopups}
        title="Editar Perfil"
        name="popup"
        formClassName="popup__form"
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_name"
            id="popup-input-type-name"
            required
            minLength="2"
            maxLength="40"
            placeholder="Insira o nome do Usuário"
          />
          <span className="popup__input-error popup-input-type-name-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_job"
            id="popup-input-type-job"
            required
            minLength="2"
            maxLength="200"
            placeholder="Insira sua Profissão"
          />
          <span className="popup__input-error popup-input-type-job-error"></span>
        </label>
        <button type="submit" className="popup__button" id="popup__button">
          Salvar
        </button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        style={{ display: isEditAvatarPopupOpen ? "block" : "hidden" }}
        closeAllPopups={closeAllPopups}
        title="Alterar a foto do perfil"
        name="popup_avatar-edit"
        formClassName="popup__form_avatar-edit"
      >
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type_avatar-img-link"
            id="popup-input-type-avatar-img-link"
            required
            pattern="https?://.+"
            placeholder="Insira o URL do Avatar"
          />
          <span className="popup__input-error popup-input-type-avatar-img-link-error"></span>
        </label>
        <button
          type="submit"
          className="popup__button popup__button_avatar-edit"
          id="popup__button_avatar-edit"
        >
          Salvar
        </button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        style={{ display: isAddPlacePopupOpen ? "block" : "hidden" }}
        closeAllPopups={closeAllPopups}
        title="Novo Local"
        name="popup_card-add"
        formClassName="popup__form_card-add"
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_place"
            id="popup-input-type-place"
            required
            minLength="2"
            maxLength="30"
            placeholder="Insira o nome do Novo Local"
          />
          <span className="popup__input-error popup-input-type-place-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type_img-link"
            id="popup-input-type-img-link"
            required
            pattern="https?://.+"
            placeholder="Insira o URL da Imagem"
          />
          <span className="popup__input-error popup-input-type-img-link-error"></span>
        </label>
        <button
          type="submit"
          className="popup__button popup__button_card-add"
          id="popup__button_card-add"
        >
          Salvar
        </button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddConfirmationPopupOpen}
        style={{ display: isAddConfirmationPopupOpen ? "block" : "hidden" }}
        closeAllPopups={closeAllPopups}
        title="Tem certeza?"
        name="popup_with-confirmation"
        formClassName="popup__form_with-confirmation"
      >
        <button
          type="submit"
          className="popup__button popup__button_with-confirmation"
          id="popup__button_with-confirmation"
        >
          Sim
        </button>
      </PopupWithForm>

      <section
        className={`img-popup-card ${selectedCard && "img-popup-card__opened"}`}
        id="img-popup-card"
      >
        <div
          className="img-popup-card__container"
          id="img-popup-card__container"
        >
          <picture>
            <img
              type="url"
              src={selectedCard ? selectedCard.link : "#"}
              alt={selectedCard ? selectedCard.name : "#"}
              className="img-popup-card__image"
            />
          </picture>
          <h2 className="img-popup-card__title">
            {selectedCard ? selectedCard.name : ""}
          </h2>
          <picture>
            <source media="(max-width: 580px)" srcSet={closeIconSmall} />
            <img
              src={closeIcon}
              alt="Imagem do ícone de fechamento da janela do popup"
              className="img-popup-card__closed-btn"
              id="img-popup-card__closed-btn"
              onClick={onClose}
            />
          </picture>
        </div>
      </section>
    </main>
  );
}

export default Main;
