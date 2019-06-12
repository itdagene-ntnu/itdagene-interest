import React from 'react';
import './App.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';

const App: React.FC = (): JSX.Element => (
  <div className="App">
    <header className="header">
      <img
        src="https://cdn.itdagene.no/itdagene.svg"
        className="logo"
        alt="logo"
      />
    </header>
    <Container title={`Interesseskjema ${new Date().getFullYear()}`}>
      <InterestForm />
    </Container>
  </div>
);

export default App;
