import { useState } from "react";
import { authApi } from "../api/http";
import "./Login.css";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const payload =
        mode === "signup"
          ? form
          : { email: form.email, password: form.password };
      const response =
        mode === "signup" ? await authApi.signup(payload) : await authApi.login(payload);

      localStorage.setItem("token", response.data.token);
      setMessage(`${mode === "signup" ? "Signup" : "Login"} successful.`);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">ACCOUNT</span>
        <h1>{mode === "signup" ? "Create account" : "Login"}</h1>
        
        <form className="form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                name="name" 
                type="text"
                value={form.name} 
                onChange={handleChange} 
                placeholder="Enter your name"
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              // placeholder="••••••••"
              required
            />
          </div>
          
          {error && <p className="form__error">{error}</p>}
          {message && <p className="form__success">{message}</p>}
          
          <button type="submit" className="btn btn--primary btn--full" disabled={isLoading}>
            {isLoading ? "Please wait..." : mode === "signup" ? "Sign up" : "Login"}
          </button>
        </form>
        
        <p className="auth-card__switch-text">
          {mode === "login" ? "Need an account? " : "Already have an account? "}
          <button
            type="button"
            className="auth-card__switch-btn"
            onClick={() => {
              setMode((value) => (value === "login" ? "signup" : "login"));
              setError("");
              setMessage("");
            }}
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Login;
