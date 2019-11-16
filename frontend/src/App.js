import React from 'react';
import logo from './logo1.png';
import './App.css';
import Result from './components/result';

function App() {
  return (
    <div>
      <img src={logo} alt="" style={{width: '75%', textAlign: 'center'}} />
      <Result />
    </div>
  );
}

export default App;
