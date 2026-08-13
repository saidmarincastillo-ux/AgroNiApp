import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useState } from 'react';

const CalculadoraAbono: React.FC = () => {
  const [matas, setMatas] = useState<number>();
  const [filas, setFilas] = useState<number>();
  const [dosisPlanta, setDosisPlanta] = useState<number>();
  const [resultado, setResultado] = useState<string | null>(null);

  const calcular = () => {
    if (!matas || !filas) return;
    const plantasHa = 10000 / (matas * filas);
    let detalle = "";
    if (dosisPlanta) {
      const kgTotales = (plantasHa * dosisPlanta) / 1000;
      const lbTotales = kgTotales * 2.20462;
      const qqTotales = lbTotales / 100;
      detalle = `Abono Total: ${qqTotales.toFixed(2)} qq/ha (${kgTotales.toFixed(1)} kg/ha)`;
    }
    setResultado(`Densidad: ${Math.round(plantasHa).toLocaleString()} plantas/ha. ${detalle}`);
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Calc. Abonos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem><IonLabel position="stacked">Distancia entre matas (m)</IonLabel><IonInput type="number" onIonChange={e => setMatas(parseFloat(e.detail.value!))} /></IonItem>
            <IonItem><IonLabel position="stacked">Distancia entre filas (m)</IonLabel><IonInput type="number" onIonChange={e => setFilas(parseFloat(e.detail.value!))} /></IonItem>
            <IonItem><IonLabel position="stacked">Dosis por planta (gramos) [Opcional]</IonLabel><IonInput type="number" onIonChange={e => setDosisPlanta(parseFloat(e.detail.value!))} /></IonItem>
            <IonButton expand="block" color="secondary" className="ion-margin-top" onClick={calcular}>Calcular Dosis</IonButton>
          </IonCardContent>
        </IonCard>
        {resultado && (
          <IonCard style={{ background: 'var(--ion-color-success)', color: 'white' }}>
            <IonCardHeader><IonCardTitle style={{ color: 'white' }}>Resultado</IonCardTitle></IonCardHeader>
            <IonCardContent><p style={{ fontSize: '1.1rem' }}>{resultado}</p></IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
export default CalculadoraAbono;
