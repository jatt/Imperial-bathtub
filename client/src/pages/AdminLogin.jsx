import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ADMIN_EMAIL = "imperial@gmail.com";
const ADMIN_PASSWORD = "Imperial$Beast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin-panel");
      return;
    }

    setError("Invalid admin credentials.");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">ADMIN ACCESS</span>
        <h1>Admin Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <p className="form__error">{error}</p>}

          <button type="submit" className="btn btn--primary btn--full">
            Login to Admin Panel
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
