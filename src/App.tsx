import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AskMePage } from './containers/AskMePage';
import { CreatePage } from './containers/CreatePage';
import { HomePage } from './containers/HomePage';
import { ResultsPage } from './containers/ResultsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/askme" element={<AskMePage />} />
          <Route path="/askme/:id" element={<AskMePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
