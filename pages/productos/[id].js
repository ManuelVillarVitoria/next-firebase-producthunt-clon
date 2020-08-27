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
    const [ comentario, guardarComentario ] = useState({});

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase, usuario } = useContext(FirebaseContext);

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
    }, [id, producto]);

    if(Object.keys(producto).length === 0) return 'Cargando...';

    const {  comentarios, creado, descripcion, empresa, nombre, url, urlImagen, 
    votos, creador, haVotado } = producto;

    const VotarProducto = () => {
        if(!usuario) {
            return router.push('/login');
        }
        const nuevoTotal = votos + 1;

        if( haVotado.includes(usuario.uid) ) return;

        const nuevoHaVotado = [...haVotado, usuario.uid];

        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: nuevoHaVotado 
        });

        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
    }

    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    const agregarComentario = e => {
        e.preventDefault();

        if(!usuario) {
            return router.push('/login')
        }

        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        const nuevosComentarios = [...comentarios, comentario];

        firebase.db.collection('productos').doc(id).update({ 
            comentarios: nuevosComentarios
        });

        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })
    }


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
                            <p>Publicado hace: { formatDistanceToNow( new Date(creado), 
                            {locale: es} )} </p>
                            <p>Por: {creador.nombre} de {empresa}</p>
                            <Imagen src={urlImagen}/>
                            <p>{descripcion}</p>

                            { usuario && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Field>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Field>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                </>
                            )}

                            <h2 css={css `
                                margin: 2rem 0;
                            `}>Comentarios</h2>

                            { comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                <ul>
                                    {comentarios.map( (comentario, i) => (
                                        <li
                                            key={`${comentario.usuarioId}-${i}`}
                                            css={css `
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por:  
                                                <span css={css `
                                                    font-weight: bold
                                                `}>
                                                    {''} {comentario.usuarioNombre}
                                                </span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
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

                                 { usuario && (
                                    <Boton
                                        onClick={VotarProducto}
                                    >Votar</Boton>
                                 )}
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    )
}

export default Producto
