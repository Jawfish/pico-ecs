import { EntityManager } from './lib/EntityManager';
import { TestComponentOne, TestComponentTwo } from '../test/TestComponents';

const testManager = new EntityManager();
const testEntity = testManager.createEntity();
testEntity.addComponent(new TestComponentOne(testEntity, 25, 35));
console.log(testEntity.testComponentOne.x);
