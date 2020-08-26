import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../public/static/styles/Form';
import Boton from '../../public/static/styles/Boton';

import { FirebaseContext } from '../../firebase';

import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';




const ContenedorProducto = styled.div `
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Imagen = styled.img `
    max-width: 100%;
`;


const Producto = () => {

    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase } = useContext(FirebaseContext);

    useEffect(()=> {
        if(id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists) {
                    guardarProducto(producto.data());
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if(Object.keys(producto).length === 0) return 'Cargando...';

    const {  comentarios, creado, descripcion, empresa, nombre, url, urlImagen, 
    votos, creador } = producto;


    return (
        <Layout>
            <>
                { error && <Error404 />}

                <div className="contenedor">
                    <h1 css={css `
                            text-align: center;
                            margin-top: 5rem;
                    `}>{nombre}</h1>

                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow( new Date(creado), 
                            {locale: es} )}</p>
                            <p>Por: {creador.nombre} de {empresa}</p>
                            <Imagen src={urlImagen}/>
                            <p>{descripcion}</p>

                            <h2>Agrega tu comentario</h2>
                            <form>
                                <Field>
                                    <input
                                        type="text"
                                        name="mensaje"
                                    />
                                </Field>
                                <InputSubmit
                                    type="submit"
                                    value="Agregar Comentario"
                                />
                            </form>

                            <h2 css={css `
                                margin: 2rem 0;
                            `}>Comentarios</h2>
                            {comentarios.map(comentario => (
                                <li>
                                    <p>{comentario.nombre}</p>
                                    <p>Escrito por: {comentario.usuario.nombre}</p>
                                </li>
                            ))}
                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                bgColor= "true"
                                href={url}
                            >Visitar URL</Boton>

                            <div css={css `
                                margin-top: 5rem;
                            `}>
                                <p css={css `
                                    text-align: center;
                                `}>{votos} Votos</p>

                                <Boton>Votar</Boton>
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    )
}

export default Producto
