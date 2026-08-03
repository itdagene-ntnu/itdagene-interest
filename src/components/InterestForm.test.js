import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { renderToStaticMarkup } from 'react-dom/server';
import InterestForm from './InterestForm';

let mockRecaptchaProps;

jest.mock('react-recaptcha', () => (props) => {
  mockRecaptchaProps = props;
  return null;
});

describe('InterestForm reCAPTCHA integration', () => {
  it('provides the explicit-render callback required after a delayed API load', () => {
    renderToStaticMarkup(
      <InterestForm
        english={false}
        setStatus={jest.fn()}
        setSubmitting={jest.fn()}
      />
    );

    expect(mockRecaptchaProps.render).toBe('explicit');
    expect(mockRecaptchaProps.onloadCallback).toEqual(expect.any(Function));
    expect(mockRecaptchaProps.onloadCallback()).toBeUndefined();
  });

  it('moves focus to the first invalid field after submission', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      ReactDOM.render(
        <InterestForm
          english={false}
          setStatus={jest.fn()}
          setSubmitting={jest.fn()}
        />,
        container
      );
    });

    await act(async () => {
      container
        .querySelector('form')
        .dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true })
        );
      await Promise.resolve();
    });

    expect(document.activeElement.id).toBe('companyName');

    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });

  it('applies the accepted state after a valid text field has been blurred', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      ReactDOM.render(
        <InterestForm
          english={false}
          setStatus={jest.fn()}
          setSubmitting={jest.fn()}
        />,
        container
      );
    });

    const companyName = container.querySelector('#companyName');
    const companyField = companyName.closest('.form-field');

    expect(companyField.getAttribute('data-complete')).toBeNull();

    await act(async () => {
      Simulate.change(companyName, {
        target: { name: 'companyName', value: 'Computas' },
      });
      Simulate.blur(companyName, { target: { name: 'companyName' } });
      await Promise.resolve();
    });

    expect(companyField.getAttribute('data-complete')).toBe('true');
    expect(companyField.classList.contains('form-field--complete')).toBe(true);
    expect(container.querySelector('.field-completion')).toBeNull();

    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });

  it('marks selected choices complete without hiding their native controls', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      ReactDOM.render(
        <InterestForm
          english={false}
          setStatus={jest.fn()}
          setSubmitting={jest.fn()}
        />,
        container
      );
    });

    const dayOne = container.querySelector('#day-1');
    const dayGroup = dayOne.closest('.choice-group');
    const confirmation = container.querySelector('#confirm');
    const confirmationSection = confirmation.closest('.form-confirmation');

    await act(async () => {
      Simulate.change(dayOne, {
        target: {
          name: 'day',
          type: 'radio',
          value: 'Dag 1',
          checked: true,
        },
      });
      Simulate.change(confirmation, {
        target: { name: 'confirm', type: 'checkbox', checked: true },
      });
      await Promise.resolve();
    });

    expect(dayOne.type).toBe('radio');
    expect(dayGroup.getAttribute('data-complete')).toBe('true');
    expect(confirmation.type).toBe('checkbox');
    expect(confirmationSection.getAttribute('data-complete')).toBe('true');

    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });
});
