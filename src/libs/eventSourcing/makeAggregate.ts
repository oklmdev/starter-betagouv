import { AggregateId, Aggregate, AggregateAction, AggregateActionDeps, DomainEvent } from './types';

export interface MakeAggregateProps<AggregateState, Actions> {
  initialState: AggregateState;
  actions: Actions;
  buildState: (state: AggregateState, event: DomainEvent) => AggregateState;
}

/**
 * Crée un agrégat qui peut transitionner d'un état initial vers d'autres états au travers des actions disponibles de l'agrégat.
 * @param initialState État initial de l'agrégat
 * @param actions Commandes disponibles pour agir sur l'état de l'agrégat
 * @param buildState Fonction qui permet de passer d'un état à un autre en fonction d'un évènement à appliquer
 * @returns
 * Une fonction qui prend l'id de l'agrégat et son historique d'évènement passés et
 * retourne l'agrégat à jour avec la liste des actions disponibles et les évènements en attente d'application sur l'agrégat.
 */
export const makeAggregate =
  <AggregateState, Actions extends Record<string, AggregateAction<AggregateState, any>>>({
    initialState,
    actions,
    buildState
  }: MakeAggregateProps<AggregateState, Actions>) =>
  (aggregateId: AggregateId, history: DomainEvent[] = []): Aggregate<ExtractActions<Actions>> => {
    const pendingEvents: DomainEvent[] = [];

    let state = history.reduce(
      (state: AggregateState, event: DomainEvent): AggregateState => buildState(state, event),
      initialState
    );

    const publishEvent = <Event extends DomainEvent>(event: Event) => {
      state = buildState(state, event);
      pendingEvents.push(event);
    };

    const getState = () => state;

    return {
      ...bindActions({ aggregateId, getState, publishEvent }, actions),
      getPendingEvents: () => pendingEvents
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
