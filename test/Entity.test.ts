import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { Entity } from "../src/Entity.ts";
import { EntityManager } from "../src/EntityManager.ts";

const domain: string = "entity";

Deno.test(`${domain} instantiates as expected`, function (): void {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  const testEntity2 = new Entity(testManager);
  assertEquals(
    testEntity.components.length,
    0,
    `expected entity to have 0 components, received ${testEntity.components.length}`,
  );
  assertEquals(
    testEntity.tags.length,
    0,
    "found tags on a fresh instantiation of an entity; should be empty",
  );
  assertNotEquals(
    testEntity.uuid,
    undefined,
    `expected first entity instantiated to have an ID, found ${testEntity.uuid}`,
  );
  assertEquals(
    testEntity.manager,
    testManager,
    `expected entity to have ${testManager.constructor.name} as a manager, received ${testEntity.manager.constructor.name}`,
  );
});

Deno.test(`${domain} can add components to itself`, function (): void {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(new TestComponent());
  assertEquals(testEntity.components.length, 1);
  assertEquals(testEntity.components[0].constructor.name, "TestComponent");
  assertEquals(
    Object.getPrototypeOf(testEntity.components[0]),
    Object.getPrototypeOf(new TestComponent()),
  );
  assertEquals(
    Object.getPrototypeOf(testEntity.TestComponent),
    Object.getPrototypeOf(new TestComponent()),
  );
});

Deno.test(`${domain} can remove individual components from itself`, function (): void {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(new TestComponent());
  testEntity.removeComponent("TestComponent");
  assertEquals(testEntity.components.length, 0);
  assertEquals(testEntity.TestComponent, undefined);
});

Deno.test(`${domain} can remove all components from itself`, function (): void {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(new TestComponent());
  testEntity.addComponent(new TestComponent2());
  testEntity.removeAllComponents();
  assertEquals(testEntity.components.length, 0);
  assertEquals(testEntity.components, []);
});

Deno.test(`${domain} knows if it has an individual component`, function (): void {
  class TestComponent {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addComponent(new TestComponent());
  assertEquals(testEntity.hasComponent("TestComponent"), true);
});

Deno.test(`${domain} knows if it has a collection of components`, function (): void {
  class TestComponent {}
  class TestComponent2 {}
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity
    .addComponent(new TestComponent())
    .addComponent(new TestComponent2());
  assertEquals(
    testEntity.hasAllComponents(["TestComponent", "TestComponent2"]),
    true,
    `entity does not contain the added components`,
  );
});

Deno.test(`${domain} knows if it has an individual tag`, function (): void {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addTag("Tag");
  assertEquals(testEntity.hasTag("Tag"), true);
});

Deno.test(`${domain} can add tags to itself`, function (): void {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addTag("testTag1").addTag("testTag2");
  assertEquals(testEntity.tags, ["testTag1", "testTag2"]);
});

Deno.test(`${domain} can remove tags from itself`, function (): void {
  const testManager = new EntityManager();
  const testEntity = new Entity(testManager);
  testEntity.addTag("testTag1").addTag("testTag2").removeTag("testTag1");
  assertEquals(testEntity.hasTag("testTag2"), true);
  assertEquals(testEntity.hasTag("testTag1"), false);
});

Deno.test(`${domain} can remove itself`, function (): void {
  const testManager = new EntityManager();
  const testEntity = testManager.createEntity();
  testEntity.remove();
  assertEquals(testEntity, {});
  assertEquals(testManager.listEntities(), []);
});
