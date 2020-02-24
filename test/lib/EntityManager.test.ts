import { EntityManager } from '../../src/lib/EntityManager';
import { Entity } from '../../src/lib/Entity';
import { Component } from '../../src/lib/Component';

class TestComponentOne implements Component {
  name: string;
  entity: Entity | null;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.name = this.constructor.name;
    this.entity = null;
    this.x = x;
    this.y = y;
  }
}

class TestComponentTwo {
  name: string;
  entity: Entity | null;
  options: object;
  constructor(options: object) {
    this.name = this.constructor.name;
    this.entity = null;
    this.options = options;
  }
}
// TODO: change tests to not use/mutate the same entity
describe('EntityManager', () => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  it('creates an entity', () => {
    expect(typeof testEntity).toEqual('object');
    expect(testEntity.components).toEqual([]);
    expect(testEntity.id).toEqual(0);
    expect(testEntity.manager).toBe(testManager);
    expect(testEntity.tags).toEqual([]);
  });
  it('counts entities', () => {
    const testEntity2 = testManager.createEntity();
    expect(testManager.count()).toEqual(2);
  });
  it('adds components', () => {
    testEntity.addComponent(new TestComponentOne(17, 23)).addComponent(
      new TestComponentTwo({
        testOptionOne: 1,
        testOptionTwo: ['a'],
      })
    );
    expect(testEntity.components.length).toEqual(2);
    expect(testEntity.components[0].name).toEqual('TestComponentOne');
    expect(testEntity.components[1].name).toEqual('TestComponentTwo');
    expect(testEntity.TestComponentOne.entity).toBe(testEntity);
    expect(testEntity.TestComponentOne.x).toEqual(17);
    expect(testEntity.TestComponentOne.y).toEqual(23);
    expect(testEntity.TestComponentTwo.entity).toBe(testEntity);
    expect(testEntity.TestComponentTwo.name).toEqual('TestComponentTwo');
    expect(testEntity.TestComponentTwo.options.testOptionOne).toEqual(1);
    expect(testEntity.TestComponentTwo.options.testOptionTwo[0]).toEqual('a');
  });
  it('removes single components', () => {
    testEntity.removeComponent(TestComponentOne);
    expect(testEntity.components.length).toEqual(1);
    expect(testEntity.components[0].name).toEqual('TestComponentTwo');
    expect(testEntity.TestComponentOne).toEqual(undefined);
    expect(testEntity.TestComponentTwo.entity).toBe(testEntity);
  });
  it('removes entities', () => {
    const count = testManager.count();
    testEntity.remove();
    expect(testManager.count()).toEqual(count - 1);
  });
  it('adds tags', () => {
    testEntity
      .addTag('testTag1')
      .addTag('testTag2')
      .addTag('testTag3');
    expect(testEntity.tags).toEqual(['testTag1', 'testTag2', 'testTag3']);
    expect(testManager.listTags()).toEqual([
      'testTag1',
      'testTag2',
      'testTag3',
    ]);
  });
  it('removes tags', () => {
    testEntity.removeTag('testTag2');
    expect(testEntity.tags).toEqual(['testTag1', 'testTag3']);
  });
});
