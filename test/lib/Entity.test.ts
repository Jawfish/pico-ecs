import { EntityManager } from '../../src/lib/EntityManager';
import { Entity } from '../../src/lib/Entity';
import { Component } from '../../src/lib/Component';

class TestComponentOne implements Component {
  name: string;
  entity: Entity | null;
  constructor() {
    this.name = this.constructor.name;
    this.entity = null;
  }
}

class TestComponentTwo implements Component {
  name: string;
  entity: Entity | null;
  constructor() {
    this.name = this.constructor.name;
    this.entity = null;
  }
}
class TestComponentThree implements Component {
  name: string;
  entity: Entity | null;
  constructor() {
    this.name = this.constructor.name;
    this.entity = null;
  }
}
class TestComponentFour implements Component {
  name: string;
  entity: Entity | null;
  constructor() {
    this.name = this.constructor.name;
    this.entity = null;
  }
}

// TODO: change tests to not use/mutate the same entity
describe('Entity', () => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity
    .addComponent(new TestComponentOne())
    .addComponent(new TestComponentTwo())
    .addComponent(new TestComponentThree());

  it('knows if it has a component', () => {
    expect(testEntity.hasComponent(TestComponentOne)).toEqual(true);
    expect(testEntity.hasComponent(TestComponentTwo)).toEqual(true);
    expect(testEntity.hasComponent(TestComponentThree)).toEqual(true);
    expect(testEntity.hasComponent(TestComponentFour)).toEqual(false);
  });
  it('can check if it has every component in a list of components', () => {
    const containsEveryTestFun = (
      // tslint:disable
      compareAgainst: any[],
      toCompare: any[]
      // tslint:enable
    ) => {
      let bool = true;
      for (let i = 0; i < toCompare.length; i++) {
        const item = toCompare[i];
        // tslint:disable-next-line:no-bitwise
        bool = bool && !!~compareAgainst.indexOf(item);
      }
      return bool;
    };
    expect(
      testEntity.hasAllComponents([
        new TestComponentOne(),
        new TestComponentTwo(),
      ])
    ).toEqual(false);
    expect(
      testEntity.hasAllComponents([
        new TestComponentOne(),
        new TestComponentThree(),
      ])
    ).toEqual(false);
    testEntity.addComponent(new TestComponentFour());
    expect(
      testEntity.hasAllComponents([
        new TestComponentOne(),
        new TestComponentTwo(),
        new TestComponentThree(),
        new TestComponentFour(),
      ])
    ).toEqual(
      containsEveryTestFun(testEntity.components, [
        new TestComponentOne(),
        new TestComponentTwo(),
        new TestComponentThree(),
        new TestComponentFour(),
      ])
    );
  });
});
