import React from 'react';
import './App.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';
import { Submitted } from './components/Submitted';

interface State {
  submitted: boolean;
  success: boolean;
}

class App extends React.Component<{}, State> {
  public state = {
    submitted: false,
    success: false
  };

  public submitted(success: boolean): void {
    this.setState({ submitted: true, success: success });
  }
  public render(): JSX.Element {
    this.state.submitted && console.log('works');
    const YEAR = process.env.REACT_APP_YEAR;
    return (
      <div className="App">
        <header className="header">
          <img
            src="https://cdn.itdagene.no/itdagene.svg"
            className="logo"
            alt="logo"
          />
        </header>
        {this.state.submitted ? (
          <Submitted success={this.state.success} />
        ) : (
          <Container title={`Interesseskjema ${YEAR}`}>
            <InterestForm handleSubmit={this.submitted.bind(this)} />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
