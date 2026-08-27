// componente para el listado de contactos 
import { useState} from 'react';
import { FaTrash } from 'react-icons/fa';

function ListaContactos({ contactos, onEliminar }) {

    const [busqueda, setBusqueda] = useState(''); // useState para guardar el resultado en el bsuscador
    const filtroContactos = contactos.filter((contacto) =>
    contacto.nombre_completo.toLowerCase().includes(busqueda.toLowerCase()) // filtrado de contactos usando metodo .filter
    );
    return (
    <div className="caja-lista">
      <h2 className="subtitulo">Contactos Recientes</h2>
      <input type="text" placeholder="Buscar" value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />
      <div className="contenedor-contactos">
        {/* se recorren los contactos segun su busqueda */}
        {filtroContactos.length > 0 ? (
          filtroContactos.map((contacto) => (
            <div className="item-contacto" key={contacto.id_contacto} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div>
                <strong>{contacto.nombre_completo}</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>
                  {contacto.correo_electronico} | {contacto.telefono_contacto}
                </p>
              </div>

              <button 
                onClick={() => onEliminar(contacto.id_contacto)}
                title="Eliminar contacto"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ff4d4d',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaTrash />
              </button>

            </div>
          ))
        ) : (
          <p className="read-the-docs" style={{ textAlign: 'center' }}>
            {/* Mensaje dinámico dependiendo de si hay contactos o si la búsqueda no encontró nada */}
            {contactos.length === 0 
              ? "No hay contactos registrados todavía." 
              : "No se encontraron contactos con ese nombre."}
          </p>
        )}
      </div>
    </div>
  );
}
export default ListaContactos;