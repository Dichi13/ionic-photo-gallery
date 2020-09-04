import React, { useContext, useEffect, useState } from "react";
import {
  IonButton, IonInput, IonItem, IonLabel,
  IonItemGroup, useIonViewDidEnter, useIonViewDidLeave, IonAlert, IonLoading,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AppContext } from "store/Core";
import { userActionType } from "store/reducers/UserReducer";
import hasLoggedIn from "utilities/auth";
import { useBackButtonAsExit } from "hooks/useBackButtonAsExit";
import "./Login.css";
import { requestLogin } from "api/auth";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { didEnter, didLeave } = useBackButtonAsExit();
  const history = useHistory();
  const redirectPathAfterLogin = "/page/tab1";

  useIonViewDidEnter(didEnter);
  useIonViewDidLeave(didLeave);

  useEffect(() => {
    if(hasLoggedIn(state)) {
      history.push(redirectPathAfterLogin);
    }
    // eslint-disable-next-line
  }, []);

  function handleInput(e: any) {
    let value = e.detail.value;
    const type = e.target.name;

    const obj: any = {...loginData};
    obj[type] = value;

    setLoginData(obj);
  }

  async function submitLogin() {
    setShowLoading(true);
    try {
      const res = await requestLogin(loginData);
      console.log(res);
      dispatch({type: userActionType.setAuthToken, value: res.token});
      history.push(redirectPathAfterLogin);
    } catch {
      setShowAlert(true);
    }
    setShowLoading(false);
  }

  return (
    <div className="container">
      <strong>Login</strong>
      <br/>
      <IonItemGroup>
        <IonItem>
          <IonLabel>Username</IonLabel>
          <IonInput value={loginData.email} name="email"  onIonChange={e => handleInput(e)}/>
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput value={loginData.password} name="password" type="password" onIonChange={e => handleInput(e)}/>
        </IonItem>
      </IonItemGroup>
      <IonButton expand="full" color="primary" onClick={() => submitLogin()}>Login</IonButton>

      <IonLoading isOpen={showLoading}/>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Login Failed"
        message={"Please check your credential and try again."}
        buttons={['OK']}
      />
    </div>
  )
}

export default Login;