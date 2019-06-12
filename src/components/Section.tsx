import React from 'react';
import './Section.css';

interface SectionProps {
  header: string;
  text: string;
  children: JSX.Element[] | JSX.Element;
}

export const Section = (props: SectionProps): JSX.Element => (
  <section>
    <h2 className="sectionHeader">{props.header}</h2>
    <p>{props.text}</p>
    <div className="insertionFields">{props.children}</div>
  </section>
);
