import React from "react";

import PopupWithForm from "./PopupWithForm";
import SubmitButton from "./SubmitButton";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  const handleSubmit = () => {
    onConfirm();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Tem certeza?"
      name="popup_with-confirmation"
      formClassName="popup__form_with-confirmation"
    >
      <SubmitButton
        type="submit"
        className="popup__button popup__button_with-confirmation"
        id="popup__button_with-confirmation"
      >
        Sim
      </SubmitButton>
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
