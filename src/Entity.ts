import { EntityManager } from "./EntityManager.ts";
import { generate_uuidv4 } from "./Util.ts";
import { Component } from "./Component.ts";

export class Entity {
  private readonly _uuid: string = generate_uuidv4();
  private _manager: EntityManager;
  private _components: Object[];

  constructor(manager: EntityManager) {
    this._manager = manager;
    this._components = [];
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get manager(): EntityManager {
    return this._manager;
  }

  public get components(): Object[] {
    return this._components;
  }

  /**
   * @param {Object} component The component to add to this entity
   * @returns {Entity} This entity
   */
  addComponent = <T extends Component>(): Entity => {
    if (this.hasComponent<T>()) {
      throw "Tried to add an existing component to an entity";
    }
    this._components.push();
    return this;
  };

  getComponent = <T>(): T => {
    let component;
    this._components.forEach((c) => {
      if (<T> c) {
        component = c as T;
      }
    });
    if (component === undefined) {
      throw "Tried to get a non-existent component";
    }
    return component;
  };

  /**
   * @param {Object} component The component to remove from this entity
   * @returns {Entity} This entity
   */
  removeComponent = <T>(): Entity => {
    if (this.hasComponent<T>()) {
      this._components.forEach((component) => {
        if (component as T) {
          this._components.splice(this._components.indexOf(component), 1);
        }
      });
    }
    return this;
  };

  /**
   * Remove all components from this entity
   */
  clearComponents = (): Entity => {
    this._components = [];
    return this;
  };

  /**
   * @param {Object}  component The component to check this entity for
   * @returns {boolean} True if this entity has the specified component
   */
  hasComponent = <T>(): boolean => {
    let found = false;
    this._components.forEach((component) => {
      if (component as T) {
        found = true;
      }
    });
    return found;
  };

  /**
   * @param {Object[]} componentsToCheck Array of compnents to check this entity for
   * @returns {boolean} True if this entity has all specified components
   */
  hasAllComponents = <T>(componentsToCheck: T[]): boolean => {
    let found = false;
    componentsToCheck.forEach((component) => {
      if (this.hasComponent<T>()) {
        found = true;
      }
    });
    return found;
  };

  /**
   * @param {string} tag The tag to check this entity for
   * @returns {boolean} True if this entity has the specified tag
   */
  hasTag = (tag: string): boolean => this.manager.tagContainsEntity(tag, this);

  listTags = (): string[] => {
    let tags: string[] = [];
    this.manager.listUsedTags().forEach((tag) => {
      if (this.hasTag(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  };

  /**
   * @param {string} tag Tag to add to this entity
   * @returns {Entity}
   */
  tag = (tag: string): Entity => {
    this.manager.addEntityToTag(tag, this);
    return this;
  };

  /**
   * @param {string} tag The tag to remove from this entity
   */
  untag = (tag: string): Entity => {
    this.manager.removeEntityFromTag(tag, this);
    return this;
  };

  /**
   * Remove this entity instance
   */
  remove = () => this.manager.removeEntity(this);

  hasCollection = () => void {};
  addCollection = () => void {};
  removeCollection = () => void {};
  addToGroup = () => void {};
  removeFromGroup = () => void {};
}
