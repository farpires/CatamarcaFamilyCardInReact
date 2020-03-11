import React,{createContext, useEffect, useState} from 'react';
import axios from 'axios';


export const ComercioContext = createContext();

const ComercioProvider = (props) => {

    const [comercios, guardarComercio] = useState([]);
    
    
    useEffect(()=>{
        const consultarapi= async() =>{
          
          const url=`https://tarjetafamilia.catamarca.gob.ar/api/v1/commerce/?format=vnd.api%2Bjson`;
          const respuestas= await axios.get(url);
          guardarComercio(respuestas.data.data);
 
        }
        consultarapi();
      },[]);

    return ( 
        <ComercioContext.Provider
        value={{
            comercios,
        }}
        >
             {props.children}   

        </ComercioContext.Provider> 
     );
}
 
export default ComercioProvider;