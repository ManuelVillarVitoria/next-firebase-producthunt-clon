import React, { useState, useContext } from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../public/static/styles/Form';

import { firebaseContext, FirebaseContext } from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

import Error404 from '../components/layout/404';


const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    const [ nombreImagen, guardarNombreImagen ] = useState('');
    const [ subiendo, guardarSubiendo ] = useState(false);
    const [ progreso, guardarProgreso ] = useState(0);
    const [ urlImagen, guardarUrlImagen ] = useState('');
     
    
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
          urlImagen,
          descripcion,
          votos: 0, 
          comentarios: [],
          creado: Date.now(), 
          creador: {
              id: usuario.uid,
              nombre: usuario.displayName
          }
        }

        firebase.db.collection('productos').add(producto);

        return router.push('/');
    }


    const handleUploadStart = () => {
      guardarProgreso(0);
      guardarSubiendo(true);
    }

    const handleProgress = progress => guardarProgreso({ progreso });

    const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
    };

    const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombreImagen(nombre);
      firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
            console.log(url);
            guardarUrlImagen(url);
          });
    };
    

    return (
        <div>
            <Layout>
                { !usuario ? <Error404 /> : (
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

                          <Field>
                              <label htmlFor="imagen">Imagen</label>
                              <FileUploader 
                                  accept="image/*"
                                  id="imagen"
                                  name="imagen"
                                  randomizeFilename
                                  storageRef={firebase.storage.ref("productos")}
                                  onUploadStart={handleUploadStart}
                                  onUploadError={handleUploadError}
                                  onUploadSuccess={handleUploadSuccess}
                                  onProgress={handleProgress}
                              />
                          </Field>

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
                )}
            </Layout>
        </div>
  )
}

export default NuevoProducto