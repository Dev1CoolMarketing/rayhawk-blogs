import * as migration_20251202_202446 from './20251202_202446';
import * as migration_20251202_220634_add_sites from './20251202_220634_add_sites';
import * as migration_20251202_222255_add_featured_to_posts from './20251202_222255_add_featured_to_posts';

export const migrations = [
  {
    up: migration_20251202_202446.up,
    down: migration_20251202_202446.down,
    name: '20251202_202446',
  },
  {
    up: migration_20251202_220634_add_sites.up,
    down: migration_20251202_220634_add_sites.down,
    name: '20251202_220634_add_sites',
  },
  {
    up: migration_20251202_222255_add_featured_to_posts.up,
    down: migration_20251202_222255_add_featured_to_posts.down,
    name: '20251202_222255_add_featured_to_posts'
  },
];
