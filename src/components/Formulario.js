import React, { useEffect, useState } from 'react';

import Error from './Error';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import styled from '@emotion/styled';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = () => {

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'QTZ', nombre: 'Quetzal' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    // listado de return criptomonedas
    const [listaCrypto, setListaCrypto] = useState([]);
    const [error, setError] = useState(false);
    // state de nuestro hook
    const [moneda, SeleccionarMoneda, setMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [cryptoMoneda, Crypto, setCryptoMoneda] = useCriptomoneda('Elige tu criptomoneda', '', listaCrypto);

    //llamada a la API
    useEffect(() => {
        const request = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const request = await axios.get(url);
            console.log(request.data.Data);
            setListaCrypto(request.data.Data);
        }

        request();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar Datos llenos
        if (moneda === '' || cryptoMoneda === '') {
            setError(true);
            return;
        }
        setError(false);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SeleccionarMoneda />
            <Crypto />
            <Boton type="submit" value="Calcular" />
        </form>
    );
}

export default Formulario;