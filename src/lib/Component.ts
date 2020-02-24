import { Entity } from './Entity';

export class Component {
    name: string;
    entity: Entity | null;
    constructor() {
        this.name = this.constructor.name;
        this.entity = null;
    }
}
