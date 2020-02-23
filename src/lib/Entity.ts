import { EntityManager } from './EntityManager';
import { Component } from './Component';

let nextId = 0;

export class Entity {
  // tslint:disable-next-line:no-any
  [key: string]: any;
  id: number;
  manager: EntityManager;
  components: Component[];
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
  addComponent = (component: Component): Entity => {
    this.manager.addComponent(this, component);
    return this;
  };
  removeComponent = (component: any): Entity => {
    this.manager.removeComponent(this, component);
    return this;
  };
  removeAllComponents = () => this.manager.removeAllComponents(this);
  // tslint:disable-next-line:no-any
  hasComponent(component: any): boolean {
    let exists = false;
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].name === component.name) {
        exists = true;
        break;
      }
    }
    return exists;
  }
  hasAllComponents = (componentsToCheck: Component[]): boolean => {
    return componentsToCheck.every(component =>
      this.components.includes(component)
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
