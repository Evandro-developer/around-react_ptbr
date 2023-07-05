import React, { useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { globalValidationConfig } from "./globalValidationConfig";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const nameTouched = false;
  const aboutTouched = false;
  const name = "";
  const about = "";

  const { name: nameConfig, about: aboutConfig } = globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    about: aboutConfig,
  };

  const currentUser = useContext(CurrentUserContext);

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
  } = FormValidator(validationConfig, { name, about });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData((prevFormData) => ({
      name: prevFormData.name ?? currentUser?.name,
      about: prevFormData.about ?? currentUser?.about,
    }));
    setValidity({});
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return;
    }
    onUpdateUser({ name: formData.name, about: formData.about });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      onSubmit={handleSubmit}
      title="Editar Perfil"
      name="popup"
      formClassName="popup__form"
    >
      <label className="popup__field">
        <input
          type="text"
          name="name"
          className={`popup__input ${
            !validity.name ? "popup__input_type_error" : ""
          } ${inputActive.name ? "popup__input_active" : ""}`}
          id="popup-input-type-name"
          required
          minLength="2"
          maxLength="40"
          placeholder={currentUser?.name}
          value={formData.name}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("name")}
          onBlur={() => handleInputBlur("name")}
        />
        {!validity.name &&
          (inputActive.name || (nameTouched && !formData.name)) && (
            <span
              className={`popup__input-error popup-input-type-name-error ${
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
          type="text"
          name="about"
          className={`popup__input ${
            !validity.about ? "popup__input_type_error" : ""
          } ${inputActive.about ? "popup__input_active" : ""}`}
          id="popup-input-type-job"
          required
          minLength="2"
          maxLength="200"
          placeholder={currentUser?.about}
          value={formData.about}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("about")}
          onBlur={() => handleInputBlur("about")}
        />
        {!validity.about &&
          (inputActive.about || (aboutTouched && !formData.about)) && (
            <span
              className={`popup__input-error popup-input-type-job-error ${
                !validity.about ? "popup__error_visible" : ""
              }`}
            >
              {!formData.about
                ? validationConfig.about.errorMessage
                : validationMessage.about}
            </span>
          )}
      </label>
      <SubmitButton
        type="submit"
        className={`popup__button ${
          !isFormValid() ? "popup__button_disabled" : ""
        }`}
        id="popup__button"
        disabled={!isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
