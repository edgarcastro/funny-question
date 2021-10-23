import React from 'react';
import './App.css';
import { FunnyQuestion } from './components/FunnyQuestion';

function App() {
  return (
    <div className="App">
      <main>
        <FunnyQuestion question="Do you want pizza?" option="No" optionUnreachable="Yes" />
      </main>
    </div>
  );
}

export default App;
