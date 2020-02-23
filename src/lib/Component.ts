import { Entity } from './Entity';
export interface Component {
  name: string;
  entity: Entity | null;
}
