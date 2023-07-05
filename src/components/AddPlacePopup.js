import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";
import { globalValidationConfig } from "./globalValidationConfig";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameTouched = false;
  const linkTouched = false;
  const name = "";
  const link = "";
  const { name: nameConfig, link: linkConfig } = globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    link: linkConfig,
  };

  const {
    formData,
    setFormData,
    validity,
    setValidity,
    validationMessage,
    inputActive,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    isFormValid,
  } = FormValidator(validationConfig, { name, link });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({ name: "", link: "" });
    setValidity({});
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    onAddPlace({
      name: formData.name,
      link: formData.link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      onSubmit={handleSubmit}
      title="Novo Local"
      name="popup_card-add"
      formClassName="popup__form_card-add"
    >
      <label className="popup__field">
        <input
          type="text"
          className={`popup__input ${
            !validity.name ? "popup__input_type_error" : ""
          } ${inputActive.name ? "popup__input_active" : ""}`}
          id="popup-input-type-place"
          required
          minLength="2"
          maxLength="30"
          placeholder="Insira o nome do Novo Local"
          value={formData.name}
          name="name"
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("name")}
          onBlur={() => handleInputBlur("name")}
        />
        {!validity.name &&
          (inputActive.name || (nameTouched && !formData.name)) && (
            <span
              className={`popup__input-error popup-input-type-place-error ${
                !validity.name ? "popup__error_visible" : ""
              }`}
            >
              {!formData.name
                ? validationConfig.name.errorMessage
                : validationMessage.name}
            </span>
          )}
      </label>
      <label className="popup__field">
        <input
          type="url"
          className={`popup__input ${
            !validity.link ? "popup__input_type_error" : ""
          } ${inputActive.link ? "popup__input_active" : ""}`}
          id="popup-input-type-img-link"
          required
          pattern="https?://.+"
          placeholder="Insira o URL da Imagem"
          value={formData.link}
          name="link"
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("link")}
          onBlur={() => handleInputBlur("link")}
        />
        {!validity.link &&
          (inputActive.link || (linkTouched && !formData.link)) && (
            <span
              className={`popup__input-error popup-input-type-img-link-error ${
                !validity.link ? "popup__error_visible" : ""
              }`}
            >
              {!formData.link
                ? validationConfig.link.errorMessage
                : validationMessage.link}
            </span>
          )}
      </label>
      <SubmitButton
        type="submit"
        className={`popup__button popup__button_card-add ${
          !isFormValid() ? "popup__button_disabled" : ""
        }`}
        id="popup__button_card-add"
        disabled={!isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
