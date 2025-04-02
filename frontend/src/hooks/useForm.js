import { useState } from "react";
import { toast } from "react-toastify";

export const useForm = (values, onSubmit) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(values);

  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;

    if (type === "number") {
      setForm({ ...form, [name]: Math.abs(value) });
    } else if (name === "activities") {
      setForm({
        ...form,
        [name]: { ...form[name], [value.toLowerCase()]: checked },
      });
    } else {
      setForm({ ...form, [name]: { ...form[name], [value]: checked } });
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } catch (error) {
      console.error("Error filtering destinations", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleChange, handleSubmit, setForm };
};
