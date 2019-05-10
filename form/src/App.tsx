import React from "react";
import "./App.css";
import info from "./text.json";
import logo from "./itdagene.svg";
import Container from "./components/Container";
import Form from "./components/IntrerestForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <Container title="Interesseskjema 2020">
          <div>
            <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
              {info.intro}
            </h4>

            <h4 style={{ textAlign: "center", fontWeight: 400 }}>
              {info.description}
            </h4>
            <Form />
          </div>
        </Container>
      </header>
    </div>
  );
};

export default App;
