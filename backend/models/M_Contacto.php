<?php

class Contacto {
    private $con; // variable sostenedora de la conexion a la BD
    private $table_name = "Contactos";
    // Propiedades con las que se mapearan los datos almacenados en la BD
    public $id_contacto;
    public $nombre_completo;
    public $correo_electronico;
    public $telefono_contacto;

    public function __construct($bd) // metodo constructor
    {
        $this->con = $bd;
    }

    public function lectura(){
        try{
            $query = "SELECT id_contacto, nombre_completo, correo_electronico, telefono_contacto 
            FROM " . $this->table_name . " ORDER BY id_contacto DESC"; // se muestra la lista de contactos del mas reciente al mas antiguo
            $result = $this->con->prepare($query); // la variable con prepara la query para ser ejecutada
            $result->execute(); // la variable result la almacena, la ejecuta 
            return $result; // y finalmente retorna el resultado

        } catch (PDOException $e) {
            error_log("Error en la lectura de datos");  // se muestra la excepcion internamente sin revelar datos sensibles
            return false;
        }
    }
    public function crear(){
        try{
            // se construye la consulta usando :marcadores para evitar la inyeccion de datos...
            $query = "INSERT INTO" . $this->table_name . "(nombre_completo, correo_electronico, telefono_contacto) VALUES (:nombre_completo, :correo_electronico, :telefono_contacto)";
            $result = $this->con->prepare($query);
            // se vinculan los valores ingresados a los marcadores
            $result->bindParam(":nombre_completo", $this->nombre_completo);
            $result->bindParam(":correo_electronico", $this->correo_electronico);
            $result->bindParam(":telefono_contacto", $this->telefono_contacto);
            $result->execute();
            return $result;

        }catch (PDOException $e) {
            error_log("Error al crear contacto: " . $e->getMessage()); 
            return false; 
        }
    }
    public function eliminar() {
        try {
            $query = "DELETE FROM " . $this->table_name . " WHERE id_contacto = :id_contacto";
            $result = $this->con->prepare($query);
            // se limpia el id por seguridad
            $this->id_contacto = htmlspecialchars(strip_tags($this->id_contacto));
            $result->bindParam(":id_contacto", $this->id_contacto);
            $result->execute();
        } catch (PDOException $e) {
            error_log("Error al eliminar contacto: " . $e->getMessage());
            return false; 
        }
    }
}