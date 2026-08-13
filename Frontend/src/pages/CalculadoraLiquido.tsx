import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';

const CalculadoraLiquido: React.FC = () => {
  const [tipo, setTipo] = useState('porcentaje');
  const [vagua, setVagua] = useState<number>();
  const [porcentaje, setPorcentaje] = useState<number>();
  const [dosis, setDosis] = useState<number>();
  const [dosismz, setDosismz] = useState<number>();
  const [gastomz, setGastomz] = useState<number>();
  const [resultado, setResultado] = useState<string | null>(null);

  const calcular = () => {
    if (tipo === 'porcentaje' && vagua && porcentaje) {
      const ml = (vagua * porcentaje * 1000) / 100;
      setResultado(`Añadir ${ml.toFixed(1)} ml al tanque de ${vagua} L.`);
    } else if (tipo === 'proporcion' && vagua && dosis) {
      const ml = vagua * dosis;
      setResultado(`Añadir ${ml.toFixed(1)} ml al tanque de ${vagua} L.`);
    } else if (tipo === 'calibracion' && dosismz && gastomz) {
      const nBombas = gastomz / 20;
      const mlBomba = (dosismz * 1000) / nBombas;
      setResultado(`Necesita ${nBombas.toFixed(1)} bombas (20L) por manzana. Añada ${mlBomba.toFixed(1)} ml a cada bomba.`);
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Calc. Líquidos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Tipo de Aplicación</IonLabel>
              <IonSelect value={tipo} onIonChange={e => setTipo(e.detail.value)}>
                <IonSelectOption value="porcentaje">Porcentaje de Mezcla (%)</IonSelectOption>
                <IonSelectOption value="proporcion">Proporción Directa (ml/L)</IonSelectOption>
                <IonSelectOption value="calibracion">Calibración por Manzana</IonSelectOption>
              </IonSelect>
            </IonItem>

            {tipo === 'porcentaje' && (
              <>
                <IonItem><IonLabel position="stacked">Volumen Agua (L)</IonLabel><IonInput type="number" onIonChange={e => setVagua(parseFloat(e.detail.value!))} /></IonItem>
                <IonItem><IonLabel position="stacked">Porcentaje (%)</IonLabel><IonInput type="number" onIonChange={e => setPorcentaje(parseFloat(e.detail.value!))} /></IonItem>
              </>
            )}
            {tipo === 'proporcion' && (
              <>
                <IonItem><IonLabel position="stacked">Volumen Agua (L)</IonLabel><IonInput type="number" onIonChange={e => setVagua(parseFloat(e.detail.value!))} /></IonItem>
                <IonItem><IonLabel position="stacked">Dosis (ml/L)</IonLabel><IonInput type="number" onIonChange={e => setDosis(parseFloat(e.detail.value!))} /></IonItem>
              </>
            )}
            {tipo === 'calibracion' && (
              <>
                <IonItem><IonLabel position="stacked">Dosis Comercial (L/mz)</IonLabel><IonInput type="number" onIonChange={e => setDosismz(parseFloat(e.detail.value!))} /></IonItem>
                <IonItem><IonLabel position="stacked">Gasto de Agua (L/mz)</IonLabel><IonInput type="number" onIonChange={e => setGastomz(parseFloat(e.detail.value!))} /></IonItem>
              </>
            )}
            <IonButton expand="block" color="secondary" className="ion-margin-top" onClick={calcular}>Calcular Preparación</IonButton>
          </IonCardContent>
        </IonCard>
        {resultado && (
          <IonCard style={{ background: 'var(--ion-color-tertiary)', color: 'white' }}>
            <IonCardHeader><IonCardTitle style={{ color: 'white' }}>Preparación</IonCardTitle></IonCardHeader>
            <IonCardContent><p style={{ fontSize: '1.1rem' }}>{resultado}</p></IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
export default CalculadoraLiquido;
