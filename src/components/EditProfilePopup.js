import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";
import { globalValidationConfig } from "./globalValidationConfig";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const nameTouched = false;
  const descriptionTouched = false;
  const name = "";
  const description = "";
  const { name: nameConfig, description: descriptionConfig } =
    globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    description: descriptionConfig,
  };

  const {
    inputActive,
    handleInputFocus,
    handleInputBlur,
    formData,
    setFormData,
    handleInputChange,
    isFormValid,
    validity,
    setValidity,
    validationMessage,
  } = FormValidator(validationConfig, { name, description });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setValidity({});
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return;
    }
    onUpdateUser({ name: formData.name, about: formData.description });
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
          placeholder="Insira o nome do Usuário"
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
          name="description"
          className={`popup__input ${
            !validity.description ? "popup__input_type_error" : ""
          } ${inputActive.description ? "popup__input_active" : ""}`}
          id="popup-input-type-job"
          required
          minLength="2"
          maxLength="200"
          placeholder="Insira sua Profissão"
          value={formData.description}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("description")}
          onBlur={() => handleInputBlur("description")}
        />
        {!validity.description &&
          (inputActive.description ||
            (descriptionTouched && !formData.description)) && (
            <span
              className={`popup__input-error popup-input-type-job-error ${
                !validity.description ? "popup__error_visible" : ""
              }`}
            >
              {!formData.description
                ? validationConfig.description.errorMessage
                : validationMessage.description}
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
