import React, { useState} from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import Router from 'next/router';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../public/static/styles/Form';

import firebase from '../firebase';

import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';



const STATE_INICIAL = {
  email: '',
  password: ''
}


const Login = () => {

  const [ error, guardarError] = useState(false);
  
  const { valores, errores, handleSubmit, handleChange, handleBlur } = 
  useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push('/');
      
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario ', error.message);
      guardarError(error.message);
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
                  >Iniciar Sesión</h1>
                  <Form
                      onSubmit={handleSubmit}
                  >
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

                      { error && <Error>{error}</Error>}

                      <InputSubmit 
                          type="submit"
                          value="Iniciar Sesión"
                      />
                  </Form>
              </>
          </Layout>
      </div>
  )
}

export default Login