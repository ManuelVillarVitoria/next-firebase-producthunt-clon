import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';


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


    return (
        <Layout>
            <>
                { error && <Error404 />}
            </>
        </Layout>
    )
}

export default Producto
