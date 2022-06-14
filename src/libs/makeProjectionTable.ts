import { EventDispatcher } from './archi/EventDispatcher';
import { Projection } from './archi/Projection';
import { makeEventDispatcher } from './makeEventDispatcher';

export function makeProjectionTable(args: {
  name: Projection['name'];
  requiresRebuild?: Projection['requiresRebuild'];
  reset: Projection['reset'];
}): Projection & EventDispatcher {
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
