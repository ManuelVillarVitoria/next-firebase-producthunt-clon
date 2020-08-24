import React from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../public/static/styles/Form';

import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';


const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}


const CrearCuenta= () => {

    const { valores, errores, submitForm, handleSubmit, handleChange } = useValidacion
    (STATE_INICIAL, validarCrearCuenta, CrearCuenta);

    function CrearCuenta() {
        console.log('Crear Cuenta...');
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
                    <Form>
                        <Field>
                            <label htmlFor="Nombre">Nombre</label>
                            <input 
                                type="text"
                                id="nombre"
                                placeholder="Tu Nombre"
                                name="nombre"
                            />
                        </Field>

                        <Field>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                placeholder="Tu Email"
                                name="email"
                            />
                        </Field>

                        <Field>
                            <label htmlFor="password">Pasword</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Tu Password"
                                name="password"
                            />
                        </Field>

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