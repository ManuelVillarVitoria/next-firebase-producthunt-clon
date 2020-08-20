import React from 'react'
import Link from 'next/link';

import Buscar from '../ui/Buscador'
import Nav from './Nav'

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Buscar />
                    
                    <Nav />
                <div>

                </div>
                    <p>Hola: Manuel</p>
                    <button type="button">Cerrar Sesión</button>

                    <Link href='/'>Cerrar Sesión</Link>
                    <Link href='/'>Crear Cuenta</Link>
                </div>
            </div>
        </header>
    )
}

export default Header
