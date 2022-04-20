import {by, expect, element} from 'detox';

describe('Biometric auth', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.label('welcomeAuth'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.label('isBiometricSignInSupportedButton')).tap();
    await expect(element(by.label('pinCodeBackup'))).toBeVisible();
  });
});
