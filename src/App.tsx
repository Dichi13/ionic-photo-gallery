import React, { useContext, useEffect } from 'react';
import { Redirect, Route as RouterRoute, RouteComponentProps } from 'react-router-dom';
import {
  IonApp, IonContent, IonIcon, IonLabel, IonRouterOutlet, IonSplitPane,
  IonTabBar, IonTabButton, IonTabs, useIonViewDidEnter, useIonViewDidLeave
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, map, triangle } from 'ionicons/icons';
import ReactGA from "utilities/analytics";

/* Route components */
import Tab1 from './pages/Tabs/Home';
import Tab2 from './pages/Tabs/Tab2';
import Tab3 from './pages/Tabs/Tab3';
import Login from './pages/Login';
import Menu from './components/Menu';
import Preferences from './pages/Preferences';
import Account from './pages/Account/Account';

/* core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './App.css';
import './theme/variables.css';

/* Etc */
import { AppContext, AppContextProvider } from "store/Core";
import hasLoggedIn from "utilities/auth";
import { useBackButtonAsExit } from "hooks/useBackButtonAsExit";

const DefaultRoutes: React.FC<RouteComponentProps> = ({match}) => {
  const { didEnter, didLeave } = useBackButtonAsExit();
  useIonViewDidEnter(didEnter);
  useIonViewDidLeave(didLeave);

  return (
    <IonSplitPane contentId="main">
      <Menu/>
      <IonContent id="main">
        <IonTabs>
          <IonRouterOutlet>
            <Route path={`${match.url}/tab1`} component={Tab1} exact trackAnalytics/>
            <Route path={`${match.url}/tab2`} component={Tab2} exact trackAnalytics/>
            <Route path={`${match.url}/tab3`} component={Tab3} exact trackAnalytics/>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href={`${match.url}/tab1`}>
              <IonIcon icon={triangle}/>
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href={`${match.url}/tab2`}>
              <IonIcon icon={images}/>
              <IonLabel>Photos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href={`${match.url}/tab3`}>
              <IonIcon icon={map}/>
              <IonLabel>Maps</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonSplitPane>
  )
};

const Route: React.FC<any> = ({component: Component, authed, trackAnalytics, ...rest}) => {
  const { state } = useContext(AppContext);
  const isLoggedIn = hasLoggedIn(state);

  useEffect(() => {
    if (trackAnalytics && rest.path === window.location.pathname) {
      const path = window.location.pathname + window.location.search;
      ReactGA.pageview(path);
    }
  }, [window.location.pathname]);

  return (
    <RouterRoute
      {...rest}
      render={(props: any) => (!authed || isLoggedIn) ? <Component {...props}/> : <Redirect to="/login"/>}
    />
  )
}

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Redirect from="/" to="/login" exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/preferences" component={Preferences} exact authed trackAnalytics/>
            <Route path="/account" component={Account} exact authed trackAnalytics/>
            <Route path="/page" component={DefaultRoutes} authed/>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  )
};

export default App;
