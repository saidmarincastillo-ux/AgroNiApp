import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonBadge } from '@ionic/react';
import { useState } from 'react';

interface CartItem {
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

const CalculadoraCostos: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number>();
  const [cantidad, setCantidad] = useState<number>();
  const [items, setItems] = useState<CartItem[]>([]);

  const agregar = () => {
    if (precio && cantidad) {
      setItems([...items, { nombre: nombre || 'Insumo', precio, cantidad, subtotal: precio * cantidad }]);
      setNombre(''); setPrecio(undefined); setCantidad(undefined);
    }
  };

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Calc. Costos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem><IonLabel position="stacked">Nombre (Opcional)</IonLabel><IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} /></IonItem>
            <IonItem><IonLabel position="stacked">Precio (C$)</IonLabel><IonInput type="number" value={precio} onIonChange={e => setPrecio(parseFloat(e.detail.value!))} /></IonItem>
            <IonItem><IonLabel position="stacked">Cantidad</IonLabel><IonInput type="number" value={cantidad} onIonChange={e => setCantidad(parseInt(e.detail.value!))} /></IonItem>
            <IonButton expand="block" color="secondary" className="ion-margin-top" onClick={agregar}>Añadir a la lista</IonButton>
          </IonCardContent>
        </IonCard>
        
        <IonCard>
          <IonCardHeader><IonCardTitle>Total: <IonBadge color="success" style={{ fontSize: '1.2rem' }}>C$ {total.toFixed(2)}</IonBadge></IonCardTitle></IonCardHeader>
          <IonCardContent>
            <IonList>
              {items.map((it, idx) => (
                <IonItem key={idx}>
                  <IonLabel>
                    <h2>{it.nombre}</h2>
                    <p>{it.cantidad} x C$ {it.precio} = <strong>C$ {it.subtotal}</strong></p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            {items.length > 0 && <IonButton expand="block" color="danger" fill="outline" onClick={() => setItems([])}>Limpiar Lista</IonButton>}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default CalculadoraCostos;
