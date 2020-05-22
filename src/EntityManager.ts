import { Entity } from "./Entity.ts";

export class EntityManager {
  private tags: { [key: string]: Entity[] };
  private entities: Entity[];
  constructor() {
    this.tags = {};
    this.entities = [];
  }

  /**
     * Create an entity
     * @returns {Entity} The created entity
     */
  createEntity = (): Entity => {
    const entity: Entity = new Entity(this);
    this.entities.push(entity);
    entity.manager = this;
    return entity;
  };

  /**
     * Get a list of all entity instances
     * @returns {Entity[]} Array of entity instances
     */
  listEntities = (): Entity[] => this.entities;

  /**
     * Remove entity instances that contain the specified tag
     * @param {string} tag The tag to check entities for
     */
  removeEntitiesByTag = (tag: string) => {
    const entities = this.tags[tag];
    entities.forEach((entity: Entity) => {
      entity.remove();
    });
  };

  /**
     * Removes all existing entities
     */
  removeAllEntities = () => {
    this.entities.forEach((entity) => {
      entity.remove();
    });
  };

  /**
     * Remove the specified entity
     * @param {Entity} entity The entity to remove
     */
  removeEntity = (entity: Entity) => {
    if (!this.entities.includes(entity)) {
      throw new Error("Tried to remove nonexistent entity");
    }
    this.removeAllComponents(entity);
    for (var property in entity) {
      if (entity.hasOwnProperty(property)) {
        delete entity[property];
      }
    }
    this.entities = this.entities.filter((item) => item !== entity);
  };

  /**
     * Adds a tag to the specified entity
     * @param {Entity} entity The entity to add the tag to
     * @param {string} tag The tag to add to the entity
     */
  addTag = (entity: Entity, tag: string) => {
    if (tag === "") {
      throw new Error("Tried to add an empty tag");
    }
    let entitiesWithTag = this.tags[tag];
    if (!entitiesWithTag) entitiesWithTag = this.tags[tag] = [];
    if (entitiesWithTag.includes(entity)) return;

    entitiesWithTag.push(entity);
    entity.tags.push(tag);
  };

  /**
     * Removes the specified tag from the entity
     * @param {Entity} entity The entity to remove the tag from
     * @param {string} tag The tag to remove from the entity
     */
  removeTag = (entity: Entity, tag: string) => {
    const entities = this.tags[tag];
    if (!entities) return;

    const index = entities.indexOf(entity);
    if (index === -1) return;

    entities.splice(index, 1);
    entity.tags.splice(entity.tags.indexOf(tag), 1);
  };

  /**
     * List all existing tags on this manager
     * @returns {string[]} Array of all tags on this manager
     */
  listTags = (): string[] => {
    const tagList = [];
    for (const tag of Object.keys(this.tags)) {
      tagList.push(tag);
    }
    return tagList;
  };

  /**
     * Adds a component to the specified entity
     * @param {Entity} entity The entity to add a component to
     * @param {Object} component The component to add to the entity
     */
  addComponent = (entity: Entity, component: Object) => {
    if (entity.components.includes(component)) return;
    entity[component.constructor.name] = component;
    entity.components.push(component);
  };

  /**
     * Remove all components from the specified entity
     * @param {Entity} entity The entity to remove all components from
     */
  removeAllComponents = (entity: Entity) =>
    entity.components.forEach((component) =>
      entity.removeComponent(component.constructor.name)
    );

  /**
     * Remove the specified component from the specified entity
     * @param {Entity} entity The entity from which to remove the component
     * @param {string} component The component to remove from the entity
     */
  removeComponent = (entity: Entity, component: string) => {
    if (!entity.hasComponent(component)) return;
    entity.components = entity.components.filter(
      (item) => item.constructor.name !== component,
    );

    delete entity.components[entity.components.indexOf(component)];
    delete entity[component];
  };

  /**
     * Get a list of all entities that have the specified components
     * @param {string[]} components The components to check entities for
     * @returns {Entity[]} Array of entities that contain the specified components
     */
  queryComponentOwners = (components: string[]): Entity[] => {
    const componentOwners: Entity[] = [];
    this.entities.forEach((entity) => {
      if (!entity.hasAllComponents(components)) {
        return;
      }
      componentOwners.push(entity);
    });
    return componentOwners;
  };

  /**
     * Get a list of all entities that haev the specified tag
     * @param {string} tag The tag to check entities for
     * @returns {Entity[]} Array of entities that have the specified tag
     */
  queryTagOwners = (tag: string): Entity[] => {
    let entities = this.tags[tag];
    if (entities === undefined) entities = this.tags[tag] = [];
    return entities;
  };

  /**
     * Count how many entities exist on this manager
     * @returns {number} The number of entities that exist on this manager
     */
  count = (): number => {
    return this.entities.length;
  };
}
