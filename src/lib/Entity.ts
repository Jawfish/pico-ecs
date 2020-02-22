import { EntityManager } from './EntityManager';

let nextId = 0;

interface StringKey {
  [key: string]: any;
}

export class Entity implements StringKey {
  [key: string]: any;
  id: number;
  manager: EntityManager;
  components: string[];
  tags: string[];
  constructor(manager: EntityManager) {
    this.id = nextId++;
    this.manager = manager;
    this.components = [];
    this.tags = [];
  }
  init = (manager: EntityManager) => {
    this.id = nextId++;
    this.manager = manager;
    this.components = [];
    this.tags.length = 0;
  };
  addComponent = (component: {}): Entity => {
    this.manager.addComponent(this, component);
    return this;
  };
  removeComponent = (component: string): Entity => {
    this.manager.removeComponent(this, component);
    return this;
  };
  removeAllComponents = () => this.manager.removeAllComponents(this);
  hasComponent = (componentTocheck: string): boolean => {
    if (this.components.includes(componentTocheck)) {
      return true;
    }
    return false;
  };
  hasAllComponents = (componentsToCheck: object[]): boolean => {
    return componentsToCheck.every(component =>
      this.components.hasOwnProperty(component.constructor.name)
    );
  };
  hasTag = (tag: string) => this.tags.includes(tag);
  addTag = (tag: string) => {
    this.manager.addTag(this, tag);
    return this;
  };
  removeTag = (tag: string) => {
    this.manager.removeTag(this, tag);
  };
  remove = () => this.manager.removeEntity(this);
}
