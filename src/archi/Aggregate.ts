import { DomainEvent } from './DomainEvent';

export type PublishEvent = (event: DomainEvent) => void | Promise<void>;

export type Aggregate<Actions = any> = {
  getPendingEvents: () => DomainEvent[]; // Used by the repository to save pending events after command
} & Actions;

export type AggregateId = string;

export interface AggregateActionDeps<AggregateState = any> {
  aggregateId: AggregateId;
  getState: () => AggregateState;
  publishEvent: PublishEvent;
}
export interface AggregateAction<AggregateState, ActionArgs> {
  (deps: AggregateActionDeps<AggregateState>): (args: ActionArgs) => void;
}