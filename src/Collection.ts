import { EntityManager } from "./EntityManager.ts";

export class Collection {
  manager: EntityManager;
  components: object[];
  constructor(manager: EntityManager, components: object[] = []) {
    this.manager = manager;
    this.components = components;
  }
}
