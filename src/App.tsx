import React from 'react';
import './App.css';
import Container from './components/Container';
import InterestForm from './components/InterestForm';
import { Submitted } from './components/Submitted';
import dotenv from 'dotenv';
import Switch from 'react-switch';
import { RequestStatus } from './utils/handler';

interface State {
  status: RequestStatus;
  isSubmitting: boolean;
  english: boolean;
}

class App extends React.Component<{}, State> {
  public state = {
    status: RequestStatus.pending,
    isSubmitting: false,
    english: false
  };

  // Sets the status state, used to display the success or failure message
  public setStatus(status: RequestStatus): void {
    this.setState({ status: status });
  }

  // Sets the status state, used to display the success or failure message
  public isSubmitting(): void {
    this.setState({ isSubmitting: true });
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
        {this.state.isSubmitting ? (
          <Submitted status={this.state.status} />
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
              handleSubmit={{
                setStatus: this.setStatus.bind(this),
                isSubmitting: this.isSubmitting.bind(this)
              }}
              english={this.state.english}
            />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
