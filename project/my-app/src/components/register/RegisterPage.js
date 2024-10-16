import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import useRecaptchaV3 from "../captcha/Captcha"; 
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import "./style/RegisterForm.css"; 

const RegisterForm = () => {
  const navigate = useNavigate(); 
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Initialize reCAPTCHA
  const executeRecaptcha = useRecaptchaV3('6Lc_A2EqAAAAANr-GXLMhgjBdRYWKpZ1y-YwF7Mk', 'register');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 

    // Validate that the passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Execute reCAPTCHA to get the token
      const recaptchaToken = await executeRecaptcha('register');

      // Combine form data and reCAPTCHA token
      const data = {
        ...formData,
        token: recaptchaToken
      };

      // Send the form data to the API
      await axios.post('http://localhost:3000/api/register', data);

      alert('User registered successfully');
      setIsSubmitted(true); 
    } catch (error) {
      console.log("Error registering:", error);
      setError("Error registering user. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  if (isSubmitted) {
    return (
      <div className="confirmation-container">
        <h1>Registration Successful!</h1>
        <p>Welcome, {formData.name}! Your account has been successfully created.</p>
        <p>You can now <a href="/login">log in</a> to access your dashboard and start managing your energy consumption.</p>
        <p>Thank you for joining us!</p>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-left-panel">
        <h1>Create your account!</h1>
        <p>
          Register to access your personal dashboard and real-time monitoring of your solar yield and battery status.
        </p>
        <p>Fill in the details to start optimizing your energy management.</p>
      </div>
      <div className="register-right-panel">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="First and last name *"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password *"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number *"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location *"
            value={formData.location}
            onChange={handleChange}
            className="register-input"
            required
          />
          <div className="register-checkbox-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              By signing up, I agree with the <a href="/">Terms of Use</a> &amp;
              <a href="/">Privacy Policy</a>.
            </label>
          </div>
          <button type="submit" className="register-submit-button" disabled={loading}>
            {loading ? "Registering..." : "Sign up"}
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>

          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="register-login-prompt">
          Have an account? <a href="/login">Log in here!</a>
        </p>
        <div className="register-or-divider">
          <span>OR</span>
        </div>
        <div className="register-social-login">
          <button className="register-social-button facebook">f</button>
          <button className="register-social-button google">G</button>
          <button className="register-social-button apple"></button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
