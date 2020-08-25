export default function validarCrearProducto(valores) {

    let errores = {};

    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    if(!valores.empresa) {
        errores.empresa = "El Nombre de Empresa o Compañía es obligatorio";
    }

    if(!valores.url) {
        errores.url = "La URL del producto es obligatoria";
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = 'URL mal formateada o no válida'
    }

    if(!valores.descripcion) {
        errores.descripcion = "Agrega una descripción de tu producto";
    } else if( valores.descripcion.length < 30 ) {
        errores.descripcion = 'La descripción debe ser de al menos 30 caracteres'
    }

    return errores;
}

