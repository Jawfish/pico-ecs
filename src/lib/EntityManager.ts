import { Entity } from './Entity';
import { Component } from './Component';

export class EntityManager {
    private tags: { [key: string]: Entity[] };
    private entities: Entity[];
    constructor() {
        this.tags = {};
        this.entities = [];
    }

    createEntity = (): Entity => {
        const entity: Entity = new Entity(this);
        this.entities.push(entity);
        entity.manager = this;
        return entity;
    };

    listEntities = (): Entity[] => this.entities;

    removeEntitiesByTag = (tag: string) => {
        const entities = this.tags[tag];
        entities.forEach((entity: Entity) => {
            entity.remove();
        });
    };

    removeAllEntities = () => {
        this.entities.forEach(entity => {
            entity.remove();
        });
    };

    removeEntity = (entity: Entity) => {
        if (!this.entities.includes(entity)) {
            throw new Error('Tried to remove nonexistent entity');
        }
        this.removeAllComponents(entity);
        this.entities = this.entities.filter(item => item !== entity);
        this.listEntities();
    };

    addTag = (entity: Entity, tag: string) => {
        if (tag === '') {
            throw new Error('Tried to add an empty tag');
        }
        let entitiesWithTag = this.tags[tag];
        if (!entitiesWithTag) entitiesWithTag = this.tags[tag] = [];
        if (entitiesWithTag.includes(entity)) return;

        entitiesWithTag.push(entity);
        entity.tags.push(tag);
    };

    removeTag = (entity: Entity, tag: string) => {
        const entities = this.tags[tag];
        if (!entities) return;

        const index = entities.indexOf(entity);
        if (index === -1) return;

        entities.splice(index, 1);
        entity.tags.splice(entity.tags.indexOf(tag), 1);
    };

    listTags = (): string[] => {
        const tagList = [];
        for (const tag of Object.keys(this.tags)) {
            tagList.push(tag);
        }
        return tagList;
    };

    addComponent = (entity: Entity, component: Component) => {
        if (entity.components.includes(component)) return;
        entity[component.name] = component;
        entity[component.name].entity = entity;
        entity.components.push(component);
    };

    removeAllComponents = (entity: Entity) =>
        entity.components.forEach(component =>
            entity.removeComponent(component)
        );

    // tslint:disable-next-line:no-any
    removeComponent = (entity: Entity, component: any) => {
        if (!entity.hasComponent(component)) return;
        entity.components = entity.components.filter(
            item => item.name !== component.name
        );

        delete entity.components[entity.components.indexOf(component)];
        delete entity[component.name];
    };

    // tslint:disable-next-line:no-any
    queryComponentOwners = (components: any[]): Entity[] => {
        const componentOwners: Entity[] = [];
        this.entities.forEach(entity => {
            if (!entity.hasAllComponents(components)) {
                return;
            }
            componentOwners.push(entity);
        });
        return componentOwners;
    };

    queryTagOwners = (tag: string): Entity[] => {
        let entities = this.tags[tag];
        if (entities === undefined) entities = this.tags[tag] = [];
        return entities;
    };

    count = (): number => {
        return this.entities.length;
    };
}
