import { EntityManager } from '../../src/lib/EntityManager';
import { Component } from '../../src/lib/Component';

class TestComponentOne extends Component {
    constructor() {
        super();
    }
}
class TestComponentTwo extends Component {
    constructor() {
        super();
    }
}
class TestComponentThree extends Component {
    constructor() {
        super();
    }
}
class TestComponentFour extends Component {
    constructor() {
        super();
    }
}

// TODO: change tests to not use/mutate the same entities, rely on each other, or depend on execution order
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
        expect(
            testEntity.hasAllComponents([TestComponentOne, TestComponentThree])
        ).toEqual(true);
        expect(
            testEntity.hasAllComponents([
                TestComponentOne,
                TestComponentTwo,
                TestComponentThree,
                TestComponentFour,
            ])
        ).toEqual(false);
        testEntity.addComponent(new TestComponentFour());
        expect(
            testEntity.hasAllComponents([
                TestComponentOne,
                TestComponentTwo,
                TestComponentThree,
                TestComponentFour,
            ])
        ).toEqual(true);
    });
    it('knows if it has a tag', () => {
        testEntity
            .addTag('testTag1')
            .addTag('testTag2')
            .addTag('testTag3');
        expect(testEntity.hasTag('testTag1')).toEqual(true);
        expect(testEntity.hasTag('testTag2')).toEqual(true);
        expect(testEntity.hasTag('testTag3')).toEqual(true);
        expect(testEntity.hasTag('testTag4')).toEqual(false);
        testEntity.removeTag('testTag2');
        expect(testEntity.hasTag('testTag1')).toEqual(true);
        expect(testEntity.hasTag('testTag2')).toEqual(false);
        expect(testEntity.hasTag('testTag3')).toEqual(true);
    });
});
