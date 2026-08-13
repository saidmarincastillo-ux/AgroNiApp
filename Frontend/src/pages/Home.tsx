import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonThumbnail,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonLabel
} from '@ionic/react';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  tipo: string;
  nombreComercial: string;
  distribuidor: string;
  precio: number;
  imagenUrl: string;
  proposito: string;
}

const API_URL = 'http://192.168.1.3:5000/api/Products';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await fetchProducts();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={`http://192.168.1.3:5000/images/logo.png?t=${new Date().getTime()}`} 
                alt="AgroNi" 
                style={{ height: '32px', borderRadius: '8px', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
              AgroNi - Catálogo
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Desliza para actualizar..."
            refreshingSpinner="circles"
            refreshingText="Cargando nuevos productos..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">AgroNi</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Cargando catálogo...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay productos disponibles. Desliza hacia abajo para actualizar.</p>
        ) : (
          <IonList style={{ background: 'transparent' }}>
            {products.map((p) => (
              <IonCard key={p.id}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: '1.2rem' }}>{p.nombreComercial}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {p.imagenUrl ? (
                      <IonThumbnail style={{ width: '80px', height: '80px' }}>
                        <img src={`http://192.168.1.3:5000${p.imagenUrl}`} alt={p.nombreComercial} />
                      </IonThumbnail>
                    ) : (
                      <div style={{ width: '80px', height: '80px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                        <IonLabel color="medium">Sin foto</IonLabel>
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <IonBadge color={p.tipo === 'ABONO' ? 'primary' : 'secondary'}>{p.tipo}</IonBadge>
                      <p style={{ marginTop: '8px', marginBottom: '4px' }}><strong>Distribuidor:</strong> {p.distribuidor}</p>
                      <p style={{ marginBottom: '4px' }}><strong>Propósito:</strong> {p.proposito}</p>
                      <h2 style={{ color: 'var(--ion-color-success)', fontWeight: 'bold' }}>C$ {p.precio?.toFixed(2)}</h2>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
