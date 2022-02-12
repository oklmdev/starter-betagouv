import { EventBus, GenericEvent } from './EventBus';

// en version fonction :
export const createInMemoryEventBus = <Event extends GenericEvent<string, unknown>>(): EventBus<Event> => {
  const _subscriptions: Partial<Record<Event['topic'], ((event: Event) => void | Promise<void>)[]>> = {};

  return {
    publish: async (event: Event) => {
      const topic: Event['topic'] = event.topic;

      const callbacks = _subscriptions[topic];
      if (callbacks === undefined) {
        console.warn({ eventTopic: event.topic }, `There are no subscriptions for this topic : '${event.topic}'`);
        return;
      }

      await Promise.all(
        callbacks.map(async (cb) => {
          await cb(event);
        })
      );
    },
    subscribe: async <Topic extends Event['topic']>(
      topic: Topic,
      callback: (event: Extract<Event, { topic: Topic }>) => void | Promise<void>
    ) => {
      if (!_subscriptions[topic]) {
        _subscriptions[topic] = [];
      }

      if (callback) {
        _subscriptions[topic]!.push(callback as any);
      }
    },
  };
};

// en version class :
export class InMemoryEventBus<Event extends GenericEvent<string, unknown>> implements EventBus<Event> {
  private subscriptions: Partial<Record<Event['topic'], ((event: Event) => void | Promise<void>)[]>> = {};

  public async publish(event: Event) {
    const topic: Event['topic'] = event.topic;

    const callbacks = this.subscriptions[topic];
    if (callbacks === undefined) {
      console.warn({ eventTopic: event.topic }, `There are no subscriptions for this topic : '${event.topic}'`);
      return;
    }

    await Promise.all(
      callbacks.map(async (cb) => {
        await cb(event);
      })
    );
  }

  public subscribe<Topic extends Event['topic']>(
    topic: Topic,
    callback: (event: Extract<Event, { topic: Topic }>) => void | Promise<void>
  ): void {
    if (!this.subscriptions[topic]) {
      this.subscriptions[topic] = [];
    }

    if (callback) {
      this.subscriptions[topic]!.push(callback as any);
    }
  }
}
