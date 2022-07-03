import { BaseDomainEvent, makeDomainEvent } from '../libs/eventSourcing/types/DomainEvent';

export type InscriptionUser = BaseDomainEvent & {
  type: 'InscriptionUser';
  payload: {
    userId: string;
    username: string;
    email: string;
  };
};

export const InscriptionUser = (payload: InscriptionUser['payload']): InscriptionUser =>
  makeDomainEvent({
    type: 'InscriptionUser',
    payload,
  });
