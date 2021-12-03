import React from 'react';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import { FormQuestion } from './components/FormQuestion';
import { AskMePage } from './containers/AskMePage';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<FormQuestion />} />
          <Route path="/askme" element={<AskMePage />} />
          <Route path="/askme/:id" element={<AskMePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
