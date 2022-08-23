import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

const LoginPage = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please enter your email and password");
      return;
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <>
      <div className="login-form">
        <div className="login-container">
          <form className="form">
            <input
              onChange={handleChange}
              className="parrafo"
              name="name"
              placeholder="Name"
              type="text"
              value={form.name}
            />
            <input
              onChange={handleChange}
              className="parrafo"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
            />

            <input
              onChange={handleChange}
              className="parrafo"
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
            />
            <div className="btn-register">
              <button onClick={handleSubmit} type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
