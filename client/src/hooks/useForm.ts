import { useEffect, useState } from 'react';

export const useForm = <T extends object>(
  initialValues: T,
  onSubmit: (formData: T) => Promise<void>
) => {
  const [formData, setFormData] = useState<T>(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [JSON.stringify(initialValues)]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return { formData, changeHandler, setField, submitHandler };
};