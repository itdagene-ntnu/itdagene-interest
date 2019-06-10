import React from 'react';
import './App.css';
import Container from './components/Container';
import IntrerestForm from './components/IntrerestForm';

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
      <IntrerestForm />
    </Container>
  </div>
);

export default App;
