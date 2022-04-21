import {by, expect, element} from 'detox';

describe('testing expected user behaviour', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.label('welcomeAuth'))).toBeVisible();
  });

  it('should authenticate the user after navigating to authentication', async () => {
    await element(by.label('isBiometricSignInSupportedButton')).tap();

    try {
      for (let i = 0; i <= 4; i++) {
        await waitFor(element(by.text('CANCEL')))
          .toBeVisible()
          .withTimeout(10000);
        await element(by.text('CANCEL')).tap();
      }
      await element(by.label('pinCodeBackUpTouchableOpacity')).tap();
    } finally {
      await expect(element(by.label('pinCodeBackup'))).toBeVisible();
      await element(by.text('1')).multiTap(6);
      await element(by.text('1')).multiTap(6);
    }
  });
  it('navigated through the menu, qr code collection and the qr code scanner', async () => {
    await expect(element(by.label('QRCodeMenuContainer'))).toBeVisible();
    await element(by.label('navigateToUserQRCodes')).tap();
    await element(by.label('navigateToQRCodeMenu')).tap();
    await element(by.label('navigateToQRCodeScan')).tap();
  });
});
