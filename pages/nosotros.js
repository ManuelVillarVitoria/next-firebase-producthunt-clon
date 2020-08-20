import React from 'react';
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';

const Heading = styled.h1 `
  color: red;
`;

const Nosotros = () => {
  return (
    <div>
      <Layout>
        <Heading>Nosotros</Heading>
      </Layout>
    </div>
  )
}

export default Nosotros
