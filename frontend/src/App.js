import React from 'react';
import logo from './logo1.png';
import './App.css';
import Result from './components/result';
import {transitions, positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  return (
    <div style={{margin: 'auto'}}>
      <div style={{textAlign: 'center', padding: '5%'}}>
        <img
          src={logo}
          alt=""
          style={{width: '80%', margin: 'auto', textAlign: 'center'}}
        />
      </div>

      <AlertProvider template={AlertTemplate} {...options}>
        <Result style={{textAlign: '-webkit-center'}} />
      </AlertProvider>
    </div>
  );
}

export default App;
