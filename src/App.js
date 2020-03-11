import React from 'react';
import "./App.css";
import ComercioProvider from './context/ComercioContext';
import Ubicacion from './components/Ubicacion';


function App() {
  
  return (
  <ComercioProvider>
    
    <Ubicacion />

  </ComercioProvider>
  );
}
export default App;
 