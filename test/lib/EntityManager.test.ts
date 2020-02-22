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

describe('EntityManager', () => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  it('properly creates an entity', () => {
    expect(typeof testEntity).toEqual('object');
    expect(testEntity.components).toEqual([]);
    expect(testEntity.id).toEqual(0);
    expect(testEntity.manager).toBe(testManager);
    expect(testEntity.tags).toEqual([]);
  });
  it('properly adds components', () => {
    testEntity.addComponent(new TestComponentOne(testEntity, 17, 23));
    testEntity.addComponent(
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
});
