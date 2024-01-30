import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import makeToast from "../../toaster";
import { resetState, resetLoggedInFlag } from "../../redux/userRedux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, error, currentUser, errorMessage, loggedFlag } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser && loggedFlag) {
      makeToast("success", "Login Sucessful!");
      dispatch(resetLoggedInFlag());
      navigate("/");
    }
    if (error) {
      makeToast("error", errorMessage);
      dispatch(resetState());
    }
  }, [isFetching, error, currentUser, loggedFlag]);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });

  }
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <input style={{ marginBottom: 20, padding: 10 }}
        type="text"
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
      />
      <input style={{ marginBottom: 20, padding: 10 }}
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>Login</button>
    </div>
  )
}

export default Login
