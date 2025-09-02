// Mock AdapterDateFns
export const AdapterDateFns = class MockAdapterDateFns {
  constructor() {}
  format() { return ''; }
  parse() { return new Date(); }
  isValid() { return true; }
};