import { useState } from "react";

export const useForm = <T extends Record<string, any>>(values: T, onSubmit: () => Promise<void> | void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<T>(values);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { type, name, value, checked } = event.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: { ...(prev[name] as any), [value]: checked },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value as any }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true);
      setError("");
      await onSubmit();
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit, setForm, error };
};
