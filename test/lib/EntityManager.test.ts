import { EntityManager } from '../../src/lib/EntityManager';
import { Component } from '../../src/lib/Component';

class TestComponentOne extends Component {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

class TestComponentTwo extends Component {
  options: object;
  constructor(options: object) {
    super();
    this.options = options;
  }
}
// TODO: change tests to not use/mutate the same entities, rely on each other, or depend on execution order
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
  it('lists entities', () => {
    expect(testManager.listEntities()).toEqual([testEntity]);
  });
  it('counts entities', () => {
    const testEntity2 = testManager.createEntity();
    expect(testManager.count()).toEqual(2);
    testEntity2.remove();
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
  it('removes all components', () => {
    testEntity.addComponent(new TestComponentOne(35, 35));
    testEntity.removeAllComponents();
    expect(testEntity.components).toEqual([]);
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
  it('queries tags', () => {
    expect(testManager.queryTag('testTag1')).toEqual([testEntity]);
  });
  it('removes entities', () => {
    testEntity.remove();
    expect(testManager.listEntities()).toEqual([]);
    testManager.createEntity();
    testManager.createEntity();
    testManager.createEntity();
    testManager.createEntity();
    testManager.removeAllEntities();
    expect(testManager.listEntities()).toEqual([]);
    expect(testManager.count()).toEqual(0);
  });
});
