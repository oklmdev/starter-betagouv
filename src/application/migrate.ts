import { getHistory } from './infra/eventStore';
import { projections } from './infra/projections/projections';
import { Projection } from '../archi/Projection';
import { seed } from './seeds';

async function migrate() {
  // Step 1: prepare the projections (ex: create the table)
  const projectionsToRebuild: Projection[] = [];
  for (const projection of projections) {
    if (await projection.requiresRebuild()) {
      await projection.reset();
      projectionsToRebuild.push(projection);
    }
  }

  // Step 2: Build the projections from history
  const events = await getHistory();
  for (const event of events) {
    for (const projection of projectionsToRebuild) {
      await projection.handleEvent(event);
    }
  }
}

migrate();
