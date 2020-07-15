import { Entity } from "./Entity.ts";
import { GroupManager } from "./GroupManager.ts";

export class Group {
  private _manager: GroupManager;
  private _entities: Entity[];
  constructor(manager: GroupManager, entities: Entity[] = []) {
    this._manager = manager;
    this._entities = entities;
  }

  public get entities(): Entity[] {
    return this._entities;
  }

  public get manager(): GroupManager {
    return this._manager;
  }

  addEntity = (entity: Entity): Group => {
    this.entities.push(entity);
    return this;
  };

  addEntities = (entities: Entity[]): Group => {
    entities.forEach((entity) => this.entities.push(entity));
    return this;
  };

  removeEntity = (entity: Entity): Group => {
    this._entities = this.entities.filter((item) => item !== entity);
    return this;
  };

  removeEntities = (entities: Entity[]): Group => {
    entities.forEach((entity) => this.removeEntity(entity));
    return this;
  };

  removeAllEntities = (): Group => {
    this.entities.forEach((entity) => {
      this.removeEntity(entity);
    });
    return this;
  };

  hasEntity = (entity: Entity): boolean => {
    return this.entities.includes(entity);
  };

  listEntities = (): Entity[] => this.entities;

  copyFromGroup = (group: Group): Group => {
    group.entities.forEach((entity) => {
      if (!this.hasEntity(entity)) {
        this.addEntity(entity);
      }
    });
    return this;
  };
}
