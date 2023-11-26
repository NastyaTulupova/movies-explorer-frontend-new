import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === "email") {
      if (!isEmail(target.value)) {
        target.setCustomValidity("Некорректный формат email");
      } else {
        target.setCustomValidity("");
      }
    }

    if (name === "name") {
      if (target.validationMessage === "Введите данные в указанном формате.") {
        target.setCustomValidity(
          "Поле Имя может содержать только латиницу, кириллицу, пробел или дефис"
        );
      } else {
        target.setCustomValidity("");
      }
    }

    if (name === "title") {
        if (target.validationMessage === "Заполните это поле.") {
            target.setCustomValidity("Нужно ввести ключевое слово");
        } else {
            target.setCustomValidity("");
          }
    }

    const isValid = target.closest("form").checkValidity();
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(isValid);
  };

  const reset = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    handleChange,
    isValid,
    reset,
  };
}

export default useValidation;
