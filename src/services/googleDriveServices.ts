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
};
