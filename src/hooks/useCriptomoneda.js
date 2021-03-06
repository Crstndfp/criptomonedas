import React, { Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
    `;

const useCriptomoneda = (label, stateInicial, opciones) => {

    // State de nuestro custom hook
    const [state, setState] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select onChange={e => setState(e.target.value)} value={state} >
                <option value="">--Seleccione--</option>
                {opciones.map(op => (
                    <option key={op.CoinInfo.Id} value={op.CoinInfo.Name}>{op.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    // retornar state, interfaz,  f(X) que modifica el state
    return [state, SelectCripto, setState];
}

export default useCriptomoneda