import { ProjectionTable } from '../libs/eventSourcing/types/Projection';
import { demandeTable } from './demandes';

export const tables: ProjectionTable[] = [demandeTable];
