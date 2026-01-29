import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../styles/pages/Contact.css";
import { contact } from "../services/userService";
import { useForm } from "../hooks/useForm";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 *  ContactPage with form submission
 */
const ContactPage = () => {
  const initialValues: ContactFormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const onSubmit = async () => {
    try {
      const response = await contact(form);
      toast.success(response);
      // Reset form after successful submission
      setForm(initialValues);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error; // Re-throw to let useForm handle the error state
    }
  };

  const { form, loading, handleChange, handleSubmit, setForm } = useForm<ContactFormData>(
    initialValues,
    onSubmit
  );

  return (
    <div className="contact-section">
      <h1>Contact Us</h1>

      <section className="contact-info">
        <p>
          I'd love to hear from you! Whether you have a question about features
          or anything else, I am ready to answer all your questions.
        </p>
      </section>
      <div className="map-form-container">
        {/* Map section */}
        <section className="contact-map">
          {/* <h2>Our Location</h2> */}
          <div className="map-container">
            <div className="contact-details">
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <span>
                  {" "}
                  <strong>Location:</strong>Kozhikode, Kerala, India
                </span>
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <span>
                  {" "}
                  <strong>Email:</strong> triptide43@gmail.com
                </span>
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62609.457839145005!2d75.77581310478513!3d11.254707468088784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726836806543!5m2!1sen!2sin"
              width="600"
              height="450"
              loading="lazy"
              title="Our Location"
            ></iframe>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Enter your message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
