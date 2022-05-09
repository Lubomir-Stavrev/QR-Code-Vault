import encryptedStorage from './encryptedStorage';
const {StaticUtils, ArrayStringifier} = require('simple-common-utils');
const _contentTypeJson = 'application/json; charset=UTF-8';
const key =
  '593703282853-7522cadoh0u4vegingb458cmbul1gd6t.apps.googleusercontent.com';
const secret = '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';

const ddb = '--foo_bar_baz';

const mimeFolder = 'application/vnd.google-apps.folder';
const _urlFiles = 'https://www.googleapis.com/drive/v3/files';
const headerAuth = {
  credentials:
    'grant_type=client_credentials&client_id=' +
    key +
    '&client_secret=' +
    secret,
  'Content-Type': `multipart/related; boundary=${'foo_bar_baz'}`,
};
export default {
  async addQRCode(qrCodeData: string | undefined) {
    const ending = `\n${ddb}--`;
    const folderId = await this.createFolderSafe({
      name: 'qrCodeFolder',
      parents: ['root'],
      mimeType: mimeFolder,
    });
    const metadata = {
      parents: [folderId ? folderId : 'root'],
      name: 'qrCode.txt',
    };
    const mediaType = 'plain/text';
    const media = qrCodeData;

    const accessToken = await encryptedStorage.getUserGoogleAccessToken();

    const body =
      `\n${ddb}\n` +
      'Content-Type: application/json; charset=UTF-8\n\n' +
      `${JSON.stringify(metadata)}\n\n${ddb}\n` +
      `Content-Type: ${mediaType}\n\n
      ${media}${ending}`;

    const createFileOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        credentials: headerAuth.credentials,
        'Content-Type': `multipart/related; boundary=${'foo_bar_baz'}`,
      },
      body,
    };

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      createFileOptions,
    );
    const json = await response.json();

    return json;
  },
  async createFolderSafe(metadata: {
    name: string;
    parents: string[];
    mimeType: string;
  }) {
    let id = await this.getFolderId('qrCodeFolder', ['root'], mimeFolder);

    if (!id) {
      const body = JSON.stringify(metadata);
      const accessToken = await encryptedStorage.getUserGoogleAccessToken();
      const result = await fetch(_urlFiles, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: headerAuth.credentials,
          'Content-Type': _contentTypeJson,
        },
        body,
      });

      if (!result.ok) {
        throw result;
      }

      id = (await result.json()).id;
    }

    return id;
  },

  async getFolderId(
    name: string,
    parents: string[],
    mimeType: string,
    trashed = false,
  ) {
    const queryParams = {name, trashed, mimeType: mimeType ? mimeType : ''};

    let result = await this.list({
      q:
        this.stringifyQueryParams(queryParams, '', ' and ', true) +
        ` and '${parents[0]}' in parents`,
    });
    if (!result.ok) {
      throw result;
    }

    const file = (await result.json()).files[0];

    return file ? file.id : file;
  },
  async list(queryParams: {q: string}) {
    const accessToken = await encryptedStorage.getUserGoogleAccessToken();

    return fetch(`${_urlFiles}${this.stringifyQueryParams(queryParams)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        credentials: headerAuth.credentials,
      },
    });
  },
  stringifyQueryParams(
    queryParams: any,
    prefix = '?',
    separator = '&',
    quoteIfString?: boolean,
  ) {
    const array: string[] = [];
    Object.keys(queryParams).forEach(paramKey =>
      array.push(
        `${paramKey}=${StaticUtils.safeQuoteIfString(
          queryParams[paramKey],
          quoteIfString,
        )}`,
      ),
    );
    return new ArrayStringifier(array)
      .setPrefix(prefix)
      .setSeparator(separator)
      .process();
  },
  async getFilesWithContant(folderId: string) {
    const accessToken = await encryptedStorage.getUserGoogleAccessToken();

    const folderQRCodesAsBlob = await fetch(
      `https://www.googleapis.com/drive/v2/files/${folderId}/children`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: headerAuth.credentials,
        },
      },
    );
    const parsedQRCodesAsText = await folderQRCodesAsBlob.text();
    const parsedQRCodes = JSON.parse(parsedQRCodesAsText)?.items;
    if (parsedQRCodes.length <= 0) {
      return;
    }
    let qrCodesContentArr = [];

    for (let i = 0; i <= parsedQRCodes.length - 1; i++) {
      const qrDataSelfLink = parsedQRCodes[i].childLink;
      const singleQRCodeBlob = await fetch(`${qrDataSelfLink}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: headerAuth.credentials,
        },
      });
      const qrCodeAsText = await singleQRCodeBlob.text();
      const downloadUrl = JSON.parse(qrCodeAsText)?.downloadUrl; //this is the link from where we can get the content of the text file

      const qrCodeContentBlob = await fetch(`${downloadUrl}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: headerAuth.credentials,
        },
      });

      const qrContentData = await qrCodeContentBlob.text();

      if (qrContentData) {
        qrCodesContentArr[qrCodesContentArr.length] = {content: qrContentData};
      }
    }
    return qrCodesContentArr;
  },
  async syncDataWithDrive() {
    const id: string = await this.getFolderId(
      'qrCodeFolder',
      ['root'],
      mimeFolder,
    );
    const qrCodesContentFromDrive = await this.getFilesWithContant(id);
    const localQRCodes = await encryptedStorage.getQRCodes();
    if (!localQRCodes || !qrCodesContentFromDrive) {
      return;
    }
    let isFound = false;

    for (let i = 0; i <= localQRCodes.length - 1; i++) {
      isFound = false;
      for (let j = 0; j < qrCodesContentFromDrive.length - 1; j++) {
        if (
          qrCodesContentFromDrive[j].content?.trim() ===
          localQRCodes[i].qrCodeData?.trim()
        ) {
          isFound = true;
          break;
        }
      }
      if (isFound === false) {
        //here we are adding the missing qr code into the drive
        await this.addQRCode(localQRCodes[i].qrCodeData);
      }
    }
    for (let i = 0; i <= qrCodesContentFromDrive.length - 1; i++) {
      isFound = false;
      for (let j = 0; j < localQRCodes.length - 1; j++) {
        if (
          qrCodesContentFromDrive[i].content?.trim() ===
          localQRCodes[j].qrCodeData?.trim()
        ) {
          isFound = true;
          break;
        }
      }
      if (isFound === false) {
        //here we are adding the missing qr code into the encrypted storage
        await encryptedStorage.addQRCode(qrCodesContentFromDrive[i].content);
      }
    }
    return true;
  },
};
