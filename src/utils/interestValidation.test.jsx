import { createValidationSchema } from './interestValidation';

describe('interest form validation', () => {
  it('uses Norwegian required-field feedback', async () => {
    await expect(
      createValidationSchema(false).validateAt('companyName', {
        companyName: '',
      })
    ).rejects.toThrow('Dette feltet er obligatorisk.');
  });

  it('uses English required-field feedback', async () => {
    await expect(
      createValidationSchema(true).validateAt('companyName', {
        companyName: '',
      })
    ).rejects.toThrow('This field is required.');
  });

  it('rejects messages longer than the public limit', async () => {
    await expect(
      createValidationSchema(true).validateAt('message', {
        message: 'a'.repeat(301),
      })
    ).rejects.toThrow('Use no more than 300 characters.');
  });
});
