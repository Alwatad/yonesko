import * as migration_20250807_141143_initial_schema from './20250807_141143_initial_schema';
import * as migration_20250807_182712 from './20250807_182712';
import * as migration_20250807_185000_add_cash_payment from './20250807_185000_add_cash_payment';

export const migrations = [
  {
    up: migration_20250807_141143_initial_schema.up,
    down: migration_20250807_141143_initial_schema.down,
    name: '20250807_141143_initial_schema',
  },
  {
    up: migration_20250807_182712.up,
    down: migration_20250807_182712.down,
    name: '20250807_182712',
  },
  {
    up: migration_20250807_185000_add_cash_payment.up,
    down: migration_20250807_185000_add_cash_payment.down,
    name: '20250807_185000_add_cash_payment'
  },
];
