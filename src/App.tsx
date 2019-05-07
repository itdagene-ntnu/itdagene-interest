import React from "react";
import "./App.css";
import info from "./text.json";
import logo from "./itdagene.svg";
import Container from "./components/Container";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <Container title="Interesseskjema 2020">{info.info}</Container>
      </header>
    </div>
  );
};

export default App;
