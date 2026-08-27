import { useState } from 'react';
import { registrarContactoService } from '../services/contactoService';

function FormularioContacto({ onContactoRegistrado }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expresiones Regulares para validacion de formato (correo y numero telefonico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{7,10}$/;

    if (!nombre || !correo || !telefono) {
      alert("Por favor, llena todos los campos.");
      return;
    }
    if (!formData.nombre_completo.trim()) {
      alert("El nombre completo es obligatorio.");
      return;
    }
    if (!emailRegex.test(formData.correo_electronico)) {
      alert("Por favor, ingresa un correo electrónico válido (ej. usuario@dominio.com).");
      return;
    }
    if (!telefonoRegex.test(formData.telefono_contacto)) {
      alert("El teléfono debe contener solo números (entre 7 y 10 dígitos).");
      return;
    }
    // tras pasar correctamente las validaciones se envian los datos al backend
   try {
      const respuesta = await registrarContactoService(formData);
      if (respuesta.ok) {
        alert("Contacto registrado exitosamente.");
        setFormData({ nombre_completo: '', correo_electronico: '', telefono_contacto: '' });
        onContactoRegistrado(); // sincroniza la lista
      } else {
        const errorData = await respuesta.json();
        alert("Error del servidor: " + (errorData.mensaje || "No se pudo registrar"));
      }
    } catch (error) {
      alert("Error de conexión al registrar el contacto.");
    }
  };

  return (
    <div className="caja-formulario">
      <form onSubmit={handleSubmit}>
        <div className="grupo-input">
          <label>Nombre Completo</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="grupo-input">
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
          />
        </div>
        <div className="grupo-input">
          <label>Número Telefónico</label>
          <input 
            type="text" 
            value={telefono} 
            onChange={(e) => setTelefono(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn-registrar">
          REGISTRAR
        </button>
      </form>
    </div>
  );
}

export default FormularioContacto;