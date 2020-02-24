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
    let tagList = [];
    for (const tag in this.tags) {
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
    entity.components.forEach(component => entity.removeComponent(component));

  // currently doesn't work because it gets passed a new instance of a Component
  // and therefore entity.components.includes(component) always returns false
  removeComponent = (entity: Entity, component: Component) => {
    if (!entity.hasComponent(component)) return;
    entity.components = entity.components.filter(
      item => item.name !== component.name
    );

    delete entity.components[entity.components.indexOf(component)];
    delete entity[component.name];
  };
  queryComponents = (components: Component[]): Entity[] => {
    const entities: Entity[] = [];
    this.entities.forEach(entity => {
      components.forEach(component => {
        if (entity.hasComponent(component)) {
          entities.push(entity);
        }
      });
    });
    return entities;
  };
  queryTag = (tag: string): Entity[] => {
    let entities = this.tags[tag];
    if (entities === undefined) entities = this.tags[tag] = [];
    return entities;
  };
  count = (): number => {
    return this.entities.length;
  };
}
