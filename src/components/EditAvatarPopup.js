import React, { createRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";
import { globalValidationConfig } from "./globalValidationConfig";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarTouched = false;
  const inputRef = createRef();
  const { avatar: avatarConfig } = globalValidationConfig;
  const validationConfig = {
    avatar: avatarConfig,
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
  } = FormValidator(validationConfig, { avatar: "" });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({ avatar: "" });
    setValidity({});
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return;
    }
    onUpdateAvatar({
      avatar: formData.avatar,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      onSubmit={handleSubmit}
      title="Alterar a foto do perfil"
      name="popup_avatar-edit"
      formClassName="popup__form_avatar-edit"
    >
      <label className="popup__field">
        <input
          name="avatar"
          type="url"
          ref={inputRef}
          className={`popup__input ${
            !validity.avatar ? "popup__input_type_error" : ""
          } ${inputActive.avatar ? "popup__input_active" : ""}`}
          id="popup-input-type-avatar-img-link"
          required
          pattern="https?://.+"
          placeholder="Insira o URL do Avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("avatar")}
          onBlur={() => handleInputBlur("avatar")}
        />
        {!validity.avatar &&
          (inputActive.avatar || (avatarTouched && !formData.avatar)) && (
            <span
              className={`popup__input-error popup-input-type-avatar-img-link-error ${
                !validity.avatar ? "popup__error_visible" : ""
              }`}
            >
              {!formData.avatar
                ? validationConfig.avatar.errorMessage
                : validationMessage.avatar}
            </span>
          )}
      </label>
      <SubmitButton
        type="submit"
        className={`popup__button popup__button_avatar-edit ${
          !isFormValid() ? "popup__button_disabled" : ""
        }`}
        id="popup__button_avatar-edit"
        disabled={!isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
