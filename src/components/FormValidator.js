import React, { useState, useEffect } from "react";

function FormValidator(validationConfig, initialData = {}) {
  const [formData, setFormData] = useState(initialData);
  const [_, setErrors] = useState({});
  const [validity, setValidity] = useState({});
  const [validationMessage, setValidationMessage] = useState({});
  const [inputActive, setInputActive] = useState({});

  const handleInputFocus = (field) => {
    setInputActive((prevInputActive) => ({
      ...prevInputActive,
      [field]: true,
    }));
  };

  const handleInputBlur = (field) => {
    setInputActive((prevInputActive) => ({
      ...prevInputActive,
      [field]: false,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorResults = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorResults.errors,
    }));
    setValidity((prevValidity) => ({
      ...prevValidity,
      [name]: errorResults.validity,
    }));
    setValidationMessage((prevValidationMessage) => ({
      ...prevValidationMessage,
      [name]: errorResults.validationMessage,
    }));
  };

  useEffect(() => {
    const errorResults = validateForm(formData);
    setErrors(errorResults.errors);
    setValidity(errorResults.validity);
    setValidationMessage(errorResults.validationMessage);
  }, [formData]);

  const validateField = (fieldName, fieldValue) => {
    const fieldConfig = validationConfig[fieldName];

    if (!fieldConfig) {
      throw new Error(`No validation config for field: ${fieldName}`);
    }
    let errors = "";
    let validity = true;
    let validationMessage = "";

    if (fieldConfig.required && !fieldValue) {
      errors = fieldConfig.errorMessage;
      validity = false;
      validationMessage = fieldConfig.errorMessage;
    }

    if (fieldConfig.minLength && fieldValue?.length < fieldConfig.minLength) {
      errors = fieldConfig.minLengthErrorMessage.replace(
        "{minLength}",
        fieldConfig.minLength
      );
      validity = false;
      validationMessage = errors;
    }

    if (fieldConfig.maxLength && fieldValue?.length > fieldConfig.maxLength) {
      errors = fieldConfig.maxLengthErrorMessage.replace(
        "{maxLength}",
        fieldConfig.maxLength
      );
      validity = false;
      validationMessage = errors;
    }

    if (
      fieldConfig.pattern &&
      fieldValue &&
      !fieldConfig.pattern.test(fieldValue)
    ) {
      errors = fieldConfig.patternErrorMessage;
      validity = false;
      validationMessage = errors;
    }

    if (!errors) {
      validity = true;
      validationMessage = "";
    }

    return {
      errors,
      validity,
      validationMessage,
    };
  };

  const validateForm = (data) => {
    const newErrors = {};
    const newValidity = {};
    const newValidationMessage = {};

    for (const field in validationConfig) {
      if (validationConfig.hasOwnProperty(field)) {
        const errorResults = validateField(field, data[field]);
        newErrors[field] = errorResults.errors;
        newValidity[field] = errorResults.validity;
        newValidationMessage[field] = errorResults.validationMessage;
      }
    }

    return {
      errors: newErrors,
      validity: newValidity,
      validationMessage: newValidationMessage,
    };
  };

  const isFormValid = () => {
    for (const field in validity) {
      if (!validity[field]) {
        return false;
      }
    }
    return true;
  };

  return {
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
  };
}

export default FormValidator;
