import React, { useState, useContext, Fragment } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { ComercioContext } from "../context/ComercioContext";
import styled from "@emotion/styled";
// import { Icon, divIcon } from "leaflet";
// import axios from 'axios';
// import useSwr from 'swr';

const Titulo = styled.h1`
  text-align: center;
  padding: 0px;
  font-weight: 500;
  font-size: 40px;
  color: #ffffff;
  background-color: #1883ba;
  border-radius: 6px;
  border: 10px solid #0016b0;
`;

const PieDePagina = styled.p`
  color: white;
  background-color: black;
  line-height: 3;
  text-align: center;
  width: 100%;
`;

const Etiqueta = styled.div`
  color: white;
  background-color: #1883ba;
  line-height: 3;
  border: 2px solid #0016b0;
  border-radius: 6px;
  padding:2px;
  h3{
    margin: 0px auto;
    padding: 1px;
    border: none;
  }

  p{
    
    margin: 0px auto;
    padding: 1px;
    border: none;
  
  }



`;

function Ubicacion() {
  const { comercios } = useContext(ComercioContext);

  const [activarComercio, setActivarComercio] = useState(null);

  // console.log(activarComercio);

  const obtenerCoordenadas = point => {
    if (point !== null) {
      //latitudes y longitudes estan al revez en la API
      return [point.coordinates[1], point.coordinates[0]];
    } else return [0, 0];
  };
  console.log(activarComercio);
  return (
    <Fragment>
      <Titulo>TARJETA FAMILIA-catamarca-gob</Titulo>
      <Map center={[-28.468799, -65.77893]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {comercios.map(dato => (
          <Marker
            key={dato.id}
            position={obtenerCoordenadas(dato.attributes.point)}
            onclick={() => {
              setActivarComercio(dato.attributes);
            }}
          />
        ))}
        ,
        {activarComercio ? (
          <Popup
            position={obtenerCoordenadas(activarComercio.point)}
            onClose={() => {
              setActivarComercio(null);
            }}
          >
            <Etiqueta>
              <h3>{activarComercio.name}</h3>
              <p>{activarComercio.address}</p>
              <p>{activarComercio.email}</p>
              <p>{activarComercio.tags[0]}</p>
            </Etiqueta>
          </Popup>
        ) : null}
      </Map>
      <PieDePagina>
        Todos los derechos reservados para @react-leflet.edu.ar
      </PieDePagina>
    </Fragment>
  );
}
export default Ubicacion;
