import axios from "axios";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBlack from "../components/InputBlack";

const Login = memo(() => {
  const login = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [isLinkTo, setIsLinkTo] = useState(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const navigate = useNavigate();

  const routeChange = useCallback(() => {
    let path = `/contacts`;
    navigate(path);
  }, [navigate]);

  const getData = useCallback(
    async (
      login: HTMLInputElement | null,
      password: HTMLInputElement | null
    ) => {
      if (login && login.value && password && password.value) {
        axios
          .get(`http://localhost:3004/users?login=${login.value}`)
          .then((data) => {
            if (data.data[0].password === password.value) {
              console.log("Succes");
              setIsLinkTo(true);
              window.localStorage.setItem(
                "#contact",
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
              );
              routeChange();
            } else {
              setUserNotFound(true);
              setIsLinkTo(false);
            }
          })
          .catch(() => setUserNotFound(true));
      }
    },
    [routeChange]
  );

  useEffect(() => {
    localStorage.removeItem("#contact");
  }, []);

  return (
    <LoginWrapper>
      <img src="/img/loginPIC.svg" alt="img" />
      <LoginForm>
        <LoginH1>Login</LoginH1>
        <InputBlack placeholder="Login" ref={login} />
        <InputBlack
          placeholder="Password"
          style={{ marginTop: 12 }}
          ref={password}
        />
        {userNotFound && (
          <LoginUserNotFoundText>
            Неверный логин или пароль
          </LoginUserNotFoundText>
        )}

        <Link to={isLinkTo ? "/contacts" : "/"}>
          <LoginButton
            type="submit"
            onClick={() => getData(login.current, password.current)}
          >
            Let's go
          </LoginButton>
        </Link>
      </LoginForm>
    </LoginWrapper>
  );
});

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -20px;
`;

const LoginH1 = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  margin-top: 37px;
  margin-bottom: 17px;
`;

const LoginButton = styled.button`
  padding: 11px 36px;
  background-color: #0f0f0f;
  border: none;
  border-radius: 7px;
  margin-top: 56px;
  color: #fffbfb;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  transition: all 3s ease;
  cursor: pointer;

  &:hover {
    background-color: #fffbfb;
    color: #0f0f0f;
    outline: 0.5px solid #0f0f0f;
    transition: all 1s ease;
  }
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LoginUserNotFoundText = styled.p`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  margin-top: 20px;
  color: #ee2525;
`;
