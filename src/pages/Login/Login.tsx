import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonItemGroup,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AppContext } from "store/Core";
import { userActionType } from "store/reducers/UserReducer";
import "./Login.css";
import hasLoggedIn from "utilities/auth";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const redirectPathAfterLogin = "/page/tab1";

  useEffect(() => {
    if(hasLoggedIn(state)) {
      history.push(redirectPathAfterLogin);
    }
  }, [])

  function handleInput(e: any) {
    let value = e.detail.value;
    const type = e.target.name;

    const obj: any = {...loginData};
    obj[type] = value;

    setLoginData(obj);
  }

  function submitLogin() {
    dispatch({type: userActionType.setAuthToken, value: "abcdef"});
    history.push(redirectPathAfterLogin);
  }

  return (
    <div className="container">
      <strong>Login</strong>
      <br/>
      <IonItemGroup>
        <IonItem>
          <IonLabel>Username</IonLabel>
          <IonInput value={loginData.username} name="username"  onIonChange={e => handleInput(e)}/>
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput value={loginData.password} name="password" type="password" onIonChange={e => handleInput(e)}/>
        </IonItem>
      </IonItemGroup>
      <IonButton color="primary" onClick={() => submitLogin()}>Login</IonButton>
    </div>
  )
}

export default Login;