<?php
//  cabeceras que otorgaran permisos al navegador para procesar los datos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // verbos HTTP que aceptara el ENDPOINT
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept");
header("Content-Type: application/json; charset=UTF-8");

// se verifica que el servidor sea seguro
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
} 
// importamos el archivo de conexion a la BD junto al modelo usando rutas absolutas seguras
require_once __DIR__ . '/../config/Conexion.php';
require_once __DIR__ . '/../models/M_Contacto.php';
$database = new Conexion();
$bd= $database->getConnection();
$contacto = new Contacto($bd); // instanciamos al modelo pasando la conexion como argumento


$metodo = $_SERVER['REQUEST_METHOD'];
// switch para evitar multiples condicionales
switch ($metodo) {
    case 'GET':
        $result = $contacto->lectura(); // invocacion del metodo LECTURA

        if ($result && $result->rowCount() > 0) {
        $contactos_arr = array(); 

            while ($fila = $result->fetch(PDO::FETCH_ASSOC)) {
                $item = array(
                    "id_contacto" => $fila['id_contacto'],
                    "nombre_completo" => $fila['nombre_completo'],
                    "correo_electronico" => $fila['correo_electronico'],
                    "telefono_contacto" => $fila['telefono_contacto']
                );
                array_push($contactos_arr, $item);
            }

            http_response_code(200); // si la peticion resulta exitosa
            echo json_encode($contactos_arr); // se serializa la estructura de datos y la convierte en un documento JSON
        } else {
            http_response_code(404);
            echo json_encode(array("mensaje" => "No se encontraron contactos."));
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input")); // lectura del body de la peticion HTTP 
        $nombre = trim($data->nombre_completo ?? '');
        $correo = trim($data->correo_electronico ?? '');
        $telefono = trim($data->telefono_contacto ?? '');

        if (empty($nombre) || empty($correo) || empty($telefono)) {
            http_response_code(400);
            echo json_encode(array("mensaje" => "Datos incompletos. Se requieren todos los campos."));
            exit;
        }

        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(array("mensaje" => "El formato del correo es inválido."));
            exit;
        }

        if (!preg_match('/^[0-9]{7,10}$/', $telefono)) {
            http_response_code(400);
            echo json_encode(array("mensaje" => "El teléfono debe contener entre 7 y 10 números."));
            exit;
        }

        // si pasa las validaciones asignamos e invocamos el metodo CREAR
        $contacto->nombre_completo = $nombre;
        $contacto->correo_electronico = $correo;
        $contacto->telefono_contacto = $telefono;
        
        if ($contacto->crear()) {
            http_response_code(201);
            echo json_encode(array("mensaje" => "Contacto creado con éxito."));
        } else {
            http_response_code(503);
            echo json_encode(array("mensaje" => "No se pudo crear el contacto en el servidor."));
        }
        break;   
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : (isset($data->id_contacto) ? $data->id_contacto : null); // se eliminará el registro segun su ID
        
        if (!empty($id)) {
            $contacto->id_contacto = $id;

            if ($contacto->eliminar()) { // invocacion del metodo ELIMINAR
                http_response_code(200);
                echo json_encode(array("mensaje" => "Contacto eliminado correctamente."));
            } else {
                http_response_code(503);
                echo json_encode(array("mensaje" => "No se pudo eliminar el contacto. Intentelo de Nuevo."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("mensaje" => "Se requiere el ID del contacto a eliminar."));
        }
         break;
    default:
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método HTTP no permitido."));
        break;
}
