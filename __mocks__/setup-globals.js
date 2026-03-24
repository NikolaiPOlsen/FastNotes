global.alert = jest.fn();

const globals = [
  'TextDecoder',
  'TextDecoderStream',
  'TextEncoderStream',
  'URL',
  'URLSearchParams',
  '__ExpoImportMetaRegistry',
  'structuredClone',
];

for (const name of globals) {
  const existing = global[name];
  if (existing !== undefined) {
    try {
      Object.defineProperty(global, name, {
        value: existing,
        configurable: false,
        writable: false,
        enumerable: true,
      });
    } catch (_) {}
  } else {
    try {
      Object.defineProperty(global, name, {
        value: {},
        configurable: false,
        writable: false,
        enumerable: false,
      });
    } catch (_) {}
  }
}
