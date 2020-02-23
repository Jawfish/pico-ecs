import { EntityPool } from './EntityPool';
import { Entity } from './Entity';

export class EntityManager {
  private tags: { [key: string]: Entity[] };
  private entities: Entity[];
  private entityPool: EntityPool;
  constructor() {
    this.tags = {};
    this.entities = [];
    this.entityPool = new EntityPool(() => new Entity(this));
  }
  createEntity = (): Entity => {
    const entity = this.entityPool.get();
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
    if (!this.entities.includes(entity))
      throw new Error('Tried to remove nonexistent entity');
    this.removeAllComponents(entity);
    entity.tags.length = 0;
    this.entities = this.entities.filter(item => item !== entity);
    // TODO: deal with this
    // TODO: remove tags
    // entity.manager = null;
    this.entityPool.recycle(entity);
  };
  addTag = (entity: Entity, tag: string) => {
    let entities = this.tags[tag];
    if (!entities) entities = this.tags[tag] = [];
    if (entities.includes(entity)) return;
    entities.push(entity);
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

  addComponent = (entity: Entity, component: {}) => {
    if (component.constructor.name in entity.components) return;
    const componentName = this.componentPropertyName(component);
    entity[componentName] = component;
    entity[componentName].entity = entity;
    entity.components.push(componentName);
  };
  removeAllComponents = (entity: Entity) => {
    // tslint:disable-next-line:forin
    for (const component in entity.components) {
      entity.removeComponent(entity.components[component]);
    }
  };

  removeComponent = (entity: Entity, component: string) => {
    const components = entity.components;
    const componentIndex = components.indexOf(component);
    if (entity.hasComponent(component)) {
      delete entity[component];
      delete components[componentIndex];
      components.splice(componentIndex, 1);
    }
  };
  queryComponents = (components: string[]): Entity[] => {
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
  componentPropertyName = (component: {}): string => {
    const name = component.constructor.name;
    if (!name) throw new Error('Component property name is empty');

    return name.charAt(0).toLowerCase() + name.slice(1);
  };
}

// TODO: implement groups
// class Group {
//   components: object[];
//   entities: Entity[];
//   constructor(components: object[], entities: Entity[] = []) {
//     this.components = components || [];
//     this.entities = entities || [];
//   }
// }
