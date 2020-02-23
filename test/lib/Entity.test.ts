import { EntityManager } from '../../src/lib/EntityManager';
import { Entity } from '../../src/lib/Entity';

class TestComponentOne {}
class TestComponentTwo {}
class TestComponentThree {}
class TestComponentFour {}

// TODO: change tests to not use/mutate the same entity
describe('Entity', () => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity
    .addComponent(new TestComponentOne())
    .addComponent(new TestComponentTwo())
    .addComponent(new TestComponentThree());
  it('knows if it has a component', () => {
    expect(testEntity.hasComponent('testComponentOne')).toEqual(true);
    expect(testEntity.hasComponent('TestComponentOne')).toEqual(false);
    expect(testEntity.hasComponent('testComponentTwo')).toEqual(true);
    expect(testEntity.hasComponent('testComponentThree')).toEqual(true);
    expect(testEntity.hasComponent('testComponentFour')).toEqual(false);
  });
  it('can check if it has every component in a list of components', () => {
    testEntity
      .removeComponent('testComponentTwo')
      .removeComponent('testComponentThree');
    const containsEveryTestFun = (
      // tslint:disable
      compareAgainst: any[],
      toCompare: any[]
      // tslint:enable
    ) => {
      let bool = true;
      for (let i = 0; i < toCompare.length; i++) {
        const item = toCompare[i];
        bool = bool && !!~compareAgainst.indexOf(item);
      }
      return bool;
    };
    expect(
      testEntity.hasAllComponents(['testComponentOne', 'testComponentTwo'])
    ).toEqual(false);
    expect(
      testEntity.hasAllComponents(['testComponentOne', 'testComponentThree'])
    ).toEqual(false);
    testEntity.addComponent(new TestComponentFour());
    expect(
      testEntity.hasAllComponents(['testComponentOne', 'testComponentFour'])
    ).toEqual(true);
    testEntity.removeComponent('testComponentThree');
    expect(
      testEntity.hasAllComponents([
        'testComponentOne',
        'testComponentTwo',
        'testComponentThree',
        'testComponentFour',
      ])
    ).toEqual(
      containsEveryTestFun(testEntity.components, [
        'testComponentOne',
        'testComponentTwo',
        'testComponentThree',
        'testComponentFour',
      ])
    );
  });
});
