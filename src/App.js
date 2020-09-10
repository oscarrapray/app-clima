import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import MainHeader from './components/MainHeader';
import Clima from './components/Clima';
import Error from './components/Error';

const App = () => {
      // state del formulario
      const [busqueda, guardarBusqueda] = useState({ 
        ciudad: '',
        pais: ''
    });
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [error, guardarError] = useState(false);
  
    const { ciudad, pais } = busqueda;
  
    useEffect(() => {
      const consultarAPI = async () => {
  
          if(consultar) {
            const appId = '144049dbdfd69c358d59c6004d181811';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
    
            guardarResultado(resultado);
            guardarConsultar(false);
  
            // Detecta si hubo resultados correctos en la consulta
  
            if(resultado.cod === "404") {
                guardarError(true);
            } else {
                guardarError(false);
            }
          }
          
      }
      consultarAPI();
      // eslint-disable-next-line
    },[consultar]);
  
    let componente;
    if(error) {
      componente = <Error mensaje="No hay resultados" />
    } else {
      componente = <Clima  resultado={resultado} />
    }
  return(
    <div className="container">
        <div className="cabezera">
            <MainHeader titulo='Clima React App' />
        </div>
        <div className="item1">
            <Formulario 
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsultar={guardarConsultar}
            />
        </div>
        <div className="item2">
          {componente}
        </div>
    </div>
  )
}

export default App;
