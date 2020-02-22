import { Entity } from '../src/lib/Entity';

export class TestComponentOne {
  entity: Entity;
  x: number;
  y: number;
  constructor(entity: Entity, x: number, y: number) {
    this.entity = entity;
    this.x = x;
    this.y = y;
  }
}

export class TestComponentTwo {
  entity: Entity;
  name: string;
  options: object;
  constructor(entity: Entity, name: string, options: object) {
    this.entity = entity;
    this.name = name;
    this.options = options;
  }
}
