import { Entity } from './Entity';

// TODO: implement groups
class Group {
    components: object[];
    entities: Entity[];
    constructor(components: object[] = [], entities: Entity[] = []) {
        this.components = components;
        this.entities = entities;
    }
}
