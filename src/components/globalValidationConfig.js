export const globalValidationConfig = {
  avatar: {
    required: true,
    errorMessage: "Avatar é requerido",
    pattern: /^https?:\/\/.+$/,
    patternErrorMessage: "Link deve começar com 'http://' ou 'https://'",
  },
  name: {
    required: true,
    errorMessage: "Nome é requerido",
    minLength: 2,
    minLengthErrorMessage: "Nome deve ter pelo menos 2 caracteres",
    maxLength: 40,
    maxLengthErrorMessage: "Nome deve ter no máximo 40 caracteres",
  },
  about: {
    required: true,
    errorMessage: "Descrição é requerida",
    minLength: 2,
    minLengthErrorMessage: "Descrição deve ter pelo menos 2 caracteres",
    maxLength: 200,
    maxLengthErrorMessage: "Descrição deve ter no máximo 200 caracteres",
  },
  link: {
    required: true,
    errorMessage: "Link é requerido",
    pattern: /^https?:\/\/.+$/,
    patternErrorMessage: "Link deve começar com 'http://' ou 'https://'",
  },
};
