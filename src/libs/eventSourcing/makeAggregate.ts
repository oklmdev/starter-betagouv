import { AggregateId, PublishEvent, Aggregate, AggregateAction, AggregateActionDeps } from './types/Aggregate';
import { DomainEvent } from './types/DomainEvent';

export interface MakeAggregateProps<State, Actions> {
  initialState: State;
  actions: Actions;
  buildState: (state: State, event: DomainEvent) => State;
}
export const makeAggregate =
  <AggregateState, Actions extends Record<string, AggregateAction<AggregateState, any>>>({
    initialState,
    actions,
    buildState,
  }: MakeAggregateProps<AggregateState, Actions>) =>
  (aggregateId: AggregateId, history?: DomainEvent[]): Aggregate<ExtractActions<Actions>> => {
    const pendingEvents: DomainEvent[] = [];

    // Set the initial state
    let state: AggregateState = initialState;

    // Update the state by calling updateState on each event in the history
    if (history) {
      for (const event of history) {
        state = buildState(state, event);
      }
    }

    const publishEvent = <Event extends DomainEvent>(event: Event) => {
      state = buildState(state, event);
      pendingEvents.push(event);
    };

    const getState = () => state;

    return {
      ...bindActions({ aggregateId, getState, publishEvent }, actions),
      getPendingEvents: () => pendingEvents,
    };
  };

/**
 * For each action in the map, inject the dependencies to get a map of callable actions
 * @param deps aggregate action dependencies (aggregateId, getState, publishEvent)
 * @param actions a map of raw actions (without dependencies)
 * @returns a map of callable actions (with dependencies)
 */
function bindActions<Actions extends Record<string, AggregateAction<any, any>>>(
  deps: AggregateActionDeps,
  actions: Actions
): ExtractActions<Actions> {
  const { aggregateId, getState, publishEvent } = deps;
  return Object.entries(actions).reduce(
    (map, [actionName, makeAction]) => ({ ...map, [actionName]: makeAction({ aggregateId, getState, publishEvent }) }),
    {} as any
  );
}

// Given an { [actionName]: (deps) => action }, returns { [actionName]: action }
type ExtractActions<T extends Record<string, AggregateAction<any, any>>> = {
  [Key in keyof T]: ReturnType<T[Key]>;
};
