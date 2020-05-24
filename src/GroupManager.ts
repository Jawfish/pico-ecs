import { Group } from "./Group.ts";
import { Entity } from "./Entity.ts";

export class GroupManager {
  private _groups: Group[] = [];

  public get groups(): Group[] {
    return this._groups;
  }
  public set groups(v: Group[]) {
    this._groups = v;
  }

  createGroup = (): Group => {
    const group: Group = new Group(this);
    this.groups.push(group);
    return group;
  };

  mergeGroups = (...groups: Group[]): Group => {
    const entities: Entity[] = [];
    groups.forEach((group) => {
      group.entities.forEach((entity) => {
        if (!entities.includes(entity)) {
          entities.push(entity);
        }
      });
    });
    const group = new Group(this, entities);
    this.groups.push(group);
    return group;
  };
}
