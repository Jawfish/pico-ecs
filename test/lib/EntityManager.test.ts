import { EntityManager } from '../../src/lib/EntityManager';
import { Entity } from '../../src/lib/Entity';

class TestComponentOne {
  entity: Entity;
  x: number;
  y: number;
  constructor(entity: Entity, x: number, y: number) {
    this.entity = entity;
    this.x = x;
    this.y = y;
  }
}

class TestComponentTwo {
  entity: Entity;
  name: string;
  options: object;
  constructor(entity: Entity, name: string, options: object) {
    this.entity = entity;
    this.name = name;
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
    testEntity
      .addComponent(new TestComponentOne(testEntity, 17, 23))
      .addComponent(
        new TestComponentTwo(testEntity, 'test name', {
          testOptionOne: 1,
          testOptionTwo: ['a'],
        })
      );
    expect(testEntity.components.length).toEqual(2);
    expect(testEntity.components[0]).toEqual('testComponentOne');
    expect(testEntity.components[1]).toEqual('testComponentTwo');
    expect(testEntity.testComponentOne.entity).toBe(testEntity);
    expect(testEntity.testComponentOne.x).toEqual(17);
    expect(testEntity.testComponentOne.y).toEqual(23);
    expect(testEntity.testComponentTwo.entity).toBe(testEntity);
    expect(testEntity.testComponentTwo.name).toEqual('test name');
    expect(testEntity.testComponentTwo.options.testOptionOne).toEqual(1);
    expect(testEntity.testComponentTwo.options.testOptionTwo[0]).toEqual('a');
  });
  it('removes single components', () => {
    testEntity.removeComponent('testComponentOne');
    expect(testEntity.components.length).toEqual(1);
    expect(testEntity.components[0]).toEqual('testComponentTwo');
    expect(testEntity.testComponentOne).toEqual(undefined);
    expect(testEntity.testComponentTwo.entity).toBe(testEntity);
  });
  it('removes entities', () => {
    const count = testManager.count();
    testEntity.remove();
    expect(testManager.count()).toEqual(count - 1);
  });
});
