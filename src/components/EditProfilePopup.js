import React, { useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { globalValidationConfig } from "./globalValidationConfig";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const nameTouched = false;
  const aboutTouched = false;
  const name = currentUser?.name; // aqui trazemos currentUser.name ao montar o popup
  const about = currentUser?.about; // aqui trazemos currentUser.about ao montar o popup

  const { name: nameConfig, about: aboutConfig } = globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    about: aboutConfig,
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
  } = FormValidator(validationConfig, { name, about });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // impede que button submit carrege habilitado e com campos preenchidos do formulario
  // se os dados da ultima alteracao ou da Api forem carregados sem resetForm os campos serão preenchidos e o button submit será habilitado
  const resetForm = () => {
    setFormData({ name: "", about: "" }); // aqui deve ser strings vazias para limpeza dos campos do formulario
    setValidity({});
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return; // habilita button submit se o dados inseridos forem validados
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
