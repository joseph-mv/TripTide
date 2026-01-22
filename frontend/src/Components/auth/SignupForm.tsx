import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../styles/pages/auth/Authentication.css";
import { signupUser } from "../../services/authService";
import { useForm } from "../../hooks/useForm";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

interface SignupFormProps {
  toggleAuthView: () => void;
}


const SignupForm: React.FC<SignupFormProps> = ({ toggleAuthView }) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { form, handleChange, handleSubmit, error, loading } = useForm(initialForm, async () => {
    const { name, email, password, confirmPassword } = form;
    if (password !== confirmPassword) return
    const response = await signupUser(name, email, password);
    if (response) toast.success(response);
  })

  const { name, email, password, confirmPassword } = form;

  console.log({ error })

  return (
    <div className="col align-items-center flex-col sign-up">
      <div className="form-wrapper align-items-center">
        <div className="form sign-up">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="input-group">
              <i className="bx bxs-user"></i>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <i className="bx bx-mail-send"></i>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                minLength={6}
                required
              />
              {password && (
                <button
                  className="showHideBtn"
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <i
                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </button>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input
                name="confirmPassword"
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
              {confirmPassword && (
                <button
                  className="showHideBtn"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={
                      showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </button>
              )}
            </div>

            {/* Error Message */}
            {password !== confirmPassword && <p className="error">"Passwords do not match"</p>}
            {error && <p className="error">{error}</p>}

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading && <div className="loading"></div>} Sign Up
            </button>

            {/* Sign-In Link */}
            <p>
              <span>Already have an account?</span>{" "}
              <b onClick={toggleAuthView} className="pointer">
                Sign in here
              </b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
