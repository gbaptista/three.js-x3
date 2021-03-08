import test from 'ava';

import THREEx3 from './x3';

test('THREEx3', (t) => {
  const expectedVersion = '0.0.1';

  t.is(THREEx3.VERSION, expectedVersion);
  t.is(THREEx3.version(), expectedVersion);

  const debug = new THREEx3();

  t.is(debug.VERSION, expectedVersion);
  t.is(debug.version(), expectedVersion);
});
