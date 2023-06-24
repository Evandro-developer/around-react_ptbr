import React from "react";
import PopupWithForm from "./PopupWithForm";

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isAddConfirmationPopupOpen,
  closeAllPopups,
}) {
  return (
    <main>
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
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
    </main>
  );
}

export default Main;
