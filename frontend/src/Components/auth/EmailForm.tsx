import { useEffect } from "react";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useForm } from "../../hooks/useForm";
import "../../styles/pages/auth/ResetPassword.css";
import { forgotPassword } from "../../services/authService";

interface EmailFormProps {
  setOtpSent: (sent: boolean) => void;
  setError: (error: string) => void;
  setEmail: (email: string) => void;
}

/**
 * **EmailForm Component**
 * - Handles sending OTP to the user's email for password reset.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setOtpSent - Function to update OTP sent status.
 * @param {Function} props.setError - Function to update error messages.
 * @param {Function} props.setEmail - Function to update email state.
 */
const EmailForm: React.FC<EmailFormProps> = ({ setOtpSent, setError, setEmail }) => {
  const { form, handleChange, handleSubmit, loading, error } = useForm({ email: '' }, async () => {
    const response = await forgotPassword(email);
    setEmail(email)
    toast.success(response);
    setOtpSent(true);
  });
  const { email } = form

  useEffect(() => {
    setError(error)
  }, [error])


  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <div className="input-group">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <button type="submit" className="submitBtn" disabled={loading}>
        {loading && <div className="loading"></div>}Send OTP
      </button>
    </form>
  );
};

export default EmailForm;
