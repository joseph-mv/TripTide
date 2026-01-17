import { useState } from "react";

export const useForm = (values, onSubmit) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(values);

  const handleChange = (event) => {
    setError("");
    const { type, name, value, checked } = event.target;
    if (type === "checkbox") {
      setForm({
        ...form,
        [name]: { ...form[name], [value]: checked },
      });
    } else {
      setForm({ ...form, [name]: value});
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      setError("");
      await onSubmit();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit, setForm, error };
};
