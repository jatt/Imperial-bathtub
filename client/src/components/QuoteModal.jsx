import { X } from "lucide-react";
import { useState } from "react";
import { leadApi } from "../api/http";

const initialState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: ""
};

const QuoteModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await leadApi.createLead({ ...form, source: "quote-modal" });
      setStatus("success");
      setForm(initialState);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (apiError) {
      setStatus("error");
      setError(apiError.response?.data?.message || "Could not submit the form.");
    }
  };

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <button className="modal__backdrop" onClick={onClose} aria-label="Close" />
      <div className="modal__panel scale-in">
        <button className="icon-button modal__close" onClick={onClose}>
          <X size={18} />
        </button>
        <span className="eyebrow">Request a quote</span>
        <h2>Discuss your project</h2>
        <p>Share a few details and the team can guide you on the next step.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
          </div>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Name of the products
            <input name="interest" value={form.interest} onChange={handleChange} />
          </label>
          <label>
            Message/ Your Query
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="form__error">{error}</p>}
          {status === "success" && (
            <p className="form__success">Request submitted successfully.</p>
          )}
          <button className="btn btn--primary btn--full" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Send request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;