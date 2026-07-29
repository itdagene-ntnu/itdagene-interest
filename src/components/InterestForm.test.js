import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
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
});
