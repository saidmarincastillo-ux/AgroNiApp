import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, calculator, flask, cash, person } from 'ionicons/icons';

import Home from './pages/Home';
import Admin from './pages/Admin';
import CalculadoraAbono from './pages/CalculadoraAbono';
import CalculadoraLiquido from './pages/CalculadoraLiquido';
import CalculadoraCostos from './pages/CalculadoraCostos';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/abono"><CalculadoraAbono /></Route>
          <Route exact path="/liquido"><CalculadoraLiquido /></Route>
          <Route exact path="/costos"><CalculadoraCostos /></Route>
          <Route exact path="/admin"><Admin /></Route>
          <Route exact path="/"><Redirect to="/home" /></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Catálogo</IonLabel>
          </IonTabButton>
          <IonTabButton tab="abono" href="/abono">
            <IonIcon icon={calculator} />
            <IonLabel>Abonos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="liquido" href="/liquido">
            <IonIcon icon={flask} />
            <IonLabel>Líquidos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="costos" href="/costos">
            <IonIcon icon={cash} />
            <IonLabel>Costos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="admin" href="/admin">
            <IonIcon icon={person} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
