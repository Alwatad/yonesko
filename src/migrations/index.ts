import * as migration_20250807_120000_enable_extensions from "./20250807_120000_enable_extensions";
import * as migration_20250807_141143_initial_schema from "./20250807_141143_initial_schema";
import * as migration_20250807_185000_add_cash_payment from "./20250807_185000_add_cash_payment";
import * as migration_20250807_190000_add_gcc_countries from "./20250807_190000_add_gcc_countries";
import * as migration_20250807_191500_extend_orders_country_enums from "./20250807_191500_extend_orders_country_enums";

export const migrations = [
  {
    up: migration_20250807_141143_initial_schema.up,
    down: migration_20250807_141143_initial_schema.down,
    name: "20250807_141143_initial_schema",
  },
  {
    up: migration_20250807_120000_enable_extensions.up,
    down: migration_20250807_120000_enable_extensions.down,
    name: "20250807_120000_enable_extensions",
  },
  {
    up: migration_20250807_185000_add_cash_payment.up,
    down: migration_20250807_185000_add_cash_payment.down,
    name: "20250807_185000_add_cash_payment",
  },
  {
    up: migration_20250807_190000_add_gcc_countries.up,
    down: migration_20250807_190000_add_gcc_countries.down,
    name: "20250807_190000_add_gcc_countries",
  },
  {
    up: migration_20250807_191500_extend_orders_country_enums.up,
    down: migration_20250807_191500_extend_orders_country_enums.down,
    name: "20250807_191500_extend_orders_country_enums",
  },
];
