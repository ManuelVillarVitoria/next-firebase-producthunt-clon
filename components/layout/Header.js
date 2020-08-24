import React from 'react'
import Link from 'next/link';

import Buscar from '../ui/Buscador'
import Nav from './Nav'

import styled from '@emotion/styled';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`

const Header = () => {
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                
                    <Buscar />
                    
                    <Nav />
                </div>

                <div>
                    <p>Hola: Manuel</p>
                    <button type="button">Cerrar Sesión</button>

                    <Link href='/'><a>Login</a></Link>
                    <Link href='/'><a>Crear Cuenta</a></Link>
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header
