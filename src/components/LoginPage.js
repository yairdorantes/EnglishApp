import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { helpHttp } from "../helpers/helpHttp";
let url = "http://127.0.0.1:8000/api/users/";
var md5 = require("md5");

const initialForm = {
  name: "",
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [db, setDb] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [registered, setRegistered] = useState(false);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    // data.id = Date.now();

    helpHttp()
      .post(url, options)
      .then((res) => {
        console.log(res);

        if (!res.err) {
          setDb([...db, res]);
          //   setLoading(false);
        } else {
          console.log(res);
          // setError(res);
        }
      });
  };

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
    } else {
      setRegistered(true);

      navigate("/menu");
    }
    setForm((form["password"] = md5(form["password"])));
    createData(form);
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
