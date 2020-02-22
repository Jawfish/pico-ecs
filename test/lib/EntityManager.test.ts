import { EntityManager } from '../../src/lib/EntityManager';
import { TestComponentOne, TestComponentTwo } from '../TestComponents';

const testManager = new EntityManager();
const testEntity = testManager.createEntity();
testEntity.addComponent(new TestComponentOne(testEntity, 25, 35));
console.log(testEntity.testComponentOne.x);

describe('placeholder', () => {
  it('exists', () => {
    expect(true).toEqual(true);
  });
});
