import { useState, useEffect } from 'react';
import FormularioContacto from './components/FormularioContacto';
import ListaContactos from './components/ListaContactos';
import { obtenerContactosService, eliminarContactoService } from './services/contactoService';
import './App.css';

function App() {
  const [contactos, setContactos] = useState([]);

  const cargarContactos = async () => {
    const data = await obtenerContactosService();
    setContactos(data);
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este contacto?");
    if (!confirmar) return;

    try {
      const respuesta = await eliminarContactoService(id);
      if (respuesta.ok) {
        alert("Contacto eliminado correctamente.");
        cargarContactos(); // sincronizamos el estado recargando la lista
      } else {
        const errorData = await respuesta.json();
        alert("Error al eliminar: " + (errorData.mensaje || "Desconocido"));
      }
    } catch (error) {
      alert("Error al eliminar el contacto.");
    }
  };

  return (
    <div className="app-container">
      <h1>Contact Book</h1>
      
      <div className="main-content">
        {/* se pasa la función para que actualice la lista al registrar */}
        <FormularioContacto onContactoRegistrado={cargarContactos} />

        <ListaContactos 
          contactos={contactos} 
          onEliminar={manejarEliminar} 
        />
      </div>
    </div>
  );
}

export default App;