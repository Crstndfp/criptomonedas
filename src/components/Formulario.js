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

const Formulario = ({setCriptomoneda, setMoneda}) => {

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'GTQ', nombre: 'Quetzales de Guatenmala' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    // listado de return criptomonedas
    const [listaCrypto, setListaCrypto] = useState([]);
    const [error, setError] = useState(false);
    // state de nuestro hook
    const [monedaSeleccionada, SelectMonedas, setMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [cryptoSeleccionada, SelectCriptomonedas, setCryptoMonedas] = useCriptomoneda('Elige tu criptomoneda', '', listaCrypto);

    //llamada a la API
    useEffect(() => {
        const request = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${(monedaSeleccionada === '')?'USD':monedaSeleccionada}`;
            const request = await axios.get(url);
            setListaCrypto(request.data.Data);
        }

        request();
    }, [monedaSeleccionada]);

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar Datos llenos
        if (monedaSeleccionada === '' || cryptoSeleccionada === '') {
            setError(true);
            return;
        }
        setError(false);
        setCriptomoneda(cryptoSeleccionada);
        setMoneda(monedaSeleccionada);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />
            <SelectCriptomonedas />
            <Boton type="submit" value="Calcular" />
        </form>
    );
}

export default Formulario;