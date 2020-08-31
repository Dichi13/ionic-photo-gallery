import React from 'react';
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle, IonListHeader
} from '@ionic/react';
import { images, square, triangle, cog, person } from 'ionicons/icons';
import {useLocation} from "react-router";
import "./Menu.css";

const pages = [
  {
    title: 'Tab 1',
    url: '/page/tab1',
    icon: triangle,
  },
  {
    title: 'Photo Gallery',
    url: '/page/tab2',
    icon: images,
  },
  {
    title: 'Tab 3',
    url: '/page/tab3',
    icon: square,
  }
];

const options = [
  {
    title: 'Account Settings',
    url: '/account',
    icon: person,
  },
  {
    title: 'Preferences',
    url: '/preferences',
    icon: cog,
  },
];

const Menu = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main">
      <IonContent>
        <IonList id="menu">
          <IonListHeader>Menu Items</IonListHeader>
          {
            pages.map((page, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === page.url ? 'selected' : ''} routerDirection="none" routerLink={page.url} lines="none">
                  <IonIcon slot="start" icon={page.icon}/>
                  <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))
          }
        </IonList>

        <IonList>
          <IonListHeader>Options</IonListHeader>
          {
            options.map((page, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={page.url} lines="none">
                  <IonIcon slot="start" icon={page.icon}/>
                  <IonLabel>{page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))
          }
        </IonList>
      </IonContent>
    </IonMenu>
  )
};

export default Menu;