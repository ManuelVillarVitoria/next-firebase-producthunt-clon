import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

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

    const {  comentarios, creado, descripcion, empresa, nombre, url, urlImagen,votos } 
    = producto;


    return (
        <Layout>
            <>
                { error && <Error404 />}

                <div>
                    <h1 css={css `
                            text-align: center;
                            margin-top: 5rem;
                    `}>{nombre}</h1>

                    <ContenedorProducto>
                        <div>
                        1
                        </div>

                        <aside>
                        2
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    )
}

export default Producto
