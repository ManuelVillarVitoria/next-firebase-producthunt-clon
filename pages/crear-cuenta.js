import React from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../public/static/styles/Form';

import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';


const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}


const CrearCuenta= () => {

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion
    (STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    async function crearCuenta() {
       try {
        await firebase.registrar(nombre, email, password);
           
       } catch (error) {
           console.error('Hubo un error al crear un usuario', error.message);
       }
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
                    >Crear Cuenta</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
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
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                id="email"
                                placeholder="Tu Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { errores.email && <Error>{errores.email}</Error> }

                        <Field>
                            <label htmlFor="password">Pasword</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Tu Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { errores.password && <Error>{errores.password}</Error> }

                        <InputSubmit 
                            type="submit"
                            value="Crear Cuenta"
                        />
                    </Form>
                </>
            </Layout>
        </div>
  )
}

export default CrearCuenta