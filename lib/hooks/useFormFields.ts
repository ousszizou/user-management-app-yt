/**
 * const [values, handleChange, resetFormFields] = useFormFields<T>(initialValues)
 *
 * signIn Form (email: "") [ signInProps ]
 *
 * signUp Form (email: "", password: "", username:"")
 *
 * const [values, handleChange, resetFormFields] = useFormFields<signInProps>({ email: "" })
 *
 */

import { ChangeEvent, useState } from "react";

export function useFormFields<T>(
  initialValues: T
): [T, (event: ChangeEvent<HTMLInputElement>) => void, () => void] {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetFormFields = () => setValues(initialValues);

  return [values, handleChange, resetFormFields];
}
