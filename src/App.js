import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';
import imagen from  './cryptomonedas.png';

import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media ( min-width: 992px ) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {
  
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState([]);
  const [spinner, setSpinner] = useState(false);
  
  useEffect( () => {

    const cotizarCrypto = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const request =  await axios.get(url);
      
      setTimeout(() => {
        setResultado(request.data.DISPLAY[criptomoneda][moneda]);
        setSpinner(false);  
      }, 3000);
      
    };
    if (moneda !== ''){
      setSpinner(true);
      cotizarCrypto();
    }

  }, [criptomoneda, moneda]);

  const Componente = () => (
    spinner 
    ?  <Spinner />
    : <Cotizacion resultado={resultado} />
 
  );

  return (

  <Contenedor>
    <div>
      <Imagen src={imagen} alt="imagen crypto" />
    </div>
    <div>
      <Heading>Cotiza criptomonedas al instante</Heading>
      <Formulario 
        setMoneda={setMoneda}
        setCriptomoneda={setCriptomoneda}
      />
      <Componente />
    </div>
  </Contenedor>
  );
}

export default App;
