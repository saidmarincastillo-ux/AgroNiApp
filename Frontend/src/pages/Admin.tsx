import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonButton, IonTextarea, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonThumbnail, IonIcon
} from '@ionic/react';
import { trash, create } from 'ionicons/icons';
import { useState, useEffect } from 'react';

const API_URL = 'http://10.190.156.90:5000/api/Products';
const SETTINGS_URL = 'http://10.190.156.90:5000/api/Settings/logo';
const AUTH_URL = 'http://10.190.156.90:5000/api/Auth/login';

interface Product {
  id: number;
  tipo: string;
  nombreComercial: string;
  distribuidor: string;
  precio: number;
  imagenUrl: string;
  proposito: string;
}

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form states
  const [nombreComercial, setNombreComercial] = useState('');
  const [tipo, setTipo] = useState('ABONO');
  const [distribuidor, setDistribuidor] = useState('');
  const [proposito, setProposito] = useState('');
  const [precio, setPrecio] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (isLoggedIn && userRole === 'ADMIN') fetchProducts();
  }, [isLoggedIn, userRole]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUserRole(data.role);
      } else {
        alert('Credenciales incorrectas');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombreComercial', nombreComercial);
    formData.append('tipo', tipo);
    formData.append('distribuidor', distribuidor);
    formData.append('proposito', proposito);
    if (precio) formData.append('precio', precio);
    if (imageFile) formData.append('imageFile', imageFile);

    try {
      if (editingId) {
        formData.append('id', editingId.toString());
        const res = await fetch(`${API_URL}/${editingId}`, { method: 'PUT', body: formData });
        if (res.ok) alert('Producto editado exitosamente');
      } else {
        const res = await fetch(API_URL, { method: 'POST', body: formData });
        if (res.ok) alert('Producto agregado exitosamente');
      }
      
      setNombreComercial(''); setDistribuidor(''); setProposito(''); setPrecio(''); setImageFile(null); setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const handleLogoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) return;
    const formData = new FormData();
    formData.append('imageFile', logoFile);
    try {
      const res = await fetch(SETTINGS_URL, { method: 'POST', body: formData });
      if (res.ok) alert('Logo actualizado! (Ve a Inicio y arrastra hacia abajo para refrescar)');
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Producto eliminado');
        fetchProducts();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setNombreComercial(p.nombreComercial);
    setTipo(p.tipo);
    setDistribuidor(p.distribuidor || '');
    setProposito(p.proposito || '');
    setPrecio(p.precio ? p.precio.toString() : '');
    setImageFile(null);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setEmail('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <IonPage>
        <IonHeader><IonToolbar color="primary"><IonTitle>Tu Cuenta</IonTitle></IonToolbar></IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader><IonCardTitle>Iniciar Sesión</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem><IonLabel position="stacked">Correo</IonLabel><IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required /></IonItem>
                <IonItem><IonLabel position="stacked">Contraseña</IonLabel><IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required /></IonItem>
                <IonButton expand="block" type="submit" color="primary" className="ion-margin-top">Entrar</IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {userRole === 'ADMIN' ? (
          <>
            <IonButton expand="block" color="medium" onClick={handleLogout} style={{ marginBottom: '15px' }}>Cerrar Sesión</IonButton>
            
            <IonCard>
              <IonCardHeader><IonCardTitle>Configuración de la App</IonCardTitle></IonCardHeader>
              <IonCardContent>
                <form onSubmit={handleLogoSubmit}>
                  <IonItem><IonLabel position="stacked">Nuevo Logo (PNG/JPG)</IonLabel><input type="file" accept="image/*" style={{marginTop: '10px'}} onChange={e => setLogoFile(e.target.files ? e.target.files[0] : null)} /></IonItem>
                  <IonButton expand="block" type="submit" color="secondary" className="ion-margin-top">Actualizar Logo</IonButton>
                </form>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader><IonCardTitle>{editingId ? "Editar Producto" : "Añadir Producto"}</IonCardTitle></IonCardHeader>
              <IonCardContent>
                <form onSubmit={handleSubmit}>
                  <IonItem>
                    <IonLabel position="stacked">Tipo</IonLabel>
                    <IonSelect value={tipo} onIonChange={e => setTipo(e.detail.value)}>
                      <IonSelectOption value="ABONO">Abono</IonSelectOption>
                      <IonSelectOption value="LIQUIDO">Líquido</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem><IonLabel position="stacked">Nombre</IonLabel><IonInput value={nombreComercial} onIonChange={e => setNombreComercial(e.detail.value!)} required /></IonItem>
                  <IonItem><IonLabel position="stacked">Distribuidor</IonLabel><IonInput value={distribuidor} onIonChange={e => setDistribuidor(e.detail.value!)} /></IonItem>
                  <IonItem><IonLabel position="stacked">Propósito</IonLabel><IonTextarea value={proposito} onIonChange={e => setProposito(e.detail.value!)} /></IonItem>
                  <IonItem><IonLabel position="stacked">Precio (C$)</IonLabel><IonInput type="number" value={precio} onIonChange={e => setPrecio(e.detail.value!)} /></IonItem>
                  <IonItem>
                    <IonLabel position="stacked">{editingId ? "Actualizar Imagen (Opcional)" : "Imagen"}</IonLabel>
                    <input type="file" accept="image/*" style={{ marginTop: '10px' }} onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
                  </IonItem>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <IonButton expand="block" type="submit" color="primary" style={{ flex: 1 }}>{editingId ? "Guardar" : "Publicar"}</IonButton>
                    {editingId && <IonButton expand="block" color="medium" onClick={() => { setEditingId(null); setNombreComercial(''); setPrecio(''); }} style={{ flex: 1 }}>Cancelar</IonButton>}
                  </div>
                </form>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader><IonCardTitle>Gestionar Productos</IonCardTitle></IonCardHeader>
              <IonCardContent>
                <IonList>
                  {products.map(p => (
                    <IonItem key={p.id}>
                      {p.imagenUrl && <IonThumbnail slot="start"><img src={`http://10.190.156.90:5000${p.imagenUrl}`} alt={p.nombreComercial} /></IonThumbnail>}
                      <IonLabel>
                        <h2>{p.nombreComercial}</h2>
                        <p>{p.tipo}</p>
                      </IonLabel>
                      <IonButton fill="clear" color="primary" onClick={() => startEdit(p)}><IonIcon icon={create} /></IonButton>
                      <IonButton fill="clear" color="danger" onClick={() => deleteProduct(p.id)}><IonIcon icon={trash} /></IonButton>
                    </IonItem>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <IonCard>
             <IonCardHeader><IonCardTitle>Bienvenido</IonCardTitle></IonCardHeader>
             <IonCardContent>
               <p style={{fontSize: '1.1rem', marginBottom: '20px'}}>Has iniciado sesión correctamente. Esta es tu cuenta de usuario estándar.</p>
               <IonButton expand="block" color="medium" onClick={handleLogout}>Cerrar Sesión</IonButton>
             </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
export default Admin;
