import React, { useContext } from 'react';
import {
  IonButtons, IonContent, IonHeader, IonBackButton, IonPage, IonTitle, IonToolbar,
  IonItemDivider, IonItem, IonInput, IonLabel
} from '@ionic/react';
import './Account.css';
import {AppContext} from "store/Core";
import {userActionType} from "store/reducers/UserReducer";

const Account: React.FC = () => {
  const {state, dispatch} = useContext(AppContext);
  const {
    name,
    age,
    emailAddress
  } = state.user;

  function handleInput(e: any) {
    let value = e.detail.value;
    const type = e.target.name;

    if (type === userActionType.setAge)
      value = parseInt(value);

    dispatch({type, value});
  }

  function logOut() {
    dispatch({type: userActionType.logOut});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonButtons>
          <IonTitle>Account Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider>Personal Information</IonItemDivider>
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput value={name} name={userActionType.setName} placeholder="Enter your name" onIonChange={e => handleInput(e)}/>
        </IonItem>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonInput value={age} name={userActionType.setAge} type="number" placeholder="Enter your name" onIonChange={e => handleInput(e)}/>
        </IonItem>

        <IonItemDivider>Contact Data</IonItemDivider>
        <IonItem>
          <IonInput value={emailAddress} name={userActionType.setEmailAddress} type="email" placeholder="Enter your email address" onIonChange={e => handleInput(e)}/>
        </IonItem>
        <IonItemDivider/>
        <IonItem button onClick={() => logOut()} href="/login">
          <IonLabel color="danger">Log Out</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Account;
