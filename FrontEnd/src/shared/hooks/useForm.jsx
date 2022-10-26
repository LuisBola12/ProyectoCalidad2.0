import { useState, useEffect } from 'react';

export const useForm = (onSubmit, validate) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit();
    }

  }, [errors, onSubmit, isSubmitting]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(formValues));
    setIsSubmitting(true);

  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  return {
    formValues,
    handleInputChange,
    handleSubmit,
    setIsSubmitting,
    setFormValues,
    errors,
    setErrors
  };
};
export default useForm;