import { useState, ChangeEvent } from 'react';

/**
 * Хук для работы с формой
 * @param inputValues
 * @returns
 */
export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange,
    setValues,
    reset: () => setValues(inputValues)
  };
}
