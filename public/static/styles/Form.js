import styled from '@emotion/styled';

export const Form = styled.form `
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
`;

export const Field = styled.div `
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input {
        flex: 1;
        padding: 1rem;
    }
`;

export const InputSubmit = styled.input `
    font-family: 'PT Sans', sans serif;
    font-weight: 700;
    background-color: var(--naranja);
    text-transform: uppercase;
    color: #FFF;
    font-size: 1.8rem;
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    border: none;
   

    &:hover {
        cursor: pointer;
    }
`;