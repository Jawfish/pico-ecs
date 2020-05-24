import { Entity } from "./Entity.ts";

export class EntityManager {
  private _tags: { [key: string]: Entity[] };
  private _entities: Entity[];
  constructor() {
    this._tags = {};
    this._entities = [];
  }

  public get entities(): Entity[] {
    return this._entities;
  }

  public get tags(): { [key: string]: Entity[] } {
    return this._tags;
  }

  addEntityToTag = (tag: string, entity: Entity): EntityManager => {
    if (tag === "") return this;
    if (this._tags[tag] && this._tags[tag].includes(entity)) return this;
    if (tag in this.tags && !this.tags[tag].includes(entity)) {
      this.tags[tag].push(entity);
    } else {
      this.tags[tag] = [entity];
    }
    return this;
  };

  removeEntityFromTag = (tag: string, entity: Entity): EntityManager => {
    if (tag === "") return this;
    if (!this._tags[tag] && this._tags[tag].includes(entity)) return this;
    this._tags[tag].splice(this.tags[tag].indexOf(entity), 1);
    return this;
  };

  tagContainsEntity = (tag: string, entity: Entity) =>
    this._tags[tag].includes(entity);

  /**
     * Create an entity
     * @returns {Entity} The created entity
     */
  createEntity = (): Entity => {
    const entity: Entity = new Entity(this);
    this.entities.push(entity);
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
    entity.clearComponents();
    this._entities = this.entities.filter((item) => item !== entity);
  };

  /**
     * List all existing tags on this manager
     * @returns {string[]} Array of all tags on this manager
     */
  listUsedTags = (): string[] => {
    const tagList = [];
    for (const tag of Object.keys(this.tags)) {
      tagList.push(tag);
    }
    return tagList;
  };

  /**
   * 
     * Get a list of all entities that have the specified components
     * @param {T[]} components The components to check entities for
     * @returns {Entity[]} Array of entities that contain the specified components
     */
  queryComponentOwners = <T>(components: T[]): Entity[] => {
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
