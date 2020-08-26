import React from 'react';
import { Producto, DescripcionProducto, Titulo, TextoDescripcion, Comentarios, Imagen, Votos } 
from '../../public/static/styles/DetallesProducto';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';


const DetallesProducto = ({producto}) => {

    const { id, comentarios, creado, descripcion, empresa, nombre, url, urlImagen,votos } 
    = producto;

    return (
        <Producto>
            <DescripcionProducto>
                <div>
                    <Imagen src={urlImagen} />
                </div>

                <div>
                    <Titulo>{nombre}</Titulo>

                    <TextoDescripcion>{descripcion}</TextoDescripcion>

                    <Comentarios>
                        <div>
                            <img src="/static/img/comentario.png" />
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </Comentarios>

                    <p>Publicado hace: {formatDistanceToNow( new Date(creado), 
                    {locale: es} )}</p>
                </div>
            </DescripcionProducto>

            <Votos>
                <div> &#9650; </div>
                <p>{votos}</p>
            </Votos>
        </Producto>
    )
}

export default DetallesProducto
