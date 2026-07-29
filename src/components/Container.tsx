import React from 'react';
import './Container.css';

interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Container = ({ title, description, children }: Props): JSX.Element => (
  <section className="form-container" aria-labelledby="interest-form-title">
    <header className="form-container__header">
      <h2 id="interest-form-title">{title}</h2>
      {description && <p>{description}</p>}
    </header>
    {children}
  </section>
);

export default Container;
