import React from 'react';
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';
import {
  IonApp, IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet, IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tabs/Tab1';
import Tab2 from './pages/Tabs/Tab2';
import Tab3 from './pages/Tabs/Tab3';
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
import {AppContextProvider} from "./store/Core";

const DefaultRoutes: React.FC<RouteComponentProps> = ({match}) => (
  <IonSplitPane contentId="main">
    <Menu/>
    <IonContent id="main">
      <IonTabs>
        <IonRouterOutlet>
          <Route path={`${match.url}/:tab(tab1)`} component={Tab1} exact/>
          <Route path={`${match.url}/:tab(tab2)`} component={Tab2} exact/>
          <Route path={`${match.url}/:tab(tab3)`} component={Tab3} exact/>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href={`${match.url}/tab1`}>
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href={`${match.url}/tab2`}>
            <IonIcon icon={images} />
            <IonLabel>Photos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href={`${match.url}/tab3`}>
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  </IonSplitPane>
);

const App: React.FC = () => (
  <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/preferences" component={Preferences} exact />
          <Route path="/account" component={Account} exact />
          <Route path="/page" component={DefaultRoutes}/>
          <Redirect from="/" to="/page/tab1" exact/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AppContextProvider>
);

export default App;
