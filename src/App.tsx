import React from 'react';
import './App.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';
import { Submitted } from './components/Submitted';
import dotenv from 'dotenv';
import Switch from 'react-switch';

interface State {
  submitted: boolean;
  success: boolean;
  english: boolean;
}

class App extends React.Component<{}, State> {
  public state = {
    submitted: false,
    success: false,
    english: false
  };

  public submitted(success: boolean): void {
    this.setState({ submitted: true, success: success });
  }

  public render(): JSX.Element {
    dotenv.config();
    const YEAR = process.env.REACT_APP_YEAR;
    const TITLE = this.state.english ? 'Interest form' : 'Interesseskjema';
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
          <Container title={`${TITLE} ${YEAR}`}>
            <label className="english">
              <span>Do you want this form in english?</span>
              <Switch
                onChange={(): void =>
                  this.setState({ english: !this.state.english })
                }
                checked={this.state.english}
                onColor="#037bb4"
                handleDiameter={25}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
              />
            </label>
            <InterestForm
              handleSubmit={this.submitted.bind(this)}
              english={this.state.english}
            />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
