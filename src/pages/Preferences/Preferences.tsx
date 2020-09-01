import React, {useContext} from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemDivider, IonItem, IonRadioGroup, IonLabel, IonRadio, IonRange
} from '@ionic/react';
import './Preferences.css';
import {AppContext} from "store/Core";
import {preferencesActionType} from "store/reducers/PreferencesReducer";

const Preferences: React.FC = () => {
  const {state, dispatch} = useContext(AppContext);
  const {
    volume,
    alignment
  } = state.preferences;

  function handleInput(e: any) {
    const value = e.detail.value;
    const type = e.target.name;

    dispatch({type, value});
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
          <IonTitle>Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRadioGroup value={alignment} name={preferencesActionType.setAlignment} onIonChange={e => handleInput(e)}>
          <IonItemDivider>Alignment settings</IonItemDivider>
          <IonItem>
            <IonLabel>Front</IonLabel>
            <IonRadio slot="start" value="front" />
          </IonItem>

          <IonItem>
            <IonLabel>Center</IonLabel>
            <IonRadio slot="start" value="center" />
          </IonItem>

          <IonItem>
            <IonLabel>Back</IonLabel>
            <IonRadio slot="start" value="back" />
          </IonItem>
        </IonRadioGroup>

        <IonItemDivider>Random volume slider</IonItemDivider>
        <IonItem>
          <IonRange pin min={0} max={100} color="secondary" value={volume} name={preferencesActionType.setVolume} onIonChange={e => handleInput(e)}>
            <IonLabel slot="start">0</IonLabel>
            <IonLabel slot="end">100</IonLabel>
          </IonRange>
        </IonItem>
        <IonItemDivider>Debug routerLink items</IonItemDivider>
        <IonItem routerLink="/page/tab1">/page/tab1</IonItem>
        <IonItem routerLink="/page/tab2">/page/tab2</IonItem>
        <IonItem routerLink="/page/tab3">/page/tab3</IonItem>
        <IonItem routerLink="/account">/account</IonItem>
        <IonItem routerLink="/login">/login (caution, buggy route)</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Preferences;
