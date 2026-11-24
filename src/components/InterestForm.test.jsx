import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import { renderToStaticMarkup } from 'react-dom/server';
import InterestForm from './InterestForm';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let mockRecaptchaProps;

vi.mock('react-recaptcha', () => ({
  default: (props) => {
    mockRecaptchaProps = props;
    return null;
  },
}));

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const fire = async (simulate) => {
  await act(async () => {
    simulate();
    await flush();
  });
};

const renderForm = async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <InterestForm
        english={false}
        setStatus={vi.fn()}
        setSubmitting={vi.fn()}
      />
    );
  });

  const cleanup = () => {
    act(() => root.unmount());
    container.remove();
  };

  return { container, cleanup };
};

describe('InterestForm reCAPTCHA integration', () => {
  it('provides the explicit-render callback required after a delayed API load', () => {
    renderToStaticMarkup(
      <InterestForm
        english={false}
        setStatus={vi.fn()}
        setSubmitting={vi.fn()}
      />
    );

    expect(mockRecaptchaProps.render).toBe('explicit');
    expect(mockRecaptchaProps.onloadCallback).toEqual(expect.any(Function));
    expect(mockRecaptchaProps.onloadCallback()).toBeUndefined();
  });

  it('moves focus to the first invalid field after submission', async () => {
    const { container, cleanup } = await renderForm();

    await act(async () => {
      container
        .querySelector('form')
        .dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true })
        );
      await flush();
    });

    expect(document.activeElement.id).toBe('companyName');

    cleanup();
  });

  it('applies the accepted state after a valid text field has been blurred', async () => {
    const { container, cleanup } = await renderForm();

    const companyName = container.querySelector('#companyName');
    const companyField = companyName.closest('.form-field');

    expect(companyField.getAttribute('data-complete')).toBeNull();

    await fire(() =>
      Simulate.change(companyName, {
        target: { name: 'companyName', value: 'Computas' },
      })
    );
    await fire(() =>
      Simulate.blur(companyName, { target: { name: 'companyName' } })
    );

    expect(companyField.getAttribute('data-complete')).toBe('true');
    expect(companyField.classList.contains('form-field--complete')).toBe(true);
    expect(container.querySelector('.field-completion')).toBeNull();

    cleanup();
  });

  it('marks selected choices complete without hiding their native controls', async () => {
    const { container, cleanup } = await renderForm();

    const dayOne = container.querySelector('#day-1');
    const dayGroup = dayOne.closest('.choice-group');
    const confirmation = container.querySelector('#confirm');
    const confirmationSection = confirmation.closest('.form-confirmation');

    await fire(() =>
      Simulate.change(dayOne, {
        target: {
          name: 'day',
          type: 'radio',
          value: 'Dag 1',
          checked: true,
        },
      })
    );
    await fire(() =>
      Simulate.change(confirmation, {
        target: { name: 'confirm', type: 'checkbox', checked: true },
      })
    );

    expect(dayOne.type).toBe('radio');
    expect(dayGroup.getAttribute('data-complete')).toBe('true');
    expect(confirmation.type).toBe('checkbox');
    expect(confirmationSection.getAttribute('data-complete')).toBe('true');

    cleanup();
  });
});
