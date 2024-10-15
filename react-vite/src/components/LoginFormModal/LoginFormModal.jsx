import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../modal.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/')
    }
  };

  const loginDemo = async () => {
    await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password'
      })
    );

    closeModal();
    navigate('/')
  }

  return (
    <>
      <h1 className="modal-title primary center">Log In</h1>
      <form className='modal-form' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        {errors.password && <p>{errors.password}</p>}
        <button className="dark" type="submit">Log In</button>
        <a className='login-demo center' onClick={loginDemo}>Log In as Demo User</a>
      </form>
    </>
  );
}

export default LoginFormModal;
