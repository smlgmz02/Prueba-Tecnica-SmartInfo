const API_URL = 'http://localhost/proyecto_tecnico/backend/controllers/C_Contacto.php';

// servicio para obtener todos los contactos 
export const obtenerContactosService = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (respuesta.ok) {
      return await respuesta.json();
    }
    return [];
  } catch (error) {
    console.error("Error al obtener contactos.:", error);
    return [];
  }
};

// servicio para registrar un nuevo contacto
export const registrarContactoService = async (contactoData) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactoData)
    });
    return respuesta;
  } catch (error) {
    console.error("Error de registro.:", error);
    throw error;
  }
};
// servicio para eliminar un contacto
export const eliminarContactoService = async (id) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // se envia el ID en el body en formato JSON
      body: JSON.stringify({ id_contacto: id }) 
    });
    return respuesta;
  } catch (error) {
    console.error("Error al eliminar un contacto:", error);
    throw error;
  }
};