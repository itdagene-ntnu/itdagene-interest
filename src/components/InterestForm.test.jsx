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

const fire = async (...simulations) => {
  await act(async () => {
    simulations.forEach((simulate) => simulate());
    await flush();
  });
};

const mounted = [];

afterEach(() => {
  while (mounted.length) {
    const { root, container } = mounted.pop();
    act(() => root.unmount());
    container.remove();
  }
});

const formElement = (english) => (
  <InterestForm english={english} setStatus={vi.fn()} setSubmitting={vi.fn()} />
);

const renderForm = async ({ english = false } = {}) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ root, container });

  await act(async () => {
    root.render(formElement(english));
    await flush();
  });

  const setEnglish = async (value) => {
    await act(async () => {
      root.render(formElement(value));
      await flush();
    });
  };

  return { container, setEnglish };
};

describe('InterestForm', () => {
  it('provides the explicit-render callback required after a delayed API load', () => {
    renderToStaticMarkup(formElement(false));

    expect(mockRecaptchaProps.render).toBe('explicit');
    expect(mockRecaptchaProps.onloadCallback).toEqual(expect.any(Function));
    expect(mockRecaptchaProps.onloadCallback()).toBeUndefined();
  });

  it('moves focus to the first invalid field after submission', async () => {
    const { container } = await renderForm();

    await fire(() =>
      container
        .querySelector('form')
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    );

    expect(document.activeElement.id).toBe('companyName');
  });

  it('applies the accepted state after a valid text field has been blurred', async () => {
    const { container } = await renderForm();

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
  });

  it('keeps an autofilled field valid when change and blur happen together', async () => {
    const { container } = await renderForm();

    const companyName = container.querySelector('#companyName');
    const companyField = companyName.closest('.form-field');

    await fire(
      () =>
        Simulate.change(companyName, {
          target: { name: 'companyName', value: 'Computas' },
        }),
      () => Simulate.blur(companyName, { target: { name: 'companyName' } })
    );

    expect(companyName.getAttribute('aria-invalid')).toBe('false');
    expect(container.querySelector('#companyName-error')).toBeNull();
    expect(companyField.getAttribute('data-complete')).toBe('true');
  });

  it('shows error messages in the selected language after switching', async () => {
    const { container, setEnglish } = await renderForm({ english: false });

    const companyName = container.querySelector('#companyName');

    await fire(() =>
      Simulate.blur(companyName, { target: { name: 'companyName' } })
    );

    expect(container.querySelector('#companyName-error').textContent).toBe(
      'Dette feltet er obligatorisk.'
    );

    await setEnglish(true);

    expect(container.querySelector('#companyName-error').textContent).toBe(
      'This field is required.'
    );
  });

  it('marks selected choices complete without hiding their native controls', async () => {
    const { container } = await renderForm();

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
  });
});
