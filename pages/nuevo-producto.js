import React, { useState, useContext } from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import Router, { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../public/static/styles/Form';

import { firebaseContext, FirebaseContext } from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';


const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    //imagen: '',
    url: '',
    descripcion: ''
}


const NuevoProducto = () => {
  const [ error, guardarError] = useState(false);
  
    const { valores, errores, handleSubmit, handleChange, handleBlur } = 
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  
    const { nombre, empresa, url, descripcion } = valores;
    
    const router = useRouter();

    const { usuario, firebase } = useContext(FirebaseContext);

    async function crearProducto() {
      if(!usuario) {
        return router.push('/login');
      }

      const producto =  {
        nombre,
        empresa,
        url,
        descripcion,
        votos: 0, 
        comentarios: [],
        creado: Date.now()
      }

      firebase.db.collection('productos').add(producto);

    }


    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css `
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Nuevo Producto</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                      <fieldset>
                        <legend>Información General</legend>
                          <Field>
                              <label htmlFor="nombre">Nombre</label>
                              <input 
                                  type="text"
                                  id="nombre"
                                  placeholder="Tu Nombre"
                                  name="nombre"
                                  value={nombre}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                          </Field>

                          { errores.nombre && <Error>{errores.nombre}</Error> }

                          <Field>
                              <label htmlFor="empresa">Empresa</label>
                              <input 
                                  type="text"
                                  id="empresa"
                                  placeholder="Nombre Empresa o Compañía"
                                  name="empresa"
                                  value={empresa}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                          </Field>

                          { errores.empresa && <Error>{errores.empresa}</Error> }

                          {/*<Field>
                              <label htmlFor="imagen">Imagen</label>
                              <input 
                                  type="file"
                                  id="imagen"
                                  name="imagen"
                                  value={imagen}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                          </Field>

                          { errores.imagen && <Error>{errores.imagen}</Error> }*/}

                          <Field>
                              <label htmlFor="url">URL</label>
                              <input 
                                  type="url"
                                  id="url"
                                  placeholder="URL de tu producto"
                                  name="url"
                                  value={url}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                          </Field>

                          { errores.url && <Error>{errores.url}</Error> }
                        </fieldset>

                        <fieldset>
                          <legend>Sobre tu Producto</legend>
                            <Field>
                                <label htmlFor="decripcion">Descripción</label>
                                <textarea 
                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Field>

                          { errores.descripcion && <Error>{errores.descripcion}</Error> }
                        </fieldset>
        
                        { error && <Error>{error}</Error>}

                        <InputSubmit 
                            type="submit"
                            value="Crear Producto"
                        />
                    </Form>
                </>
            </Layout>
        </div>
  )
}

export default NuevoProducto