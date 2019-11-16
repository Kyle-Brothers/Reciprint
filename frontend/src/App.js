import React from 'react';
import logo from './logo1.png';
import './App.css';
import Result from './components/result';

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
      <Result />
    </div>
  );
}

export default App;
