  import { useEffect, useState } from 'react';

  export const useForm = <T extends Record<string, string>>(
    initialValues: T,
    onSubmit: (formData: T) => Promise<void>
  ) => {
    const [formData, setFormData] = useState<T>(initialValues);

      useEffect(() => { 
        setFormData(initialValues)
      },[JSON.stringify(initialValues)])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e: React.SyntheticEvent): Promise<void> => {
      e.preventDefault();
      await onSubmit(formData);
    };

    return {
      formData,
      changeHandler,
      submitHandler
    };
  };