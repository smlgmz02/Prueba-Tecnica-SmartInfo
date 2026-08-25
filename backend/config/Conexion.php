<?php
class Conexion {
    // Propiedades para la conexion de la BD
    private $host = "localhost";
    private $bd_nombre = "GestorContactos";
    private $username = "root";
    private $password = "";
    public  $con; // importante mantener la propiedad de la conexion con metodo de acceso publico para que todo el sistema pueda hacer uso de ella.

    public function getConnection() {
        $this->con = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->bd_nombre . ";charset=utf8mb4";
            $this->con = new PDO($dsn, $this->username, $this->password);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
        return $this->con; // Una vez la conexion se haya establecido se retorna el objeto PDO conectado a la BD
        
    }
}
?>