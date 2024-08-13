import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Home.css";
const Home = () => {
  const [signInErrors, setSignInErrors] = useState({});
  const [signUpErrors, setSignUpErrors] = useState({});
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const [email,setemail] = useState("")
  const navigate = useNavigate();

  const handleFocus = (e) => {
    e.target.classList.add("active");
    if (e.target.form.classList.contains("sign-in-form")) {
      setSignInErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    } else if (e.target.form.classList.contains("sign-up-form")) {
      setSignUpErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleBlur = (e) => {
    validateInput(e);
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    let errors = {};

    if (name === "password") {
      const password = value;
      const minLength = 5;
      const missingSpecialChar = !/[!@#$%^&*]/.test(password);
      const missingNumber = !/\d/.test(password);
      const missingCapitalLetter = !/[A-Z]/.test(password);
      const tooShort = password.length < minLength;

      if (tooShort) {
        errors[name] = `Password must be at least ${minLength} characters long.`;
      } else if (missingCapitalLetter) {
        errors[name] = "Password must include at least one uppercase letter.";
      } else if (missingSpecialChar) {
        errors[name] = "Password must include at least one special character.";
      } else if (missingNumber) {
        errors[name] = "Password must include at least one number.";
      }
    }

    if (e.target.form.classList.contains("sign-in-form")) {
      setSignInErrors((prev) => ({ ...prev, ...errors }));
    } else if (e.target.form.classList.contains("sign-up-form")) {
      setSignUpErrors((prev) => ({ ...prev, ...errors }));
    }
  };

  const validateForm = (form, setErrors) => {
    let errors = {};
    const inputs = form.querySelectorAll("input[required]");

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        errors[input.name] = "You need to fill this field.";
      } else if (input.name === "password") {
        const e = { target: input };
        validateInput(e);
      }
    });

    setErrors(errors);
    return errors;
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = validateForm(form, setSignInErrors);

    if (Object.keys(errors).length === 0) {
      navigate('/feed');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = validateForm(form, setSignUpErrors);

    if (Object.keys(errors).length === 0) {
      navigate('/feed');
    }
    console.log(username)
    console.log(email)
    console.log(password)
    // send to DB
    axios.post('http://localhost:2005/adduser',{
        userName:username,
        email:email,
        password:password
    })
    
  };

  const toggleSignUpMode = () => {
    document.querySelector("main").classList.toggle("sign-up-mode");
    setSignInErrors({});
    setSignUpErrors({});
  };

  const moveSlider = (index) => {
    const images = document.querySelectorAll(".image");
    const textSlider = document.querySelector(".text-group");
    const bullets = document.querySelectorAll(".bullets span");
    images.forEach((img) => img.classList.remove("show"));
    document.querySelector(`.img-${index}`).classList.add("show");
    textSlider.style.transform =` translateY(${-(index - 1) * 2.2}rem)`;
    bullets.forEach((bullet) => bullet.classList.remove("active"));
    document.querySelector(`.bullets span[data-value="${index}"]`).classList.add("active");
  };

  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form className="sign-in-form" onSubmit={handleSignInSubmit}>
              <div className="logo">
                <img
                  src="https://github.com/Neeladas03/Lynk2/blob/main/Lynk2/public/Logo1-removebg-preview1.png?raw=true"
                  alt="Lynk"
                />
                <h4>Lynk</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                <a href="#" className="toggles" onClick={toggleSignUpMode}>
                  Sign up
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    name="name"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <label>Name</label>
                  {signInErrors.name && <p className="error">{signInErrors.name}</p>}
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    minLength="5"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <label>Password</label>
                  {signInErrors.password && <p className="error">{signInErrors.password}</p>}
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />
                <p className="text">
                  Forgotten your password or your login details?
                  <Link to="/forgot-password">Get help</Link> signing in
                </p>
              </div>
            </form>

            <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
              <div className="logo">
                <img
                  src="https://github.com/Neeladas03/Lynk2/blob/main/Lynk2/public/Logo1-removebg-preview1.png?raw=true"
                  alt="Lynk"
                />
                <h4>Lynk</h4>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggles" onClick={toggleSignUpMode}>
                  Sign in
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    name="name"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setusername(e.target.value)}

                  />
                  <label>Name</label>
                  {signUpErrors.name && <p className="error">{signUpErrors.name}</p>}
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setemail(e.target.value)}

                  />
                  <label>Email</label>
                  {signUpErrors.email && <p className="error">{signUpErrors.email}</p>}
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    minLength="5"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setpassword(e.target.value)}

                  />
                  <label>Password</label>
                  {signUpErrors.password && <p className="error">{signUpErrors.password}</p>}
                </div>

                <button type="submit" className="sign-btn" >Sign Up</button>
                <p className="text1">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>
          <div className="carousel">
            <div className="images-wrapper">
              <img
                src="https://i.pinimg.com/564x/27/3f/bd/273fbd717fed922fe12dac24a5d3b71f.jpg"
                className="image img-1 show"
                alt=""
              />
              <img
                src="https://i.pinimg.com/564x/3d/43/11/3d431180c3e4c57654a1ca9b5579da5b.jpg"
                className="image img-2"
                alt=""
              />
              <img
                src="https://i.pinimg.com/564x/61/3f/bd/613fbd00f4bc24f7e608ee68cb90c2e7.jpg"
                className="image img-3"
                alt=""
              />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>Create your own stories</h2>
                  <h2>Find new friends</h2>
                  <h2>Explore many things</h2>
                </div>
              </div>

              <div className="bullets">
                <span className="active" data-value="1" onClick={() => moveSlider(1)}></span>
                <span data-value="2" onClick={() => moveSlider(2)}></span>
                <span data-value="3" onClick={() => moveSlider(3)}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
