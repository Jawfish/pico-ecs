import {
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { Entity } from "../src/Entity.ts";
import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "entity";

Deno.test(`${domain} instantiates as expected`, (): void => {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  assertNotEquals(
    testEntity,
    undefined,
    "expected entity to instantiate, but it was undefined",
  );
  assertNotEquals(
    testEntity.uuid,
    undefined,
    "expected first entity instantiated to have an ID, but it was undefined",
  );
  assertEquals(
    testEntity.manager,
    testManager,
    `expected entity to have ${testManager.constructor.name} as a manager, received ${testEntity.manager.constructor.name}`,
  );
});

Deno.test(`${domain} can access its components`, (): void => {
  class TestComponent {
    x: number = 0;
    y: number = 0;
  }
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  const testComponent = new TestComponent();
  testEntity.addComponent(testComponent);
  assertEquals(testEntity.getComponent<TestComponent>().x, 0);
});

Deno.test(`${domain} can add components to itself`, (): void => {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  const testComponent = new TestComponent();
  testEntity.addComponent(testComponent);
  assertEquals(testEntity.components.length, 1);
  assertEquals(testEntity.components[0].constructor.name, "TestComponent");
  assertEquals(
    Object.getPrototypeOf(testEntity.components[0]),
    Object.getPrototypeOf(new TestComponent()),
  );
  assertEquals(
    testEntity.components[0],
    testComponent,
  );
  // entity should not be able to add the same component twice
  assertThrows(() => {
    testEntity.addComponent(testComponent);
  });
});

Deno.test(`${domain} can remove individual components from itself`, (): void => {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  const testComponent = new TestComponent();
  testEntity.addComponent(testComponent);
  testEntity.removeComponent<TestComponent>();
  assertEquals(
    testEntity.components.length,
    0,
  );
});

Deno.test(`${domain} can remove all components from itself`, (): void => {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(new TestComponent());
  testEntity.addComponent(new TestComponent2());
  testEntity.clearComponents();
  assertEquals(testEntity.components.length, 0);
  assertEquals(testEntity.components, []);
});

Deno.test(`${domain} knows if it has an individual component`, (): void => {
  class TestComponent {}
  const testComponent = new TestComponent();
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(testComponent);
  assertEquals(
    testEntity.hasComponent<TestComponent>(),
    true,
  );
});

Deno.test(`${domain} knows if it has a collection of components`, (): void => {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  const testComponent = new TestComponent();
  const testComponent2 = new TestComponent2();
  testEntity
    .addComponent(testComponent)
    .addComponent(testComponent2);
  assertEquals(
    testEntity.hasAllComponents([testComponent, testComponent2]),
    true,
    `entity does not contain the added components`,
  );
});

Deno.test(`${domain} knows if it has an individual tag`, (): void => {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.tag("Tag");
  assertEquals(testEntity.hasTag("Tag"), true);
});

Deno.test(`${domain} knows every tag it has`, (): void => {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testManager.addEntityToTag("testTag1", testEntity);
  assertEquals(testEntity.listTags(), ["testTag1"]);
});

Deno.test(`${domain} can add tags to itself`, (): void => {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.tag("testTag1").tag("testTag2");
  assertEquals(testEntity.listTags(), ["testTag1", "testTag2"]);
});

Deno.test(`${domain} can remove tags from itself`, (): void => {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.tag("testTag1").tag("testTag2").untag("testTag1");
  assertEquals(testEntity.hasTag("testTag2"), true);
  assertEquals(testEntity.hasTag("testTag1"), false);
});

Deno.test(`${domain} can remove itself`, (): void => {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.remove();
  assertEquals(testManager.listEntities(), []);
});
