import { useState } from 'react';

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  onSubmit: (formData: T) => Promise<void>
) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(initialValues);
  };

  return {
    formData,
    changeHandler,
    submitHandler
  };
};