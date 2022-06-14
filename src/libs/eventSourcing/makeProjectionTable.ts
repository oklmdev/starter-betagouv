import { ProjectionTable } from './types/Projection';
import { makeEventDispatcher } from './makeEventDispatcher';

export function makeProjectionTable(args: {
  name: ProjectionTable['name'];
  reset: ProjectionTable['reset'];
  requiresRebuild?: ProjectionTable['requiresRebuild'];
}): ProjectionTable {
  const { name, requiresRebuild, reset } = args;

  const { on, handleEvent } = makeEventDispatcher();

  return {
    on,
    handleEvent,
    name,
    reset,
    requiresRebuild: requiresRebuild ? requiresRebuild : () => true,
  };
}
