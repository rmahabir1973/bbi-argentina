import * as migration_20260622_151857_initial from './20260622_151857_initial';

export const migrations = [
  {
    up: migration_20260622_151857_initial.up,
    down: migration_20260622_151857_initial.down,
    name: '20260622_151857_initial'
  },
];
