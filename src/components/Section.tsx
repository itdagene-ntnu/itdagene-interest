import React from 'react';
import './Section.css';

interface SectionProps {
  header: string;
  text: string;
  step: string;
  children: React.ReactNode;
}

export const Section = ({
  header,
  text,
  step,
  children,
}: SectionProps): JSX.Element => (
  <section className="form-section">
    <div className="form-section__heading">
      <span>{step}</span>
      <div>
        <h3>{header}</h3>
        <p>{text}</p>
      </div>
    </div>
    <div className="form-section__fields">{children}</div>
  </section>
);
