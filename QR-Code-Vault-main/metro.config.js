const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;

function getSourceExts() {
  const customExtensions = process.env.E2E ? ['ci.ts', 'ci.tsx', 'ci.js'] : [];
  return customExtensions.concat(defaultSourceExts);
}
module.exports = {
  resolver: {
    sourceExts: process.env.RN_SRC_EXT
      ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
      : defaultSourceExts,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
