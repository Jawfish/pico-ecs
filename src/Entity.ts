import { EntityManager } from "./EntityManager.ts";
import { generate_uuidv4 } from "./Util.ts";

export class Entity {
  // tslint:disable-next-line:no-any
  // necessary to prevent TypeScript compiler errors relating to indexing entities with strings
  [key: string]: any
  uuid: string;
  manager: EntityManager;
  components: Object[];
  tags: string[];

  constructor(manager: EntityManager) {
    this.uuid = generate_uuidv4();
    this.manager = manager;
    this.components = [];
    this.tags = [];
  }

  /**
   * @param {Object} component The component to add to this entity
   * @returns {Entity} This entity
   */
  addComponent = (component: Object): Entity => {
    this.manager.addComponent(this, component);
    return this;
  };

  /**
   * @param {string} component The component to remove rom this entity
   * @returns {Entity} This entity
   */
  removeComponent = (component: string): Entity => {
    this.manager.removeComponent(this, component);
    return this;
  };

  /**
   * Remove all components from this entity
   */
  removeAllComponents = () => this.manager.removeAllComponents(this);

  /**
   * @param {string}  component The component to check this entity for
   * @returns {boolean} True if this entity has the specified component
   */
  hasComponent = (component: string): boolean => {
    let exists = false;
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].constructor.name === component) {
        exists = true;
        break;
      }
    }
    return exists;
  };

  /**
   * @param {string[]} componentsToCheck Array of compnents to check this entity for
   * @returns {boolean} True if this entity has all specified components
   */
  hasAllComponents = (componentsToCheck: string[]): boolean => {
    for (let i = 0; i < componentsToCheck.length; i++) {
      if (!this.hasComponent(componentsToCheck[i])) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {string} tag The tag to check this entity for
   * @returns {boolean} True if this entity has the specified tag
   */
  hasTag = (tag: string): boolean => this.tags.includes(tag);

  /**
   * @param {string} tag Tag to add to this entity
   * @returns {Entity}
   */
  addTag = (tag: string): Entity => {
    this.manager.addTag(this, tag);
    return this;
  };

  /**
   * @param {string} tag The tag to remove from this entity
   */
  removeTag = (tag: string) => this.manager.removeTag(this, tag);

  /**
   * Remove this entity instance
   */
  remove = () => this.manager.removeEntity(this);
}
